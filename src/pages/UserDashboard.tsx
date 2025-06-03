
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '@/components/UserHeader';
import NewUserView from '@/components/NewUserView';
import EnrolledUserView from '@/components/EnrolledUserView';

const UserDashboard = () => {
  const navigate = useNavigate();
  // Simulate user enrollment status - in real app this would come from database
  const [isNewUser] = useState(false); // Change to true to see new user view
  
  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}/sessions`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      {isNewUser ? (
        <NewUserView onCourseClick={handleCourseClick} />
      ) : (
        <EnrolledUserView onCourseClick={handleCourseClick} />
      )}
    </div>
  );
};

export default UserDashboard;
