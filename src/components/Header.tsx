import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { loginUser, registerUser } from "@/Apis/Apis";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";
import { Bell, Home, Menu, ShoppingCart, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface GoogleJwt {
  name: string;
  email: string;
  picture?: string;
}

export default function Header() {
  const navigate = useNavigate();
  const { user, login, logout, isAuthenticated } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your course "Export Fundamentals" starts tomorrow!' },
    { id: 2, text: "New message from admin." },
    { id: 3, text: 'Batch "July Exporters" is now active.' },
  ]);

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      setError("Invalid Google credential.");
      return;
    }

    setLoading(true);
    try {
      const decoded = jwtDecode<GoogleJwt>(credentialResponse.credential);
      const userRole =
        decoded.email === "dev@terrasourcing.com" ? "admin" : "trainee";

      const userData = {
        name: decoded.name,
        emailAddress: decoded.email,
        password: "", // not needed for Google
        companyName: "",
        phoneNumber: "",
        country: "",
        role: userRole,
        profilePicture: decoded.picture || "",
      };

      let finalResponse;
      try {
        finalResponse = await loginUser({
          emailAddress: userData.emailAddress,
          password: "",
        });
      } catch (loginError) {
        if (loginError.response?.status === 404) {
          finalResponse = await registerUser(userData);
        } else {
          setError("Login failed. Please try again later.");
          setLoading(false);
          return;
        }
      }

      if (finalResponse?.token && finalResponse?.user) {
        login({
          token: finalResponse.token,
          user: {
            ...finalResponse.user,
            source: "terrasourcing",
          },
        });

        // Redirect based on role
        if (finalResponse.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (finalResponse.user.enrolledSessions.length !== 0) {
          navigate("/user-dashboard");
        } else {
          navigate("/"); // or wherever you want for new users
        }
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError("Google login failed. Please try again.");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className="bg-white border-b w-full p-4">
      <div className="flex justify-between items-center w-full max-w-[1520px] mx-auto">
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "auto", height: "40px", objectFit: "cover" }}
        />
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/batches">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-900 hover:bg-blue-50 flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Batches
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-900 hover:bg-blue-50 relative"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-96 p-0">
                  {cartItems.length === 0 ? (
                    <div className="p-4 text-sm text-gray-600 ">
                      Your cart is empty.
                      <Link
                        to="/courses"
                        className="text-blue-600 hover:underline block mt-2"
                      >
                        Keep shopping
                      </Link>
                    </div>
                  ) : (
                    <ul className="max-h-64 overflow-auto">
                      {cartItems.map((item, idx) => (
                        <li
                          key={idx}
                          className="p-3 border-b text-sm text-gray-700"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative border-blue-600 text-blue-900 hover:bg-blue-50"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-96 p-0">
                  <div className="flex justify-between items-center px-4 pt-4">
                    <h2 className="text-lg font-bold">Notifications</h2>
                  </div>
                  <ul className="space-y-2 p-4 pt-2">
                    {notifications.length === 0 ? (
                      <li className="text-gray-500 text-center">
                        No notifications.
                      </li>
                    ) : (
                      notifications.map((n) => (
                        <li
                          key={n.id}
                          className="p-3 bg-gray-100 rounded flex justify-between items-center"
                        >
                          <span>{n.text}</span>
                          <button
                            onClick={() => handleDismissNotification(n.id)}
                            className="ml-2 text-gray-400 hover:text-red-600"
                            title="Dismiss"
                          >
                            &#10005;
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                </PopoverContent>
              </Popover>
              <Link
                to={user.enrolledCourses.length === 0 ? "/" : "/user-dashboard"}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-900 hover:bg-blue-50"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>

              <div className="flex gap-2 items-center">
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
                {user?.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt="User"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-800">
                  {user?.name}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-end">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                shape="pill"
                theme="filled_blue"
                text="signin_with"
              />
              {error && (
                <p className="text-sm text-red-600 mt-2 text-right">{error}</p>
              )}
            </div>
          )}
        </div>
        <div className="md:hidden">
          {isAuthenticated ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5 text-black" color="#000000" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="mt-4 flex flex-col gap-4">
                  {user?.profilePicture && (
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={user.profilePicture}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{user.name}</span>
                    </div>
                  )}
                  <Link
                    to={
                      user.enrolledCourses.length === 0
                        ? "/"
                        : "/user-dashboard"
                    }
                  >
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-900 hover:bg-blue-50"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/batches">
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-900 hover:bg-blue-50"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Batches
                    </Button>
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-900 hover:bg-blue-50 relative"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Cart
                        {cartItems.length > 0 && (
                          <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                            {cartItems.length}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-96 p-0">
                      {cartItems.length === 0 ? (
                        <div className="p-4 text-sm text-gray-600 ">
                          Your cart is empty.
                          <Link
                            to="/courses"
                            className="text-blue-600 hover:underline block mt-2"
                          >
                            Keep shopping
                          </Link>
                        </div>
                      ) : (
                        <ul className="max-h-64 overflow-auto">
                          {cartItems.map((item, idx) => (
                            <li
                              key={idx}
                              className="p-3 border-b text-sm text-gray-700"
                            >
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="relative border-blue-600 text-blue-900 hover:bg-blue-50"
                      >
                        <Bell className="w-4 h-4" />
                        Notifications
                        {notifications.length > 0 && (
                          <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                            {notifications.length}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-96 p-0">
                      <div className="flex justify-between items-center px-4 pt-4">
                        <h2 className="text-lg font-bold">Notifications</h2>
                      </div>
                      <ul className="space-y-2 p-4 pt-2">
                        {notifications.length === 0 ? (
                          <li className="text-gray-500 text-center">
                            No notifications.
                          </li>
                        ) : (
                          notifications.map((n) => (
                            <li
                              key={n.id}
                              className="p-3 bg-gray-100 rounded flex justify-between items-center"
                            >
                              <span>{n.text}</span>
                              <button
                                onClick={() => handleDismissNotification(n.id)}
                                className="ml-2 text-gray-400 hover:text-red-600"
                                title="Dismiss"
                              >
                                &#10005;
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                shape="pill"
                theme="filled_blue"
                text="signin_with"
              />
              {error && (
                <p className="text-sm text-red-600 mt-2 text-right">{error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
