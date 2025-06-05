import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CoursesPage from "./pages/CoursesPage";
import SessionsPage from "./pages/SessionsPage";
import ProgramsPage from "./pages/ProgramsPage";
import BatchesPage from "./pages/BatchesPage";
import CertificationPage from "./pages/CertificationPage";
import CourseSessionsPage from "./pages/CourseSessionsPage";
import NotFound from "./pages/NotFound";
import { getUserById } from "./Apis/Apis";
import Footer from "./components/Footer";

const App = () => {
  const queryClient = React.useMemo(() => new QueryClient(), []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = "683ea3257b617b196caeb490"; // Replace with actual user ID
        const userData = await getUserById(userId);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route
              path="/course/:courseId/sessions"
              element={<CourseSessionsPage />}
            />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
