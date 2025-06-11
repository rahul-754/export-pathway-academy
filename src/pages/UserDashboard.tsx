import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "@/components/UserHeader";
import NewUserView from "@/components/NewUserView/NewUserView";
import EnrolledUserView from "@/components/EnrolledUserView";
import { getUserById } from "@/Apis/Apis";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedAuth = localStorage.getItem("TerraAuthData");
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          const localData = parsed.user;
          const userData = await getUserById(localData._id);
          setUser(userData);
          const noCourses = userData.enrolledCourses?.length === 0;
          const noSessions = userData.enrolledSessions?.length === 0;
          console.log("User data:", userData);
          if (noCourses && noSessions) setIsNewUser(true);
          else setIsNewUser(false);
          // setIsNewUser(noCourses && noSessions);
        } catch (err) {
          console.error("Invalid auth data in localStorage or API error", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("No auth data found, redirecting to login");
        alert("Please log in to access your dashboard.");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}/sessions`);
  };

  if (loading) {
    return <div className="p-4">Loading user info...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
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
