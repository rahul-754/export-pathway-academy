
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CoursesPage from "./pages/CoursesPage";
import SessionsPage from "./pages/SessionsPage";
import ProgramsPage from "./pages/ProgramsPage";
import BatchesPage from "./pages/BatchesPage";
import CertificationPage from "./pages/CertificationPage";
import NotFound from "./pages/NotFound";

const App = () => {
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
