import Video from "../models/Video.js";

export const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const videos = await Video.find(filter)
      .populate("channel", "channelName")
      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch videos"
    });
  }
};

export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel
    } = req.body;

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel,
      uploader: req.userId
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: "Video creation failed"
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found"
      });
    }

    if (video.uploader.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only edit your own videos"
      });
    }

    Object.assign(video, req.body);

    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({
      message: "Video update failed"
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found"
      });
    }

    if (video.uploader.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only delete your own videos"
      });
    }

    await video.deleteOne();

    res.json({
      message: "Video deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Video deletion failed"
    });
  }
};

export const toggleLike = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({
      message: "Video not found"
    });
  }

  const userId = req.userId.toString();

  const liked = video.likes.some(
    id => id.toString() === userId
  );

  const disliked = video.dislikes.some(
    id => id.toString() === userId
  );

  if (liked) {
    video.likes.pull(req.userId);
  } else {
    video.likes.push(req.userId);

    if (disliked) {
      video.dislikes.pull(req.userId);
    }
  }

  await video.save();

  res.json({
    likes: video.likes.length,
    dislikes: video.dislikes.length
  });
};