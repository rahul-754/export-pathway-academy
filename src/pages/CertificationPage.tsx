
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Download, 
  Eye, 
  Calendar, 
  CheckCircle,
  Award,
  Star,
  Share2
} from 'lucide-react';
import UserHeader from '@/components/UserHeader';

const CertificationPage = () => {
  const earnedCertificates = [
    {
      id: 1,
      title: "Export Documentation Specialist",
      course: "Export Documentation Essentials",
      completedDate: "2024-06-10",
      instructor: "Dr. Sarah Wilson",
      level: "Intermediate",
      score: 92,
      credentialId: "EXP-DOC-2024-001",
      skills: ["Commercial Invoices", "Bills of Lading", "Export Documentation", "Trade Compliance"],
      certificateUrl: "/certificates/export-doc-specialist.pdf"
    },
    {
      id: 2,
      title: "Customs Procedures Expert",
      course: "International Trade Laws & Regulations",
      completedDate: "2024-05-25",
      instructor: "Prof. Michael Chen",
      level: "Advanced",
      score: 88,
      credentialId: "EXP-CUSTOMS-2024-002",
      skills: ["Customs Regulations", "Trade Compliance", "Import/Export Laws", "Documentation"],
      certificateUrl: "/certificates/customs-expert.pdf"
    },
    {
      id: 3,
      title: "Digital Export Marketing Specialist",
      course: "Digital Marketing for Export Business",
      completedDate: "2024-04-15",
      instructor: "Emma Rodriguez",
      level: "Intermediate",
      score: 95,
      credentialId: "EXP-MARKETING-2024-003",
      skills: ["International SEO", "Export Marketing", "Digital Campaigns", "Market Research"],
      certificateUrl: "/certificates/digital-marketing.pdf"
    }
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "International Trade Finance",
      progress: 75,
      estimatedCompletion: "2024-07-30",
      nextMilestone: "Trade Finance Instruments Quiz"
    },
    {
      id: 2,
      title: "Export Business Development",
      progress: 45,
      estimatedCompletion: "2024-08-15",
      nextMilestone: "Market Entry Strategies Assignment"
    }
  ];

  const achievements = [
    { title: "Fast Learner", description: "Completed 3 courses in 2 months", icon: "🚀" },
    { title: "Top Performer", description: "Scored 90%+ on all assessments", icon: "⭐" },
    { title: "Community Contributor", description: "Helped 10+ peers in discussions", icon: "🤝" },
    { title: "Knowledge Seeker", description: "Enrolled in 5+ courses", icon: "📚" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Certifications</h2>
          <p className="text-gray-600">Track your learning achievements and download certificates</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{earnedCertificates.length}</div>
              <p className="text-xs text-muted-foreground">+1 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(earnedCertificates.reduce((acc, cert) => acc + cert.score, 0) / earnedCertificates.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Excellent performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
              <p className="text-xs text-muted-foreground">Courses active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.length}</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList>
            <TabsTrigger value="certificates">Earned Certificates</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <div className="grid gap-6">
              {earnedCertificates.map((certificate) => (
                <Card key={certificate.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Trophy className="h-6 w-6 text-yellow-600" />
                          <CardTitle className="text-xl">{certificate.title}</CardTitle>
                          <Badge variant="outline">{certificate.level}</Badge>
                        </div>
                        
                        <CardDescription className="text-base mb-3">
                          {certificate.course} • Instructor: {certificate.instructor}
                        </CardDescription>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Completed: {new Date(certificate.completedDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            Score: {certificate.score}%
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Skills Demonstrated:</h4>
                          <div className="flex flex-wrap gap-2">
                            {certificate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Credential ID: {certificate.credentialId}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 lg:w-48">
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6">
              {inProgressCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="outline">{course.progress}% Complete</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Next: {course.nextMilestone}</span>
                        <span>Est. completion: {new Date(course.estimatedCompletion).toLocaleDateString()}</span>
                      </div>
                      
                      <Button size="sm">Continue Learning</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {inProgressCourses.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in progress</h3>
                    <p className="text-gray-600 mb-4">Start a new course to begin earning certificates</p>
                    <Button>Browse Courses</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                      <CheckCircle className="h-6 w-6 text-green-600 ml-auto" />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CertificationPage;
