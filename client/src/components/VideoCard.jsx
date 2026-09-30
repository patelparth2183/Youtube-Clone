import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="video-card"
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
      />

      <div className="video-info">

        <h3>{video.title}</h3>

        <p>
          {video.channel?.channelName}
        </p>

        <span>
          {video.views.toLocaleString()} views
        </span>

      </div>
    </Link>
  );
};

export default VideoCard;