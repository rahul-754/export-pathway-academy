import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  FileText,
  Download,
  Play,
  Clock,
  CheckCircle,
  Lock,
  ArrowLeft,
  BookOpen,
  Presentation,
  LockIcon,
  BookOpenCheck,
  AwardIcon,
} from "lucide-react";
import UserHeader from "@/components/UserHeader";

import { enrollInSessions, getCourseById, getUserById } from "@/Apis/Apis";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaSpinner } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";

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
  const [expandedSet, setIdtoExpanded] = useState(new Set());
  const { isAuthenticated, user } = useUser();

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

      const result = await enrollInSessions(userId, cart);
      //console.log("Enrollment result:", result);
      if (!result || result.message !== "Enrollment processed") {
        throw new Error("Enrollment failed");
      }
      const successfulEnrollments = result.user.enrolledSessions || [];
      setPurchasedSessions((prev) => [...prev, ...successfulEnrollments]);
      setCart([]);
      alert("Successfully enrolled in selected sessions!");
      setShowSuccessDialog(true);
    } catch (err) {
      console.error("Enrollment failed:", err);
      alert("Something went wrong during enrollment. Try again.");
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

  const handleDownloadCertificate = async () => {
    const certificate = document.getElementById("certificate-template");
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
    pdf.save("certificate.pdf");
  };

  const handleQuizOpen = (sessionId: string) => {
    navigate(`/quiz/${sessionId}`);
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

  return (
    <>
      <div className=" mx-auto min-h-screen bg-white-50">
        {/* <CourseSessionsPageMain /> */}

        <div className="bg-[#94b9ff] w-full py-10 text-black">
          {/* Outer Container */}
          <div className="max-w-[80%] mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
            {/* Left Side - Course Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-700 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-blue-500" />
                  {course.sessions.length} practice exercises
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Instructor: {course.instructor}
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 font-bold">4.7</span>
                  <span className="ml-1 text-gray-500">(439,709 ratings)</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 mb-4">
                Last updated 02/2025 • English, Arabic [Auto] + more
              </div>

              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition">
                Start subscription
              </button>

              <p className="text-sm text-gray-600 mt-2">
                Starts at ₹850/mo. Cancel anytime.
              </p>
              <p className="text-sm mt-1 text-black">
                👥 <span className="font-semibold">1.5M</span> learners already
                enrolled
              </p>
            </div>

            {/* Right Side - Course Image */}
            <div className=" relative">
              <div className="relative h-64">
                <img
                  src={course.courseImg}
                  alt={course.title}
                  className="aspect-video h-full  rounded-lg shadow"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
                  onClick={() => setShowPreview(true)}
                  aria-label="Preview this course"
                >
                  <Play className="h-12 w-12 text-white bg-blue-600 rounded-full p-2 opacity-90 hover:scale-110 transition" />
                </button>
              </div>
              <div className="mt-3 text-center">
                <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded font-semibold">
                  Bestseller
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Summary Section - Udemy style */}

        {/* Sessions List Section */}
        <div className="w-full max-w-[80%] mx-auto py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 ">
            Course Sessions
          </h2>

          {course.sessions.map((session, index) => {
            const inCart = cart.includes(session._id);
            const isAccessible = purchasedSessions.includes(session._id);
            const isCompleted = session.isCompleted;

            return (
              <Card
                key={session._id}
                className="overflow-hidden hover:shadow-md transition-shadow mb-5"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-10">
                    {/* LEFT: Image + Title + Buttons */}
                    <div className="flex items-start gap-6">
                      <div className="rounded-lg bg-blue-100 flex items-center justify-center h-full">
                        <img
                          src={session.sessionImage}
                          alt={session.title}
                          className="max-w-[400px] h-full object-contain"
                          style={{ borderRadius: "8px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex flex-col gap-2 h-full justify-start ">
                        <CardTitle className="text-3xl max-w-[500px]">
                          Session {index + 1} : {session.title}
                        </CardTitle>
                        <div className="flex gap-4 mt-3 ">
                          {isAuthenticated ? (
                            <>
                              {!isAccessible && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`border-blue-700 text-blue-900 font-bold hover:bg-blue-50 flex items-center ${
                                    inCart
                                      ? "bg-green-600 hover:bg-green-700 text-white"
                                      : ""
                                  }`}
                                  onClick={() => addToCart(session._id)}
                                  disabled={inCart}
                                >
                                  {inCart
                                    ? "Added to Cart"
                                    : `Add to Cart - ${session.price.currency} ${session.price.amount}`}
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button variant="outline" disabled>
                              Please login to access
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-900 text-blue-900 font-bold hover:bg-blue-50 flex items-center"
                            onClick={() => handleWatchPreview(session)}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch Preview
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Clock + Lock + Show More */}
                    <div className="flex flex-col items-end justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-7 w-7 text-blue-800 font-bold hover:bg-blue-600 hover:text-white p-1 rounded-full transition-colors" />
                        <span className="text-sm text-blue-800 font-bold">
                          {session.duration}
                        </span>
                        {isAccessible && session.isCompleted && (
                          <CheckCircle className="h-7 w-7 text-green-600 hover:bg-green-600 hover:text-white p-1 rounded-full transition-colors" />
                        )}
                        {!isAccessible && (
                          <Lock className="h-7 w-7 text-blue-800 font-bold p-1 rounded-xl transition-colors" />
                        )}
                        <Button
                          variant="ghost"
                          className="text-blue-800 hover:underline text-sm hover:bg-transparent"
                          onClick={() => {
                            const temp = new Set(expandedSet);
                            if (temp.has(session._id)) {
                              temp.delete(session._id);
                            } else {
                              temp.add(session._id);
                            }
                            setIdtoExpanded(temp);
                          }}
                        >
                          {expandedSet.has(session._id)
                            ? "View less ▲"
                            : "View more ▼"}
                        </Button>
                      </div>
                      {isAuthenticated && (
                        <div className="flex flex-row-reverse ">
                          <div className=" max-w-[300px] space-y-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              disabled={!isAccessible || !session.videoUrl}
                              onClick={() => handleWatchFullVideo(session)}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Watch Video
                              {!isAccessible && (
                                <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              disabled={!isAccessible || !session.notes}
                              onClick={() => handleViewNotes(session)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              View Notes
                              {!isAccessible && (
                                <LockIcon className="h-3 w-3 ml-auto text-black font-bold" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              disabled={!isAccessible || !session.ppt}
                              onClick={() => handleViewPPT(session)}
                            >
                              <Presentation className="h-4 w-4 mr-2" />
                              View PPT
                              {!isAccessible && (
                                <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              disabled={!isAccessible || !session.quiz}
                              onClick={() => handleQuizOpen(session._id)}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Attempt Quiz
                              {!isAccessible && (
                                <LockIcon className="h-3 w-3 ml-auto text-blue-800 font-bold" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start"
                              disabled={!isAccessible}
                              onClick={handleDownloadCertificate}
                            >
                              <AwardIcon className="h-4 w-4 mr-2" />
                              Download certificate
                              {!isAccessible && (
                                <LockIcon className="h-3 w-3 ml-auto text-black font-bold" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {isAuthenticated && (
                  <div
                    id="certificate-template"
                    style={{
                      display: "none",
                      width: "1086px",
                      height: "768px",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -9999,
                      backgroundImage: "url('sample 1 (4).jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      fontFamily: "serif",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "235px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1976d2",
                          fontSize: "26px",
                          margin: 0,
                        }}
                      >
                        {session.title || "Course Name"}
                      </h3>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        top: "370px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <h2 style={{ color: "#1976d2", fontSize: "36px" }}>
                        {user?.name || "User Name"}
                      </h2>
                    </div>
                  </div>
                )}

                {expandedSet.has(session._id) && (
                  <CardContent className=" border-t pt-5">
                    <h3 className="font-semibold text-xl">What you'll learn</h3>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5 mt-5">
                      <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                        <h3 className="font-bold tracking-wide text-xl max-w-[70%] z-[1]">
                          Leverage AI Tools for Smarter Customer Outreach
                        </h3>
                        <p className=" text-md max-w-[70%] z-[1]">
                          Streamline your Email and WhatsApp marketing using
                          intelligent automation.
                        </p>
                        <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 select-none z-0">
                          1
                        </span>
                      </div>
                      <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                        <h3 className="font-bold tracking-wide text-xl max-w-[75%] z-[1]">
                          Build Seamless Workflows with Zapier
                        </h3>
                        <p className=" text-md max-w-[75%] z-[1]">
                          Integrate your favorite apps to trigger personalized
                          messages effortlessly.
                        </p>
                        <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 z-0 select-none">
                          2
                        </span>
                      </div>
                      <div className="px-10 py-8 shadow-lg border shadow-blue-200/50  rounded-xl w-full space-y-2 relative">
                        <h3 className="font-bold tracking-wide text-xl max-w-[75%] z-[1]">
                          Use WhatsAuto and Mailchimp for Smart Follow-Ups
                        </h3>
                        <p className=" text-md max-w-[75%] z-[1]">
                          Engage customers at the right time with automated
                          responses and campaigns.
                        </p>
                        <span className="absolute bottom-0 right-0 text-9xl font-bold text-blue-600/10 z-0 select-none">
                          3
                        </span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
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
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-1000 text-xl font-bold"
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
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80 max-w-full z-50">
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
    </>
  );
};

export default CourseSessionsPage;
