import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String },
  phoneNumber: { type: String },
  password: {
    type: String,
    select: false
  },
  emailAddress: { type: String, required: true, unique: true },
  country: { type: String },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  enrolledSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  role: {
    type: String,
    enum: ['trainee', 'admin'],
    default: 'trainee',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
