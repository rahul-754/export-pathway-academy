import Session from "../models/sessionModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const createSession = async (req, res) => {
  try {
    const sessionData = req.body;
    const session = new Session(sessionData);
    await session.save();

    if (sessionData.courseId) {
      await Course.findByIdAndUpdate(
        sessionData.courseId,
        { $push: { sessions: session._id } },
        { new: true }
      );
    }

    res.status(201).json({ message: "Session created successfully", session });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create session", error: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const updates = req.body;
    const session = await Session.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Session updated", session });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update session", error: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const sessionId = new mongoose.Types.ObjectId(req.params.id);

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const course = await Course.findOne({ sessions: sessionId })
      .select("title _id")
      .lean();

    const enrolledStudents = await User.find({ enrolledSessions: sessionId })
      .select("name emailAddress")
      .lean();

    res.json({
      ...session.toObject(),
      enrolledStudentsCount: enrolledStudents.length,
      enrolledStudents,
      parentCourse: course || null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch session", error: error.message });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();

    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const enrolledStudentsCount = await User.countDocuments({
          enrolledSessions: session._id,
        });
        const course = await Course.findOne({ sessions: session._id })
          .select("title _id")
          .lean();

        return {
          ...session.toObject(),
          enrolledStudentsCount,
          parentCourse: course || null,
        };
      })
    );

    res.json({
      totalSessions: sessions.length,
      sessions: sessionsWithDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch sessions", error: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const sessionId = new mongoose.Types.ObjectId(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }
    await Course.updateMany(
      { sessions: sessionId },
      { $pull: { sessions: sessionId } }
    );

    await User.updateMany(
      { enrolledSessions: sessionId },
      { $pull: { enrolledSessions: sessionId } }
    );

    const session = await Session.findByIdAndDelete(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete session", error: error.message });
  }
};

export const getSessionsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId).populate("sessions");
    if (!course) return res.status(404).json({ message: "Course not found" });

    const sessionsWithDetails = await Promise.all(
      course.sessions.map(async (session) => {
        const enrolledStudentsCount = await User.countDocuments({
          enrolledSessions: session._id,
        });
        return {
          ...session.toObject(),
          enrolledStudentsCount,
        };
      })
    );

    res.json({
      courseId: course._id,
      courseTitle: course.title,
      totalSessions: course.sessions.length,
      sessions: sessionsWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sessions for course",
      error: error.message,
    });
  }
};
