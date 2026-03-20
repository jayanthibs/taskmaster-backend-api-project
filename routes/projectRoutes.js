import express from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

router.use(authMiddleware);

//POST /api/projects
router.post("/", async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: errorMessage });
  }
});

//GET /api/projects

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "user",
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: errorMessage });
  }
});

//GET /api/projects/:id

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with ${req.params.id} iss not found` });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: errorMessage });
  }
});

//PUT /api/projects/:id
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findOne(req.params.id);

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

//DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findOne(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "User is not authorized to delete this project" });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.status(201).json(deletedProject);
  } catch (error) {
    res.status(500).json(err);
  }
});


export default router;