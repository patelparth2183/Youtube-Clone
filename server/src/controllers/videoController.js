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