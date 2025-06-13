import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "@/components/UserHeader";
import NewUserView from "@/pages/NewUserView";
import EnrolledUserView from "@/components/EnrolledUserView";
import { getUserById } from "@/Apis/Apis";
import { FaSpinner } from "react-icons/fa";

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
          // //console.log("User data:", userData);
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

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FaSpinner className="animate-spin w-16 h-16" />
      </div>
    );
  }

  return <EnrolledUserView user={user} />;
};

export default UserDashboard;
