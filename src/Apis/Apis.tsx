import axios from 'axios';

const BASE_URL = 'https://mdm.ai.multipliersolutions.in/api';

// Course API functions
export const getCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(`${BASE_URL}/courses`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourse = async (id, updates) => {
  try {
    const response = await axios.put(`${BASE_URL}/courses/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Session API functions
export const getSessions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const getSessionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
};

export const getSessionsByCourse = async (courseId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions by course:', error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};

export const updateSession = async (id, updates) => {
  try {
    const response = await axios.put(`${BASE_URL}/sessions/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating session:', error);
    throw error;
  }
};

export const deleteSession = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

// User API functions
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getUserById = async (UserId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${UserId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
}