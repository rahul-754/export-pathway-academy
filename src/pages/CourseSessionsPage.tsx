import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserHeader from "@/components/UserHeader";
import { enrollInSessions, getCourseById, getUserById } from "@/Apis/Apis";

import { ArrowLeft } from "lucide-react";
import CourseOverview from "@/components/CourseOverview";
import SessionItem from "@/components/SessionItem";
import CartSummary from "@/components/CartSummary";
import PaymentSuccessDialog from "@/components/ui/PaymentSuccessDialog";

const CourseSessionsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedSessions, setPurchasedSessions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [cart, setCart] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [viewingMaterial, setViewingMaterial] = useState(null);

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
      console.log("Enrollment result:", result);
      if (!result || !result.message === "Enrollment processed") {
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
    console.log("Preview video URL:", session.previewVideo);
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

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 text-center text-red-500">Course not found.</div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 mb-16">
      <UserHeader />
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/user-dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <CourseOverview
          course={course}
          purchasedSessions={purchasedSessions}
          onShowPreview={() => setShowPreview(true)}
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Sessions
          </h2>
          {course.sessions.map((session) => (
            <SessionItem
              key={session._id}
              session={session}
              isPurchased={purchasedSessions.includes(session._id)}
              isInCart={cart.includes(session._id)}
              onAddToCart={() => addToCart(session._id)}
              onWatchPreview={() => handleWatchPreview(session)}
              onWatchFullVideo={() => handleWatchFullVideo(session)}
              onViewNotes={() => handleViewNotes(session)}
              onViewPPT={() => handleViewPPT(session)}
            />
          ))}
        </div>
        {cart.length > 0 && (
          <CartSummary
            cart={cart}
            course={course}
            onRemoveFromCart={removeFromCart}
            onBuyCart={buyCart}
          />
        )}
      </div>
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
      {showSuccessDialog && (
        <PaymentSuccessDialog
          onClose={handleDialogClose}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
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
    </div>
  );
};

export default CourseSessionsPage;
