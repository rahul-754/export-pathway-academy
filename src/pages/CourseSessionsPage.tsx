import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { getCourseById } from "@/Apis/Apis";

const CourseSessionsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedSessions, setPurchasedSessions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartPurchased, setCartPurchased] = useState(false);

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

  const addToCart = (sessionId) => {
    if (!cart.includes(sessionId)) {
      setCart([...cart, sessionId]);
    }
  };

  const removeFromCart = (sessionId) => {
    setCart(cart.filter((id) => id !== sessionId));
  };

  const buyCart = () => {
    if (cart.length === 0) return alert("Add sessions to cart first");
    setPurchasedSessions((prev) => [...prev, ...cart]);
    setCartPurchased(false); // Reset cart purchased state to show "Add to Cart" buttons again
    setCart([]);
  };

  const handleSessionClick = (sessionId) => {
    if (purchasedSessions.includes(sessionId)) {
      const selectedSession = course.sessions.find((s) => s._id === sessionId);
      if (selectedSession?.previewVideo) {
        setSelectedVideoUrl(selectedSession.previewVideo);
      }
    } else {
      alert("Please buy access to this session.");
    }
  };

  const handleWatchPreview = (session) => {
    if (session.previewVideo) {
      setSelectedVideoUrl(session.previewVideo);
    } else {
      alert("No preview available for this session.");
    }
  };

  const handleWatchFullVideo = (session) => {
    if (purchasedSessions.includes(session._id)) {
      if (session.fullVideo) {
        setSelectedVideoUrl(session.fullVideo);
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
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="container mx-auto px-4 py-6">
        <Link
          to="/user-dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <img
              src={course.courseImg}
              alt={course.title}
              onClick={() => setShowPreview(true)}
              className="w-full lg:w-80 h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-600">{course.level}</Badge>
                {purchasedSessions.length === course.sessions.length ? (
                  <Badge variant="outline" className="text-green-600">
                    Fully Enrolled
                  </Badge>
                ) : purchasedSessions.length > 0 ? (
                  <Badge variant="outline" className="text-yellow-600">
                    Partially Enrolled
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.title}
              </h1>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Video className="h-4 w-4 mr-1" />
                  {course.sessions.length} sessions
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Instructor: {course.instructor || "Saumya Prakash"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
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
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {session.title}
                        </CardTitle>
                        <CardDescription>{session.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {session.duration}
                      </span>
                      {isAccessible && session.isCompleted && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {!isAccessible && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">What you'll learn:</h4>
                      <h5 className="font-semibold mb-2">
                        {session.description}
                      </h5>

                      {/* BOTH Buttons shown before purchase */}
                      <div className="flex gap-4">
                        {/* Add to Cart button - only show if session is not already purchased */}
                        {!isAccessible && (
                          <Button
                            onClick={() => addToCart(session._id)}
                            className={`flex items-center ${
                              inCart ? "bg-green-600 hover:bg-green-700" : ""
                            }`}
                            disabled={inCart}
                          >
                            {inCart
                              ? "Added to Cart"
                              : `Add to Cart - ${session.price.currency} ${session.price.amount}`}
                          </Button>
                        )}

                        {/* Watch Video button */}
                        <Button
                          onClick={() => handleWatchPreview(session)}
                          className="flex items-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch Preview
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Course Materials:</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          disabled={!isAccessible}
                        >
                          <Video
                            className="h-4 w-4 mr-2"
                            onClick={() => handleWatchFullVideo(session)}
                          />
                          Watch Video
                          {!isAccessible && (
                            <LockIcon className="h-3 w-3 ml-auto" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          disabled={!isAccessible}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Download Notes
                          {!isAccessible && (
                            <LockIcon className="h-3 w-3 ml-auto" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          disabled={!isAccessible}
                        >
                          <Presentation className="h-4 w-4 mr-2" />
                          Download PPT
                          {!isAccessible && (
                            <LockIcon className="h-3 w-3 ml-auto" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cart Summary */}
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
                <span className="line-through">₹{(cartTotal / 0.9).toFixed(2)}</span>
                <span className="ml-2">10% discount applied!</span>
              </div>
            )}
            {cart.length === course.sessions.length && (
              <div className="text-sm text-green-600 mb-1">
                <span className="line-through">₹{(cartTotal / 0.8).toFixed(2)}</span>
                <span className="ml-2">20% discount applied!</span>
              </div>
            )}
            
            <div className="flex justify-between font-semibold text-gray-800 mb-2">
              <span>Total:</span> <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <Button
              onClick={buyCart}
              className="w-full"
            >
              Buy Now
            </Button>
          </div>
        )}
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
    </div>
  );
};

export default CourseSessionsPage;