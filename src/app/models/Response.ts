// models/User.ts
import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema(
  {
    Yes: { type: Boolean, required: true },
    No: { type: Boolean, required: true },
    NoText: { type: String }, // Optional field to store the teasing text
    yesText: { type: String }, // Optional field to store the yes text
  },
  { timestamps: true, versionKey: false },
);

// If the model already exists, use it; otherwise, create it.
export default mongoose.models.Response ||
  mongoose.model("Response", ResponseSchema);
