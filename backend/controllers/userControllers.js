import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import Session from '../models/sessionModel.js';

export const registerUser = async (req, res) => {
  try {
    const { name, emailAddress, password, ...rest } = req.body;

    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, emailAddress, ...rest });
    user.password = hashedPassword;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const { password: _, ...userData } = user.toObject();

    if (process.env.NODE_ENV === 'development') {
      res.status(201).json({ message: 'User registered successfully', user: userData, token });
    } else {
      res.status(201).json({ message: 'User registered successfully', user: userData });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;
    const user = await User.findOne({ emailAddress }).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, 
    });

    
    const { password: _, ...userData } = user.toObject();

   if (process.env.NODE_ENV === 'development') {
      res.status(201).json({ message: 'User Login successfully', user: userData, token });
    } else {
      res.status(201).json({ message: 'User Login successfully', user: userData });
    }
    } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('enrolledCourses')
      .populate('enrolledSessions');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const userObj = user.toObject();

    res.json({
      ...userObj,
      enrolledCoursesCount: user.enrolledCourses.length,
      enrolledSessionsCount: user.enrolledSessions.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};



export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('enrolledCourses')
      .populate('enrolledSessions');

    const usersWithDetails = users.map(user => ({
      ...user.toObject(),
      enrolledCoursesCount: user.enrolledCourses.length,
      enrolledSessionsCount: user.enrolledSessions.length,
    }));

    const activeUsersCount = await User.countDocuments({ role: 'trainee' });

    res.json({
      totalUsers: users.length,
      activeUsers: activeUsersCount,
      users: usersWithDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

export const removeEnrolledCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { enrolledCourses: courseId } },
      { new: true }
    );

    res.json({ message: 'Course removed from enrollment', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove course', error: error.message });
  }
};

export const removeEnrolledSession = async (req, res) => {
  try {
    const { userId, sessionId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { enrolledSessions: sessionId } },
      { new: true }
    );

    res.json({ message: 'Session removed from enrollment', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove session', error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('enrolledCourses')
      .populate('enrolledSessions');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const userObj = user.toObject();

    res.json({
      ...userObj,
      enrolledCoursesCount: user.enrolledCourses.length,
      enrolledSessionsCount: user.enrolledSessions.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user info', error: error.message });
  }
};
