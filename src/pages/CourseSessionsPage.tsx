
import { useState } from 'react';
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

const CourseSessionsPage = () => {
  const { courseId } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false); // Change to true to see enrolled view
  
  // Mock course data - in real app this would come from API
  const courseData = {
    1: {
      title: "Export Documentation Basics",
      description: "Master the fundamental concepts of export documentation including commercial invoices, packing lists, and shipping documents.",
      instructor: "Dr. Sarah Wilson",
      level: "Basic",
      totalSessions: 6,
      duration: "4 weeks",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      sessions: [
        {
          id: 1,
          title: "Introduction to Export Documentation",
          description: "Learn the basics of export documentation and why it's crucial for international trade.",
          duration: "45 min",
          isCompleted: true,
          video: "https://example.com/video1.mp4",
          notes: "session1_notes.pdf",
          ppt: "session1_presentation.pptx",
          whatYouLearn: [
            "Understanding export documentation requirements",
            "Types of export documents",
            "Common mistakes to avoid",
            "Best practices for documentation"
          ]
        },
        {
          id: 2,
          title: "Commercial Invoice Preparation",
          description: "Step-by-step guide to creating accurate commercial invoices for international shipments.",
          duration: "60 min",
          isCompleted: false,
          video: "https://example.com/video2.mp4",
          notes: "session2_notes.pdf",
          ppt: "session2_presentation.pptx",
          whatYouLearn: [
            "Commercial invoice components",
            "Pricing and currency considerations",
            "Legal requirements",
            "Invoice formatting standards"
          ]
        },
        {
          id: 3,
          title: "Packing List Essentials",
          description: "Master the art of creating comprehensive packing lists for export shipments.",
          duration: "50 min",
          isCompleted: false,
          video: "https://example.com/video3.mp4",
          notes: "session3_notes.pdf",
          ppt: "session3_presentation.pptx",
          whatYouLearn: [
            "Packing list structure",
            "Weight and measurement details",
            "Packaging specifications",
            "Customs compliance"
          ]
        }
      ]
    }
  };

  const course = courseData[courseId] || courseData[1];

  const handleEnroll = () => {
    setIsEnrolled(true);
    // In real app, this would make API call to enroll user
  };

  const handleSessionClick = (sessionId: number) => {
    if (isEnrolled) {
      // Navigate to session detail or play video
      console.log(`Opening session ${sessionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/user-dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full lg:w-80 h-48 object-cover rounded-lg"
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
                  {course.totalSessions} sessions
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

        {/* Sessions List */}
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
                    {!isEnrolled && (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {isEnrolled && (
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Learning Materials */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold mb-3">What you'll learn:</h4>
                      <ul className="space-y-2 mb-4">
                        {session.whatYouLearn.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleSessionClick(session.id)}
                          className="flex items-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {session.isCompleted ? 'Rewatch' : 'Start Session'}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Downloads */}
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
              )}
              
              {!isEnrolled && (
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
    </div>
  );
};

export default CourseSessionsPage;
