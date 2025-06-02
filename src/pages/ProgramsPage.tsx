
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin,
  Star,
  CheckCircle
} from 'lucide-react';
import UserHeader from '@/components/UserHeader';

const ProgramsPage = () => {
  const upcomingPrograms = [
    {
      id: 1,
      title: "Export Fundamentals Intensive",
      description: "A comprehensive 3-day intensive program covering all aspects of export business fundamentals.",
      instructor: "Dr. Sarah Wilson & Team",
      startDate: "2024-07-15",
      endDate: "2024-07-17",
      time: "9:00 AM - 5:00 PM",
      location: "Virtual + Live Sessions",
      price: "$599",
      enrolled: 45,
      capacity: 60,
      rating: 4.9,
      level: "Beginner to Intermediate",
      duration: "3 days",
      features: [
        "Live expert sessions",
        "Interactive workshops",
        "Networking opportunities",
        "Course materials included",
        "Certificate upon completion"
      ]
    },
    {
      id: 2,
      title: "Advanced Export Strategies Summit",
      description: "Join industry leaders for advanced strategies in international trade and export business development.",
      instructor: "Prof. Michael Chen",
      startDate: "2024-08-20",
      endDate: "2024-08-22",
      time: "10:00 AM - 4:00 PM",
      location: "New York Convention Center",
      price: "$899",
      enrolled: 28,
      capacity: 50,
      rating: 4.8,
      level: "Advanced",
      duration: "3 days",
      features: [
        "Expert panel discussions",
        "Case study analysis",
        "One-on-one mentoring",
        "Exclusive networking dinner",
        "Advanced certification"
      ]
    },
    {
      id: 3,
      title: "Digital Export Marketing Bootcamp",
      description: "Master digital marketing techniques specifically designed for export businesses and international markets.",
      instructor: "Emma Rodriguez",
      startDate: "2024-09-10",
      endDate: "2024-09-12",
      time: "9:00 AM - 3:00 PM",
      location: "Virtual",
      price: "$399",
      enrolled: 32,
      capacity: 40,
      rating: 4.7,
      level: "Intermediate",
      duration: "3 days",
      features: [
        "Hands-on workshops",
        "Live campaign creation",
        "Tools and templates",
        "30-day support included",
        "Marketing toolkit"
      ]
    }
  ];

  const registeredPrograms = [
    {
      id: 1,
      title: "Export Documentation Masterclass",
      instructor: "Dr. Sarah Wilson",
      startDate: "2024-06-15",
      endDate: "2024-06-17",
      status: "completed",
      progress: 100,
      certificateAvailable: true
    },
    {
      id: 2,
      title: "International Trade Finance Workshop",
      instructor: "Robert Martinez",
      startDate: "2024-07-01",
      endDate: "2024-07-03",
      status: "ongoing",
      progress: 65,
      certificateAvailable: false
    }
  ];

  const calculateDaysUntil = (dateString: string) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Programs & Events</h2>
          <p className="text-gray-600">Join intensive programs and connect with export professionals</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Programs</TabsTrigger>
            <TabsTrigger value="registered">My Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6">
              {upcomingPrograms.map((program) => {
                const daysUntil = calculateDaysUntil(program.startDate);
                return (
                  <Card key={program.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-xl">{program.title}</CardTitle>
                            <Badge variant="outline">{program.level}</Badge>
                            {daysUntil <= 7 && daysUntil > 0 && (
                              <Badge className="bg-orange-100 text-orange-800">
                                Starting in {daysUntil} days
                              </Badge>
                            )}
                          </div>
                          
                          <CardDescription className="text-base mb-3">
                            {program.description}
                          </CardDescription>
                          
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span className="flex items-center">
                              <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                              {program.rating}
                            </span>
                            <span>by {program.instructor}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-1">{program.price}</div>
                          <div className="text-sm text-gray-600">
                            {program.enrolled}/{program.capacity} enrolled
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">
                              {new Date(program.startDate).toLocaleDateString()} - 
                            </div>
                            <div>{new Date(program.endDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">{program.time}</div>
                            <div>{program.duration}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <div>{program.location}</div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <div>{program.enrolled} participants</div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {program.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {daysUntil > 0 ? (
                            `Starts in ${daysUntil} days`
                          ) : daysUntil === 0 ? (
                            "Starts today!"
                          ) : (
                            "Registration closed"
                          )}
                        </div>
                        <Button 
                          disabled={daysUntil < 0}
                          className={daysUntil <= 7 && daysUntil > 0 ? "bg-orange-600 hover:bg-orange-700" : ""}
                        >
                          {daysUntil < 0 ? "Registration Closed" : "Register Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="registered" className="space-y-6">
            <div className="grid gap-6">
              {registeredPrograms.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        <CardDescription>
                          Instructor: {program.instructor}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={program.status === 'completed' ? 'default' : 'secondary'}
                        className={program.status === 'completed' ? 'bg-green-600' : ''}
                      >
                        {program.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-600">
                        {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm font-medium">
                        Progress: {program.progress}%
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${program.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {program.status === 'completed' ? 'Program completed' : 'Continue learning'}
                      </div>
                      <div className="space-x-2">
                        {program.certificateAvailable && (
                          <Button variant="outline" size="sm">
                            Download Certificate
                          </Button>
                        )}
                        <Button size="sm">
                          {program.status === 'completed' ? 'View Details' : 'Continue'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {registeredPrograms.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No registered programs</h3>
                    <p className="text-gray-600 mb-4">You haven't registered for any programs yet.</p>
                    <Button>Browse Upcoming Programs</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramsPage;
