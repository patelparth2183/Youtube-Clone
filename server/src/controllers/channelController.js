export const createChannel = async (req, res) => {
  const {
    channelName,
    description,
    channelBanner
  } = req.body;

  const channel = await Channel.create({
    channelName,
    description,
    channelBanner,
    owner: req.userId
  });

  res.status(201).json(channel);
};