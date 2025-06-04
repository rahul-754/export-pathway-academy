import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "@/components/UserHeader";
import NewUserView from "@/components/NewUserView";
import EnrolledUserView from "@/components/EnrolledUserView";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("TerraAuthData");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        const userData = parsed.user;

        setUser(userData);
        const noCourses = userData.enrolledCourses?.length === 0;
        const noSessions = userData.enrolledSessions?.length === 0;
        setIsNewUser(noCourses && noSessions);
      } catch (err) {
        console.error("Invalid auth data in localStorage", err);
      }
    } else {
      console.warn("No auth data found, redirecting to login");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/sessions`);
  };

  if (loading) {
    return <div className="p-4">Loading user info...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      {isNewUser ? (
        <NewUserView user={user} onCourseClick={handleCourseClick} />
      ) : (
        <EnrolledUserView user={user} onCourseClick={handleCourseClick} />
      )}
    </div>
  );
};

export default UserDashboard;
