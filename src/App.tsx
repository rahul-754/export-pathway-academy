import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./pages/UserDashboardPage";
import CoursesPage from "./pages/CoursesPage";
import ProgramsPage from "./pages/ProgramsPage";
import BatchesPage from "./pages/BatchesPage";
import CertificationPage from "./pages/CertificationPage";
import CourseSessionsPage from "./pages/CourseSessionsPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import NewUserView from "./pages/NewUserViewPage";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useMemo } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { HelmetProvider, Helmet } from "react-helmet-async";

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="canonical" href="https://learn.terrasourcing.com/" />
      </Helmet>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<NewUserView />} />
                <Route path="/courses" element={<CoursesPage />} />

                {/* Only these static routes will work */}
                <Route
                  path="/course/Export-Success-Mastery/BasicSessions"
                  element={<CourseSessionsPage />}
                />
                <Route
                  path="/course/Export-Success-Mastery/AdvancedSessions"
                  element={<CourseSessionsPage />}
                />

                {/* Optional: Redirect old paths to new static URLs */}
                <Route
                  path="/course/Export-Success-Mastery/sessions/basic"
                  element={<Navigate to="/course/Export-Success-Mastery/BasicSessions" replace />}
                />
                <Route
                  path="/course/Export-Success-Mastery/sessions/advanced"
                  element={<Navigate to="/course/Export-Success-Mastery/AdvancedSessions" replace />}
                />

                {/* Dynamic route removed! */}

                <Route
                  path="/user-dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quiz/:sessionId"
                  element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/programs"
                  element={
                    <ProtectedRoute>
                      <ProgramsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/batches/:batchId?"
                  element={
                    <ProtectedRoute>
                      <BatchesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/certification"
                  element={
                    <ProtectedRoute>
                      <CertificationPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/course/sessions" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </UserProvider>
    </HelmetProvider>
  );
};

export default App;
