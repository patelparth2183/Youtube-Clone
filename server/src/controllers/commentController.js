import Comment from "../models/Comment.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { video, text } = req.body;

    if (!video || !text?.trim()) {
      return res.status(400).json({
        message: "Video and comment text are required",
      });
    }

    const comment = await Comment.create({
      video,
      user: req.userId,
      text: text.trim(),
    });

    const populatedComment = await comment.populate(
      "user",
      "username avatar"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create comment",
    });
  }
};


// READ COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      video: req.params.videoId,
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};


// UPDATE COMMENT
export const updateComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can edit
    if (comment.user.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only edit your own comment",
      });
    }

    comment.text = text.trim();

    await comment.save();

    const updatedComment = await comment.populate(
      "user",
      "username avatar"
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update comment",
    });
  }
};


// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only delete your own comment",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};