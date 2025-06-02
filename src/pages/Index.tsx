
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Exporter Learning Hub</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>Professional Courses</span>
              </span>
              <span className="flex items-center space-x-1">
                <Trophy className="h-4 w-4" />
                <span>Certification</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Community</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {!userRole ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Master Export Business
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our comprehensive learning platform designed specifically for export professionals. 
                Access courses, get certified, and connect with a thriving community.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  500+ Export Professionals
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  50+ Courses Available
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Industry Certified
                </div>
              </div>
            </div>

            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">I'm a Learner</CardTitle>
                  <CardDescription className="text-gray-600">
                    Access courses, earn certifications, and connect with the export community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Register for courses and sessions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Join programs and batches</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Earn certificates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Participate in discussions</span>
                    </div>
                  </div>
                  <Link to="/user-dashboard">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Enter as Learner
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200 cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">I'm an Admin</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manage courses, sessions, programs, and track learner progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Create and manage courses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Upload videos and content</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Track user progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Manage certifications</span>
                    </div>
                  </div>
                  <Link to="/admin-dashboard">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Enter as Admin
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-lg font-semibold">Exporter Learning Hub</span>
          </div>
          <p className="text-gray-400 text-sm">
            Empowering export professionals with knowledge and community
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
