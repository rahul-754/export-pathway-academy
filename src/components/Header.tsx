import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
  // Auth modal state
  const [authOpen, setAuthOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // Signup form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Login form
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Handle manual signup
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!signupName || !signupEmail || !signupPhone || !signupPassword) {
      setError("Please fill all signup fields.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const role = signupEmail === "dev@terrasourcing.com" ? "admin" : "trainee";
      const payload = {
        name: signupName,
        emailAddress: signupEmail,
        phoneNumber: signupPhone,
        password: signupPassword,
        companyName: "",
        country: "",
        role,
      };

      const res = await registerUser(payload);
      if (res?.token && res?.user) {
        login({ token: res.token, user: res.user });
        setAuthOpen(false);
        // Redirect based on role
        if (res.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin-dashboard");
        } else if (res.user.enrolledSessions?.length) {
          navigate("/user-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle manual login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginIdentifier || !loginPassword) {
      setError("Please enter identifier and password.");
      return;
    }

    setLoading(true);
    try {
      // Backend login expects emailAddress; front-end accepts username/email/phone in one field.
      // We'll send the identifier as emailAddress (the backend currently finds by emailAddress).
      const res = await loginUser({ emailAddress: loginIdentifier, password: loginPassword });
      if (res?.token && res?.user) {
        login({ token: res.token, user: res.user });
        setAuthOpen(false);
        if (res.user.role === "admin") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin-dashboard");
        } else if (res.user.enrolledSessions?.length) {
          navigate("/user-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetch(`/api/notifications/${user._id}`)
        .then(res => res.json())
        .then(data => setNotifications(data.notifications || []))
        .catch(() => setNotifications([]));
    }
  }, [isAuthenticated, user]);

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
                  className="border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff] flex items-center"
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
                    className="border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff] relative"
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
                        className="text-[#0072e6] hover:underline block mt-2"
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
                    className="relative border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
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
                  className="border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
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
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
                    onClick={() => {
                      setIsSignup(false);
                      setAuthOpen(true);
                    }}
                  >
                    Sign Up / Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-[#f8faff] rounded-2xl shadow-xl border-none max-w-md w-full transition-all duration-300">
                  <div className="px-8 py-7">
                    <DialogHeader className="mb-2">
                      <DialogTitle className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{isSignup ? "Sign Up" : "Login"}</DialogTitle>
                      <DialogDescription className="text-base text-gray-500 mb-4">
                        {isSignup ? "Create an account to start learning." : "Login with your credentials."}
                      </DialogDescription>
                      <div className="flex gap-2 mb-2 justify-center">
                        <button
                          type="button"
                          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none ${!isSignup ? 'bg-[#0072e6] text-white shadow-sm' : 'bg-white text-[#0072e6] border border-[#0072e6]'} hover:bg-[#005bb5] hover:text-white`}
                          onClick={() => setIsSignup(false)}
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none ${isSignup ? 'bg-[#0072e6] text-white shadow-sm' : 'bg-white text-[#0072e6] border border-[#0072e6]'} hover:bg-[#005bb5] hover:text-white`}
                          onClick={() => setIsSignup(true)}
                        >
                          Sign Up
                        </button>
                      </div>
                    </DialogHeader>
                    <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit} className="space-y-4 mt-2">
                      {isSignup ? (
                        <>
                          <div>
                            <Label htmlFor="signup-name" className="text-sm font-medium text-gray-700 mb-1">Full name</Label>
                            <Input
                              id="signup-name"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              placeholder="Your full name"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700 mb-1">Email</Label>
                            <Input
                              id="signup-email"
                              type="email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-phone" className="text-sm font-medium text-gray-700 mb-1">Phone</Label>
                            <Input
                              id="signup-phone"
                              value={signupPhone}
                              onChange={(e) => setSignupPhone(e.target.value)}
                              placeholder="Phone number"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700 mb-1">Password</Label>
                            <Input
                              id="signup-password"
                              type="password"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Choose a secure password"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="login-identifier" className="text-sm font-medium text-gray-700 mb-1">Email</Label>
                            <Input
                              id="login-identifier"
                              value={loginIdentifier}
                              onChange={(e) => setLoginIdentifier(e.target.value)}
                              placeholder="username or email or phone"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="login-password" className="text-sm font-medium text-gray-700 mb-1">Password</Label>
                            <Input
                              id="login-password"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Your password"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                        </>
                      )}
                      {error && (
                        <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
                      )}
                      <DialogFooter className="mt-4">
                        <div className="flex gap-2 w-full">
                          <Button
                            type="submit"
                            className="w-full bg-[#0072e6] hover:bg-[#005bb5] text-white font-semibold rounded-xl shadow-md transition-all duration-200 py-2"
                            disabled={loading}
                          >
                            {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
                          </Button>
                          <DialogClose asChild>
                            <Button variant="ghost" className="rounded-xl">Close</Button>
                          </DialogClose>
                        </div>
                      </DialogFooter>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      {isSignup ? (
                        <span>
                          Already have an account?{' '}
                          <button type="button" className="text-[#0072e6] hover:underline font-medium" onClick={() => setIsSignup(false)}>
                            Login
                          </button>
                        </span>
                      ) : (
                        <span>
                          Don't have an account?{' '}
                          <button type="button" className="text-[#0072e6] hover:underline font-medium" onClick={() => setIsSignup(true)}>
                            Sign Up
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                      className="w-full border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/batches">
                    <Button
                      variant="outline"
                      className="w-full border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
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
                        className="border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff] relative"
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
                            className="text-[#0072e6] hover:underline block mt-2"
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
                        className="relative border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
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
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-[#0072e6] text-[#0072e6] hover:bg-[#e6f3ff]"
                    onClick={() => {
                      setIsSignup(false);
                      setAuthOpen(true);
                    }}
                  >
                    Sign Up / Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-[#f8faff] rounded-2xl shadow-xl border-none max-w-md w-full transition-all duration-300">
                  <div className="px-8 py-7">
                    <DialogHeader className="mb-2">
                      <div className="w-full mb-4">
  <div className="flex w-full border border-[#0072e6] rounded-lg overflow-hidden">
    <button
      type="button"
      className={`w-1/2 py-2 font-medium text-sm transition-all duration-200 focus:outline-none ${
        !isSignup
          ? 'bg-[#0072e6] text-white'
          : 'bg-[#e6f0ff] text-[#0072e6]'
      }`}
      onClick={() => setIsSignup(false)}
    >
      Login
    </button>
    <button
      type="button"
      className={`w-1/2 py-2 font-medium text-sm transition-all duration-200 focus:outline-none ${
        isSignup
          ? 'bg-[#0072e6] text-white'
          : 'bg-[#e6f0ff] text-[#0072e6]'
      }`}
      onClick={() => setIsSignup(true)}
    >
      Signup
    </button>
  </div>
</div>

                      <DialogTitle className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{isSignup ? "Sign Up" : "Login"}</DialogTitle>
                      <DialogDescription className="text-base text-gray-500 mb-4">
                        {isSignup ? "Create an account to start learning." : "Login with your credentials."}
                      </DialogDescription>
                      
                    </DialogHeader>
                    <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit} className="space-y-4 mt-2">
                      {isSignup ? (
                        <>
                          <div>
                            <Label htmlFor="signup-name-mobile" className="text-sm font-medium text-gray-700 mb-1">Full name</Label>
                            <Input
                              id="signup-name-mobile"
                              value={signupName}
                              onChange={(e) => setSignupName(e.target.value)}
                              placeholder="Your full name"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-email-mobile" className="text-sm font-medium text-gray-700 mb-1">Email</Label>
                            <Input
                              id="signup-email-mobile"
                              type="email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-phone-mobile" className="text-sm font-medium text-gray-700 mb-1">Phone</Label>
                            <Input
                              id="signup-phone-mobile"
                              value={signupPhone}
                              onChange={(e) => setSignupPhone(e.target.value)}
                              placeholder="Phone number"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="signup-password-mobile" className="text-sm font-medium text-gray-700 mb-1">Password</Label>
                            <Input
                              id="signup-password-mobile"
                              type="password"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="Choose a secure password"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="login-identifier-mobile" className="text-sm font-medium text-gray-700 mb-1">Email</Label>
                            <Input
                              id="login-identifier-mobile"
                              value={loginIdentifier}
                              onChange={(e) => setLoginIdentifier(e.target.value)}
                              placeholder="Email"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="login-password-mobile" className="text-sm font-medium text-gray-700 mb-1">Password</Label>
                            <Input
                              id="login-password-mobile"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Your password"
                              className="mt-1 rounded-xl border border-gray-300 focus:border-[#0072e6] focus:ring-2 focus:ring-[#0072e6]/30 transition-all duration-200 bg-white shadow-sm"
                            />
                          </div>
                        </>
                      )}
                      {error && (
                        <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
                      )}
                      <DialogFooter className="mt-4">
                        <div className="flex gap-2 w-full">
                          <Button
                            type="submit"
                            className="w-full bg-[#0072e6] hover:bg-[#005bb5] text-white font-semibold rounded-xl shadow-md transition-all duration-200 py-2"
                            disabled={loading}
                          >
                            {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
                          </Button>
                          <DialogClose asChild>
                            <Button variant="ghost" className="rounded-xl">Close</Button>
                          </DialogClose>
                        </div>
                      </DialogFooter>
                    </form>
                    <div className="mt-4 text-center text-sm text-gray-600">
                      {isSignup ? (
                        <span>
                          Already have an account?{' '}
                          <button type="button" className="text-[#0072e6] hover:underline font-medium" onClick={() => setIsSignup(false)}>
                            Login
                          </button>
                        </span>
                      ) : (
                        <span>
                          Don't have an account?{' '}
                          <button type="button" className="text-[#0072e6] hover:underline font-medium" onClick={() => setIsSignup(true)}>
                            Sign Up
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
