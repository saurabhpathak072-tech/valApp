// models/User.ts
import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  Yes: { type: Boolean, required: true },
  No: { type: Boolean, required: true },
});

// If the model already exists, use it; otherwise, create it.
export default mongoose.models.Response ||
  mongoose.model("Response", ResponseSchema);
