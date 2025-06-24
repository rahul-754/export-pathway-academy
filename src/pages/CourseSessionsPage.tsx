import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Clock, BookOpen, Download } from "lucide-react";
import { enrollInSessions, getCourseById, getUserById } from "@/Apis/Apis";
import { FaSpinner } from "react-icons/fa";
import SessionCard from "@/components/CourseSession/SessionCard";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const CourseSessionsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedSessions, setPurchasedSessions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [viewingMaterial, setViewingMaterial] = useState(null);

  useEffect(() => {
    if (!course) return;

    let total = cart.reduce((sum, sessionId) => {
      const session = course.sessions.find((s) => s._id === sessionId);
      return sum + (session?.price.amount || 0);
    }, 0);

    // Apply discounts
    if (cart.length === 1 || cart.length < course.sessions.length) {
      // 10% discount for single session
      total = total * 0.9;
    } else if (cart.length === course.sessions.length) {
      // 20% discount for full course
      total = total * 0.8;
    }

    setCartTotal(total);
  }, [cart, course]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchUserAndSetPurchasedSessions = async () => {
      const storedAuth = localStorage.getItem("TerraAuthData");

      if (storedAuth && course) {
        const parsed = JSON.parse(storedAuth);
        const userId = parsed.user?._id;

        try {
          const userData = await getUserById(userId); // fetch full user

          // ✅ Check if the user has purchased this course
          const hasPurchasedCourse = userData.enrolledCourses.some(
            (enrolled) => enrolled.course._id === course._id
          );

          // ✅ Get the list of session IDs the user has access to
          const purchasedSessionIds = userData.enrolledSessions.map(
            (enrolled) => enrolled.session._id
          );

          // ✅ Optionally filter course sessions against those purchased
          const purchased = course.sessions
            .filter((session) => purchasedSessionIds.includes(session._id))
            .map((session) => session._id);

          if (hasPurchasedCourse || purchased.length > 0) {
            setPurchasedSessions(purchased);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserAndSetPurchasedSessions();
  }, [course]);

  const addToCart = (sessionId) => {
    if (!cart.includes(sessionId)) {
      setCart([...cart, sessionId]);
    }
  };

  const removeFromCart = (sessionId) => {
    setCart(cart.filter((id) => id !== sessionId));
  };

  const buyCart = async () => {
    if (cart.length === 0) {
      return alert("Add sessions to cart first");
    }

    const storedAuth = localStorage.getItem("TerraAuthData");
    if (!storedAuth) {
      alert("User not logged in");
      return navigate("/");
    }

    try {
      const parsed = JSON.parse(storedAuth);
      const userId = parsed.user?._id;

      // 1. Create order on backend
      const response = await fetch("https://mdm.ai.multipliersolutions.in/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal, userId }),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Payment order creation failed");
      }

      // 2. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 3. Open Razorpay checkout
      const options = {
        key: "rzp_test_9fPmRoWUAdsgdk", // Replace with your Razorpay key id
        amount: data.orderDetails.amount,
        currency: data.orderDetails.currency,
        name: course.title,
        description: "Course Session Purchase",
        order_id: data.orderDetails.order_id,
        handler: async function (response) {
          // 4. Verify payment on backend
          const verifyRes = await fetch("https://mdm.ai.multipliersolutions.in/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // 5. Enroll user in sessions
            const result = await enrollInSessions(userId, cart);
            if (!result || result.message !== "Enrollment processed") {
              throw new Error("Enrollment failed");
            }
            const successfulEnrollments = result.user.enrolledSessions || [];
            setPurchasedSessions((prev) => [...prev, ...successfulEnrollments]);
            setCart([]);
            alert("Successfully enrolled in selected sessions!");
            setShowSuccessDialog(true);
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          email: parsed.user?.emailAddress,
          name: parsed.user?.name,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error during payment process:", err);
      console.error("Payment/Enrollment failed:", err);
      alert("Something went wrong during payment or enrollment. Try again.");
    }
  };

  const handleWatchPreview = (session) => {
    //console.log("Preview video URL:", session.previewVideo);
    if (session.previewVideo) {
      setSelectedVideoUrl(session.previewVideo);
    } else {
      alert("No preview available for this session.");
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false);
  };

  const handleGoToDashboard = () => {
    navigate("/user-dashboard");
  };

  const handleViewNotes = (session) => {
    if (purchasedSessions.includes(session._id)) {
      if (session.notes) {
        setViewingMaterial({ type: "notes", url: session.notes });
      } else {
        alert("Notes not available for this session.");
      }
    } else {
      alert("Please buy access to view notes.");
    }
  };

  const handleViewPPT = (session) => {
    if (purchasedSessions.includes(session._id)) {
      if (session.ppt) {
        setViewingMaterial({ type: "ppt", url: session.ppt });
      } else {
        alert("PPT not available for this session.");
      }
    } else {
      alert("Please buy access to view PPT.");
    }
  };

  const handleWatchFullVideo = (session) => {
    if (purchasedSessions.includes(session._id)) {
      if (session.videoUrl) {
        setSelectedVideoUrl(session.videoUrl);
      } else {
        alert("No full video available.");
      }
    } else {
      alert("Please buy access to watch the full session.");
    }
  };

  const handleQuizOpen = (sessionId: string) => {
    navigate(`/quiz/${sessionId}`);
  };

  const handleDownloadCertificate = async () => {
    const certificate = document.getElementById("course-certificate-template");
    if (!certificate) return;

    // Make it visible for rendering
    certificate.style.display = "block";

    // Render to canvas
    const canvas = await html2canvas(certificate, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Hide again
    certificate.style.display = "none";

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("course-certificate.pdf");
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FaSpinner className="animate-spin w-16 h-16" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="h-[80vh] flex justify-center items-center text-2xl text-red-500">
        Course not found.
      </div>
    );
  }
console.log(course)
  return (
    <>
      <div className="mx-auto min-h-screen bg-white-50">
        <div className="bg-[#94b9ff] w-full p-4 sm:p-6 md:p-10 text-black">
          <div className="max-w-[1520px] w-full mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row justify-between gap-5 items-center">
            <div className="flex-1 w-full lg:max-w-[600px] space-y-4 md:space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="bg-green-600 shadow-xl">
                  Bestseller
                </Badge>
                <span className="text-xs text-gray-400">
                  Last updated {new Date(course.updatedAt).getUTCMonth()}/
                  {new Date(course.updatedAt).getUTCFullYear()}
                </span>
                <p className="text-sm text-black">
                  👥 <span className="font-semibold">25</span> learners already enrolled
                </p>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4">{course.title}</h1>
              <p className="text-sm md:text-md text-gray-700 mb-4 md:mb-6">
                {course.courseDescription}
              </p>

              <div className="flex flex-wrap gap-3 md:gap-6 text-lg md:text-2xl text-gray-600 mb-4">
                <Badge variant="outline" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  {course.sessions.length} sessions
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration} minutes
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Instructor: {course.instructor}
                </Badge>
                <Badge variant="default" className="flex items-center gap-2">
                  <span className="text-yellow-500 font-bold">
                    {course.ratingScore}
                  </span>
                  <span className="text-white">({course.rating} ratings)</span>
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-2"
                  onClick={handleDownloadCertificate}
                >
                  <Download className="h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
              
            </div>

            <div className="w-full lg:w-auto mt-6 lg:mt-0">
              <div className="relative h-48 sm:h-56 md:h-64">
                <img
                  src={course.courseImg}
                  alt={course.title}
                  className="aspect-video h-full w-full object-cover rounded-lg shadow"
                />

                <button
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={() => setShowPreview(true)}
                  aria-label="Preview this course"
                >
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white bg-blue-600 rounded-full p-2 opacity-90 hover:scale-110 transition" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 md:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Course Sessions
          </h2>
          <div className="grid gap-4">
            {course.sessions.map((session, index) => (
              <SessionCard
                key={session._id}
                index={index}
                addToCart={addToCart}
                handleQuizOpen={handleQuizOpen}
                handleViewNotes={handleViewNotes}
                handleViewPPT={handleViewPPT}
                handleWatchFullVideo={handleWatchFullVideo}
                handleWatchPreview={handleWatchPreview}
                session={session}
                inCart={cart.includes(session._id)}
                isAccessible={purchasedSessions.includes(session._id)}
                isCompleted={session.isCompleted}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <video
              controls
              autoPlay
              className="w-full h-auto rounded"
              src={course.previewVideo}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Session Video Modal */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <video
              controls
              autoPlay
              className="w-full h-auto rounded"
              src={selectedVideoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {viewingMaterial && (
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] relative flex flex-col">
            <button
              onClick={() => setViewingMaterial(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold z-10"
            >
              ×
            </button>

            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                viewingMaterial.url
              )}&embedded=true`}
              className="flex-grow w-full"
              frameBorder="0"
              title={`${viewingMaterial.type.toUpperCase()} Preview`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}

      {/* Cart */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-[calc(100%-2rem)] sm:w-80 max-w-full z-50">
          <h3 className="text-lg font-bold mb-2">Your Cart</h3>
          <ul className="mb-2 max-h-48 overflow-auto">
            {cart.map((sessionId) => {
              const session = course.sessions.find((s) => s._id === sessionId);
              return (
                <li
                  key={sessionId}
                  className="flex justify-between items-center mb-1"
                >
                  <span className="block w-40 truncate">{session?.title}</span>
                  <div>
                    <span>₹{session?.price.amount}</span>
                    <button
                      className="ml-3 text-red-500 hover:text-red-700 font-bold"
                      onClick={() => removeFromCart(sessionId)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Discount display */}
          {cart.length < course.sessions.length && (
            <div className="text-sm text-green-600 mb-1">
              <span className="line-through">
                ₹{(cartTotal / 0.9).toFixed(2)}
              </span>
              <span className="ml-2">10% discount applied!</span>
            </div>
          )}
          {cart.length === course.sessions.length && (
            <div className="text-sm text-green-600 mb-1">
              <span className="line-through">
                ₹{(cartTotal / 0.8).toFixed(2)}
              </span>
              <span className="ml-2">20% discount applied!</span>
            </div>
          )}

          <div className="flex justify-between font-semibold text-gray-800 mb-2">
            <span>Total:</span> <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <Button onClick={buyCart} className="w-full">
            Buy Now
          </Button>
        </div>
      )}
      {/* Hidden certificate template for download */}
      <div
        id="course-certificate-template"
        style={{
          display: "none",
          width: "1086px",
          height: "768px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -9999,
          background: "#fff",
          border: "10px solid #1976d2",
          textAlign: "center",
          fontFamily: "serif",
        }}
      >
        <h1 style={{ marginTop: 100, fontSize: 48, color: "#1976d2" }}>
          Certificate of Completion
        </h1>
        <p style={{ fontSize: 28, marginTop: 60 }}>
          This is to certify that
        </p>
        <h2 style={{ fontSize: 36, margin: "30px 0", color: "#333" }}>
          {/* You can use user's name here if available */}
          [Your Name]
        </h2>
        <p style={{ fontSize: 24 }}>
          has successfully completed the course
        </p>
        <h2 style={{ fontSize: 32, margin: "30px 0", color: "#1976d2" }}>
          {course.title}
        </h2>
        <p style={{ fontSize: 20, marginTop: 40 }}>
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
};

export default CourseSessionsPage;