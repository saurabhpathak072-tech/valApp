import mongoose from "mongoose";

const ShowMessageSchema = new mongoose.Schema(
  {
    showMessage: { type: Boolean },
  },
  { timestamps: true, versionKey: false },
);

// If the model already exists, use it; otherwise, create it.
export default mongoose.models.ShowMessage ||
  mongoose.model("ShowMessage", ShowMessageSchema);
