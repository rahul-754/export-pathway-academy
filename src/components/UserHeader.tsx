import { GraduationCap, Home, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const UserHeader = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="./logo.png" alt="Logo"  style={{
              width: 'auto',
              height: '40px',
              objectFit: 'cover'
            }}/>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TerraSourcing</h1>
              <p className="text-sm text-gray-500">Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="relative border-blue-600 text-blue-900 hover:bg-blue-50"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">3</Badge>
            </Button>
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-900 hover:bg-blue-50"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
