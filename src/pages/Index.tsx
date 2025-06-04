import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/../public/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "@/Apis/Apis";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else if (username === "user" && password === "user123") {
      navigate("/user-dashboard/");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google login successful", decoded);
      const userRole =
        decoded.email === "dev@terrasourcing.com" ? "admin" : "trainee";

      const userData = {
        name: decoded.name,
        emailAddress: decoded.email,
        password: "",
        companyName: "",
        phoneNumber: "",
        country: "",
        role: userRole,
        profilePicture: decoded.picture || "",
      };

      let finalResponse;

      try {
        const loginResponse = await loginUser({
          emailAddress: userData.emailAddress,
          password: userData.password,
        });
        finalResponse = loginResponse;
      } catch (loginError) {
        if (loginError.response?.status === 404) {
          const registerResponse = await registerUser(userData);
          finalResponse = registerResponse;
        } else {
          console.error("Login failed:", loginError);
          return;
        }
      }

      if (finalResponse?.token && finalResponse?.user) {
        const authData = {
          token: finalResponse.token,
          user: {
            ...finalResponse.user,
            source: "terrasourcing",
          },
        };

        localStorage.setItem("TerraAuthData", JSON.stringify(authData));

        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else if (userData.role === "trainee") {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Google login processing failed:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-10 w-auto object-cover" />
              <h1 className="text-2xl font-bold text-gray-900">
                TerraSouring
              </h1>
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Master Export Business
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our comprehensive learning platform designed specifically for
              export professionals. Access courses, get certified, and connect
              with a thriving community.
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

          {/* Login Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md hover:shadow-lg transition-all duration-300 border-2 border-blue-100">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Login</CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    type="submit"
                  >
                    Login
                  </Button>

                  {/* Divider */}
                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Google OAuth Button */}
                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginError}
                      width="300"
                      shape="rectangular"
                      theme="filled_blue"
                      text="continue_with"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="h-10 w-auto object-cover" />

            <span className="text-lg font-semibold">TerraSouring</span>
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
