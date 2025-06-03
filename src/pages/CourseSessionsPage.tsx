
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Presentation
} from 'lucide-react';
import UserHeader from '@/components/UserHeader';
import { getCourseById } from '@/Apis/Apis';

const CourseSessionsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false); // Set to true to simulate enrollment
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showSession, setShowSession] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    // In a real app, send enrollment request to backend here
  };

  const handleSessionClick = (sessionId) => {
  if (isEnrolled) {
    const selectedSession = course.sessions.find(s => s.id === sessionId);
    if (selectedSession?.previewVideo) {
      setSelectedVideoUrl(selectedSession.previewVideo);
    }
  }
};

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading course details...</div>;
  }

  if (!course) {
    return <div className="p-6 text-center text-red-500">Course not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="container mx-auto px-4 py-6">
        <Link to="/user-dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
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
                {isEnrolled && <Badge variant="outline" className="text-green-600">Enrolled</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
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
                  Instructor: {course.instructor}
                </div>
              </div>

              {!isEnrolled && (
                <Button onClick={handleEnroll} size="lg">
                  Enroll in Course
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Sessions</h2>

          {course.sessions.map((session, index) => (
            <Card key={session.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{session.duration}</span>
                    {isEnrolled && session.isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {!isEnrolled && <Lock className="h-5 w-5 text-gray-400" />}
                  </div>
                </div>
              </CardHeader>

              {isEnrolled ? (
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">What you'll learn:</h4>
                      <h5 className="font-semibold mb-2">{session.description}</h5>

                      <Button onClick={() => handleSessionClick(session.id)} className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        {session.isCompleted ? 'Rewatch' : 'Start Session'}
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Course Materials:</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="h-4 w-4 mr-2" />
                          Download Notes
                          <Download className="h-3 w-3 ml-auto" />
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Presentation className="h-4 w-4 mr-2" />
                          Download PPT
                          <Download className="h-3 w-3 ml-auto" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Lock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Enroll in the course to access session content</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
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
