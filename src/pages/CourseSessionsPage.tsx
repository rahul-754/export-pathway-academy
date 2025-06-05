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
} from "lucide-react";
import UserHeader from "@/components/UserHeader";

import { enrollInSessions, getCourseById, getUserById } from "@/Apis/Apis";

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
  const [cartTotal, setCartTotal] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [viewingMaterial, setViewingMaterial] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
  return (
    <div className="min-h-screen bg-white-50">
      <UserHeader />

      <div className=" mx-auto py-6">
        {/* <CourseSessionsPageMain /> */}

        <div className="bg-[#94b9ff] w-full py-10 px-4 md:px-10 text-black">
          {/* Outer Container */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
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
            <div className="w-full md:w-1/3 relative">
              <div className="relative w-full h-64">
                <img
                  src={course.courseImg}
                  alt={course.title}
                  className="w-full h-full object-cover rounded-lg shadow"
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
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Sessions
          </h2>

          {course.sessions.map((session, index) => {
            const inCart = cart.includes(session._id);
            const isAccessible = purchasedSessions.includes(session._id);

            return (
              <Card
                key={session._id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    {/* LEFT: Image + Title + Buttons */}
                    <div className="flex item-center gap-6">
                      <div
                        className="rounded-lg bg-blue-100 flex items-center justify-center"
                        style={{ width: "200px", height: "auto" }}
                      >
                        <img
                          src={session.sessionImage}
                          alt={session.title}
                          className="w-full h-full object-cover"
                          style={{ borderRadius: "8px", objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {session.title}
                        </CardTitle>
                        <div className="flex gap-4 mt-3">
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
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-800 font-bold" />
                        <span className="text-sm text-blue-800 font-bold">
                          {session.duration}
                        </span>
                        {isAccessible && session.isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {!isAccessible && (
                          <Lock className="h-5 w-5 text-blue-800 font-bold" />
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        className="text-blue-800 hover:underline text-sm p-0 mt-9"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "Show Less ▲" : "Show More ▼"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="font-semibold mb-3">
                          What you'll learn:
                        </h4>
                        <h5 className="mb-2">{session.description}</h5>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Course Materials:
                        </h4>
                        <div className="space-y-2">
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
                              <LockIcon className="h-3 w-3 ml-auto text-black-800 font-bold" />
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
                        </div>
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
    </div>
  );
};

export default CourseSessionsPage;
