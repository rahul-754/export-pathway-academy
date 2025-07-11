import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          < BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<NewUserView />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route
                path="/course/:courseId/sessions"
                element={<CourseSessionsPage />}
              />
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
  );
};

export default App;
