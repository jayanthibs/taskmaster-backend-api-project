import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../utils/auth.js";
import Task from '../models/Task.js'

const router = express.Router();

router.use(authMiddleware);

//POST /api/projects --- create a new project
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET /api/projects  --- get all projects for the valid user

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "user",
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET /api/projects/:id  --- get a single project

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ${req.params.id} is not found` });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PUT /api/projects/:id  -- update a project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({_id:req.params.id});

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE /api/projects/:id  --- delete a project and it's tasks
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({_id:req.params.id});

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this project" });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    const deletedTasks = await Task.deleteMany({ project: req.params.id});
    res.status(200).json(deletedProject, deletedTasks);
  } catch (error) {
    res.status(500).json(err);
  }
});


export default router;