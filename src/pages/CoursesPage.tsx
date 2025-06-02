
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  Video, 
  Clock, 
  Users, 
  Star,
  Search,
  Filter,
  Play
} from 'lucide-react';
import UserHeader from '@/components/UserHeader';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: "Export Documentation Essentials",
      description: "Master the fundamentals of export documentation including commercial invoices, packing lists, and shipping documents.",
      instructor: "Dr. Sarah Wilson",
      duration: "6 weeks",
      sessions: 8,
      enrolled: 324,
      rating: 4.8,
      level: "Beginner",
      category: "Documentation",
      price: "$199",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      sessions_list: [
        { id: 1, title: "Introduction to Export Documentation", duration: "45 min", completed: false },
        { id: 2, title: "Commercial Invoice Preparation", duration: "60 min", completed: false },
        { id: 3, title: "Packing List Essentials", duration: "40 min", completed: false },
        { id: 4, title: "Bills of Lading", duration: "55 min", completed: false }
      ]
    },
    {
      id: 2,
      title: "International Trade Laws & Regulations",
      description: "Comprehensive overview of international trade laws, WTO regulations, and compliance requirements.",
      instructor: "Prof. Michael Chen",
      duration: "8 weeks",
      sessions: 12,
      enrolled: 256,
      rating: 4.9,
      level: "Intermediate",
      category: "Legal",
      price: "$299",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      sessions_list: [
        { id: 1, title: "WTO Fundamentals", duration: "50 min", completed: false },
        { id: 2, title: "Trade Agreements", duration: "65 min", completed: false },
        { id: 3, title: "Compliance Requirements", duration: "45 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Digital Marketing for Export Business",
      description: "Learn digital marketing strategies specifically designed for export businesses and international markets.",
      instructor: "Emma Rodriguez",
      duration: "4 weeks",
      sessions: 6,
      enrolled: 189,
      rating: 4.7,
      level: "Intermediate",
      category: "Marketing",
      price: "$149",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      sessions_list: [
        { id: 1, title: "Export Market Research", duration: "40 min", completed: false },
        { id: 2, title: "International SEO", duration: "55 min", completed: false }
      ]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h2>
          <p className="text-gray-600">Build your export expertise with our comprehensive course library</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="documentation">Documentation</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{course.category}</Badge>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Video className="h-4 w-4 mr-1" />
                      {course.sessions} sessions
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolled}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Instructor: {course.instructor}
                  </div>
                  
                  {/* Sessions Preview */}
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-medium mb-2">Course Sessions:</h4>
                    <div className="space-y-1">
                      {course.sessions_list.slice(0, 3).map((session) => (
                        <div key={session.id} className="flex items-center justify-between text-xs text-gray-600">
                          <span className="flex items-center">
                            <Play className="h-3 w-3 mr-1" />
                            {session.title}
                          </span>
                          <span>{session.duration}</span>
                        </div>
                      ))}
                      {course.sessions_list.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{course.sessions_list.length - 3} more sessions
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-lg font-bold text-blue-600">{course.price}</div>
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
