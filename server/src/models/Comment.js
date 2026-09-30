export const createComment = async (req, res) => {
  try {
    const { video, text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty"
      });
    }

    const comment = await Comment.create({
      video,
      text,
      user: req.userId
    });

    const populatedComment = await comment.populate(
      "user",
      "username avatar"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({
      message: "Unable to add comment"
    });
  }
};