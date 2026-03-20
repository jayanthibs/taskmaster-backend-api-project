import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  project: {
  type: Schema.Types.ObjectId,
  ref: 'Project',
  required: true
}
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
