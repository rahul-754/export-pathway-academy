
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle,
  Lock
} from 'lucide-react';
import UserHeader from '@/components/UserHeader';

const SessionsPage = () => {
  const sessions = [
    {
      id: 1,
      title: "Introduction to Export Documentation",
      course: "Export Documentation Essentials",
      duration: "45 min",
      description: "Learn the basics of export documentation and why it's crucial for international trade.",
      videoUrl: "https://example.com/video1",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      isCompleted: true,
      isEnrolled: true,
      category: "Documentation"
    },
    {
      id: 2,
      title: "Commercial Invoice Preparation",
      course: "Export Documentation Essentials",
      duration: "60 min",
      description: "Step-by-step guide to creating accurate commercial invoices for international shipments.",
      videoUrl: "https://example.com/video2",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      isCompleted: false,
      isEnrolled: true,
      category: "Documentation"
    },
    {
      id: 3,
      title: "WTO Fundamentals",
      course: "International Trade Laws",
      duration: "50 min",
      description: "Understanding World Trade Organization principles and their impact on international trade.",
      videoUrl: "https://example.com/video3",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      isCompleted: false,
      isEnrolled: false,
      category: "Legal"
    },
    {
      id: 4,
      title: "Export Market Research Strategies",
      course: "Digital Marketing for Exporters",
      duration: "40 min",
      description: "Learn how to identify and analyze international markets for your export business.",
      videoUrl: "https://example.com/video4",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      isCompleted: false,
      isEnrolled: true,
      category: "Marketing"
    },
    {
      id: 5,
      title: "Customs Procedures Overview",
      course: "Export Documentation Essentials",
      duration: "55 min",
      description: "Navigate customs procedures and understand documentation requirements for different countries.",
      videoUrl: "https://example.com/video5",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      isCompleted: false,
      isEnrolled: false,
      category: "Documentation"
    }
  ];

  const groupedSessions = sessions.reduce((acc, session) => {
    if (!acc[session.course]) {
      acc[session.course] = [];
    }
    acc[session.course].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Sessions</h2>
          <p className="text-gray-600">Access individual sessions from all available courses</p>
        </div>

        {/* Sessions by Course */}
        <div className="space-y-8">
          {Object.entries(groupedSessions).map(([courseName, courseSessions]) => (
            <div key={courseName}>
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">{courseName}</h3>
                <Badge variant="outline" className="ml-3">
                  {courseSessions.length} sessions
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseSessions.map((session) => (
                  <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 relative group">
                      <img 
                        src={session.thumbnail} 
                        alt={session.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Video Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {session.isEnrolled ? (
                          session.isCompleted ? (
                            <CheckCircle className="h-12 w-12 text-green-400" />
                          ) : (
                            <Play className="h-12 w-12 text-white" />
                          )
                        ) : (
                          <Lock className="h-12 w-12 text-gray-300" />
                        )}
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {session.duration}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        {session.isCompleted ? (
                          <Badge className="bg-green-600">Completed</Badge>
                        ) : session.isEnrolled ? (
                          <Badge className="bg-blue-600">Enrolled</Badge>
                        ) : (
                          <Badge variant="secondary">Available</Badge>
                        )}
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-white bg-opacity-90">
                          {session.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{session.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {session.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {session.isEnrolled ? (
                          session.isCompleted ? (
                            <Button variant="outline" className="w-full">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                              Completed
                            </Button>
                          ) : (
                            <Button className="w-full">
                              <Play className="h-4 w-4 mr-2" />
                              Watch Now
                            </Button>
                          )
                        ) : (
                          <Button variant="outline" className="w-full">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Register for Session
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionsPage;
