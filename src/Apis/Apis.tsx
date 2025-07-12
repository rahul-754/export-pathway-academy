import { Quiz } from "@/components/AdminDashboard/Courses/CourseCard/Quizes";
import axiosInstance from "./axiosInstance";

// Course API functions
export const getCourses = async () => {
  try {
    const response = await axiosInstance.get(`/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post(`/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/courses/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Session API functions
export const getSessions = async () => {
  try {
    const response = await axiosInstance.get(`/sessions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const getSessionById = async (id) => {
  try {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching session:", error);
    throw error;
  }
};

export const createQuizWithSessionId = async (
  sessionId: string,
  quiz: Omit<Quiz, "_id">
) => {
  try {
    const response = await axiosInstance.post(`/quiz`, {
      sessionId,
      quiz,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const getQuizWithSessionId = async (sessionId: string) => {
  try {
    const response = await axiosInstance.get(`/quiz`, {
      params: { sessionId },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting quiz:", error);
    throw error;
  }
};

export const updateQuiz = async (quiz: Quiz) => {
  try {
    const response = await axiosInstance.patch("/quiz", { quiz });
    return response.data;
  } catch (e) {
    console.error("Error updating quiz", e);
    throw e;
  }
};

export const checkAllQuizzesPassed = async (userId: string, courseId: string) => {
  try {
    const response = await axiosInstance.get(
      `/quiz/check-all-passed?userId=${userId}&courseId=${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking all quizzes passed:", error);
    return { allQuizzesPassed: false }; // Return a default value on error
  }
};

export const submitQuizAttempt = async (attemptData: {
  quizId: string;
  userId: string;
  score: number;
  status: "passed" | "failed";
}) => {
  try {
            const response = await axiosInstance.post(`/quiz/submit-attempt`, attemptData);
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    throw error;
  }
};

export const getSessionsByCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(`/sessions/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions by course:", error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await axiosInstance.post(`/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const updateSession = async (id, updates) => {
  try {
    const response = await axiosInstance.put(`/sessions/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

export const deleteSession = async (id) => {
  try {
    const response = await axiosInstance.delete(`/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

// User API functions
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(`/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getUserById = async (UserId) => {
  try {
    const response = await axiosInstance.get(`/users/${UserId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const enrollInSessions = async (userId, sessionIds) => {
  try {
    // //console.log("Enrolling user:", userId, "in sessions:", sessionIds);
    const response = await axiosInstance.post(`/users/enroll/sessions`, {
      userId,
      sessionIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling in sessions:", error);
    throw error;
  }
};

// Batch API functions
export const getUserBatches = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/batches`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching user batches:", error);
    throw error;
  }
};

export const getBatchMembers = async (batchId: string) => {
  try {
    const response = await axiosInstance.get(`/batches/${batchId}/members`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch members:", error);
    throw error;
  }
};

// Add this if you have a messages API for batch discussions
export const getBatchMessages = async (batchId) => {
  const response = await axiosInstance.get(`/batches/${batchId}/messages`);
  return response.data;
};

export const sendBatchMessage = async (batchId: string, message: string, userId: string) => {
  try {
    const response = await axiosInstance.post(`/batches/${batchId}/messages`, { message, userId });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Admin: Get all batches
export const getAllBatchesAdmin = async () => {
  try {
    const response = await axiosInstance.get("/batches/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all batches:", error);
    throw error;
  }
};

// Admin: Create batch
export const createBatch = async (batchData: any) => {
  try {
    const response = await axiosInstance.post("/batches", batchData);
    return response.data;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw error;
  }
};

// Admin: Update batch
export const updateBatch = async (id: string, batchData: any) => {
  try {
    const response = await axiosInstance.put(`/batches/${id}`, batchData);
    return response.data;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw error;
  }
};

// Admin: Delete batch
export const deleteBatch = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/batches/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting batch:", error);
    throw error;
  }
};

export const getAllUsers = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await axiosInstance.get(`/users`, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
