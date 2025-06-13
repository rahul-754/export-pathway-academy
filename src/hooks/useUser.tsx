import { UserContext, UserContextType } from "@/contexts/UserContext";
import { useContext } from "react";

// Custom hook for easy use
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
