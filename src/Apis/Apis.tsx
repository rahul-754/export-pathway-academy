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
    console.error("Error creating quiz:", error);
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
    // console.log("Enrolling user:", userId, "in sessions:", sessionIds);
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
