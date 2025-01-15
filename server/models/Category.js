import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["budget", "expense"],
    },
  });

export default mongoose.model('Category', categorySchema);