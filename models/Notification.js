import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  requiresAction: { type: Boolean, default: false },
  actionTaken: { type: Boolean, default: false },
  actionResponse: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;