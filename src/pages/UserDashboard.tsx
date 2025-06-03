import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '@/components/UserHeader';
import NewUserView from '@/components/NewUserView';
import EnrolledUserView from '@/components/EnrolledUserView';
import { getUserById } from '@/Apis/Apis';


const USER_ID = '683ea3257b617b196caeb490';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false); // default value
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(USER_ID);
        console.log(userData)
        setUser(userData);
        setIsNewUser(userData.enrolledCourses?.length === 0); // or another logic
      } catch (error) {
        console.error('Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/sessions`);
  };

  if (loading) {
    return <div className="p-4">Loading user info...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader  />

      {isNewUser ? (
        <NewUserView user={user} onCourseClick={handleCourseClick} />
      ) : (
        <EnrolledUserView user={user} onCourseClick={handleCourseClick} />
      )}
    </div>
  );
};

export default UserDashboard;
