import mongoose from 'mongoose';

const absenceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { type: String, enum: ['regular', 'emergency', 'delay', 'mission'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  hours: { type: Number }, // for delay absences (1 or 2 hours)
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Absence = mongoose.models.Absence || mongoose.model('Absence', absenceSchema);

export default Absence;