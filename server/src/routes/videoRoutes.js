import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
  toggleLike,
  toggleDislike
} from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getVideos);

router.post("/", protect, createVideo);

router.put("/:id", protect, updateVideo);

router.delete("/:id", protect, deleteVideo);

router.patch("/:id/like", protect, toggleLike);

router.patch("/:id/dislike", protect, toggleDislike);

export default router;