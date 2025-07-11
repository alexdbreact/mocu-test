import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'subadmin', 'admin'], required: true },
  remainingDays: { 
    type: Number, 
    default: 30,
    min: 0 // Ensure it never goes negative
  },
  emergencyDays: { 
    type: Number, 
    default: 7,
    min: 0
  },
  monthlyShortAbsenceCount: { 
    type: Number, 
    default: 0
  },
  department: { type: String }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;