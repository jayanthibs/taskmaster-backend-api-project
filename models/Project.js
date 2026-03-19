import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },

  // Example field in projectSchema
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
