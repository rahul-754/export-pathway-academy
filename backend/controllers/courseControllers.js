import User from "../models/userModel.js";
import Course from "../models/courseModel.js";
import Session from "../models/sessionModel.js";
import mongoose from "mongoose";

export const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updates = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course updated", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update course", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.id);

    const course = await Course.findById(courseId).populate("sessions");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrolledUsersCount = await User.countDocuments({
      enrolledCourses: courseId,
    });

    const sessionsWithStudents = await Promise.all(
      course.sessions.map(async (session) => {
        const enrolledStudents = await User.find({
          enrolledSessions: session._id,
        })
          .select("name emailAddress")
          .lean();

        return {
          ...session.toObject(), // session is still a Mongoose doc here
          enrolledStudentsCount: enrolledStudents.length,
          enrolledStudents,
        };
      })
    );

    // Now build the response manually using course fields
    res.json({
      _id: course._id,
      title: course.title,
      shortIntro: course.shortIntro,
      courseDescription: course.courseDescription,
      courseImg: course.courseImg,
      previewVideo: course.previewVideo,
      tags: course.tags,
      category: course.category,
      instructions: course.instructions,
      setting: course.setting,
      pricing: course.pricing,
      totalAmount: course.totalAmount,
      discount: course.discount,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      enrolledUsersCount,
      sessionsCount: course.sessions.length,
      sessions: sessionsWithStudents,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch course", error: error.message });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find().populate("sessions");

    const courseData = await Promise.all(
      courses.map(async (course) => {
        const enrolledUsersCount = await User.countDocuments({
          enrolledCourses: course._id,
        });

        return {
          _id: course._id,
          title: course.title,
          shortIntro: course.shortIntro,
          courseDescription: course.courseDescription,
          courseImg: course.courseImg,
          previewVideo: course.previewVideo,
          tags: course.tags,
          category: course.category,
          instructions: course.instructions,
          setting: course.setting,
          pricing: course.pricing,
          totalAmount: course.totalAmount,
          discount: course.discount,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          sessionsCount: course.sessions.length,
          enrolledUsersCount,
        };
      })
    );

    res.json({
      totalCourses: courses.length,
      courses: courseData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch courses", error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    await User.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } }
    );

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete course", error: error.message });
  }
};
