
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Clock,
  Star,
  Trophy,
  ArrowRight
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  sessions: number;
  duration: string;
  level: string;
  thumbnail: string;
}

interface NewUserViewProps {
  onCourseClick: (courseId: number) => void;
}

const NewUserView = ({ onCourseClick }: NewUserViewProps) => {
  const basicCourses: Course[] = [
    {
      id: 1,
      title: "Export Documentation Basics",
      description: "Learn the fundamental concepts of export documentation",
      sessions: 6,
      duration: "4 weeks",
      level: "Basic",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Introduction to International Trade",
      description: "Understanding the basics of global commerce",
      sessions: 8,
      duration: "5 weeks",
      level: "Basic",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    }
  ];

  const advancedCourses: Course[] = [
    {
      id: 3,
      title: "Advanced Export Strategies",
      description: "Master complex export procedures and strategies",
      sessions: 12,
      duration: "8 weeks",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "International Trade Law & Compliance",
      description: "Deep dive into legal aspects of international trade",
      sessions: 10,
      duration: "6 weeks",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Exporter Learning Hub!</h2>
        <p className="text-gray-600">Start your export journey with our comprehensive courses</p>
      </div>

      {/* Basic Courses */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Star className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Basic Courses</h3>
          <Badge variant="secondary" className="ml-3">Perfect for beginners</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onCourseClick(course.id)}>
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-600">{course.level}</Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="h-4 w-4 mr-1" />
                    {course.sessions} sessions
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <Button className="w-full">
                  View Sessions & Enroll
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Advanced Courses */}
      <div>
        <div className="flex items-center mb-6">
          <Trophy className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-900">Advanced Courses</h3>
          <Badge variant="secondary" className="ml-3">For experienced exporters</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advancedCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onCourseClick(course.id)}>
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-blue-600">{course.level}</Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="h-4 w-4 mr-1" />
                    {course.sessions} sessions
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <Button className="w-full">
                  View Sessions & Enroll
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewUserView;
