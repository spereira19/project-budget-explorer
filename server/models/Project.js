import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  budgetAllocated: {
    type: Number,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default  mongoose.model('Project', projectSchema);