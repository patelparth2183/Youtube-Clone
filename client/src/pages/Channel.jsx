import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Channel = () => {
  const { channelId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
    Check whether the logged-in user owns this channel.
  */
  const isOwner =
    user &&
    channel &&
    channel.owner &&
    (
      channel.owner._id === user.id ||
      channel.owner === user.id
    );

  /*
    Fetch channel information and videos.
  */
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        setError("");

        /*
          Get channel information.
          Backend endpoint:
          GET /api/channels/:id
        */
        const channelResponse = await api.get(
          `/channels/${channelId}`
        );

        setChannel(channelResponse.data);

        /*
          Get all videos.
          Backend endpoint:
          GET /api/videos
        */
        const videosResponse = await api.get("/videos");

        /*
          Only show videos belonging to this channel.
        */
        const channelVideos = videosResponse.data.filter(
          (video) => {
            const videoChannelId =
              video.channel?._id || video.channel;

            return videoChannelId === channelId;
          }
        );

        setVideos(channelVideos);
      } catch (error) {
        console.error(
          "Failed to fetch channel:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load channel"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  /*
    Delete a video.
  */
  const deleteVideo = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/videos/${id}`);

      /*
        Remove the deleted video from the screen
        without refreshing the page.
      */
      setVideos((currentVideos) =>
        currentVideos.filter(
          (video) => video._id !== id
        )
      );

      alert("Video deleted successfully");
    } catch (error) {
      console.error(
        "Failed to delete video:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete video"
      );
    }
  };

  /*
    Edit a video.

    For now we navigate to the upload page and pass
    the video ID through the URL.

    Later we can create a separate EditVideo.jsx page.
  */
  const editVideo = (video) => {
    navigate(`/upload?edit=${video._id}`);
  };

  /*
    Loading state.
  */
  if (loading) {
    return (
      <div className="channel-page">
        <h2>Loading channel...</h2>
      </div>
    );
  }

  /*
    Error state.
  */
  if (error) {
    return (
      <div className="channel-page">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  /*
    Channel not found.
  */
  if (!channel) {
    return (
      <div className="channel-page">
        <h2>Channel not found</h2>
      </div>
    );
  }

  return (
    <div className="channel-page">

      {/* =========================
          CHANNEL BANNER
      ========================== */}
      <div className="channel-banner">

        {channel.channelBanner ? (
          <img
            src={channel.channelBanner}
            alt={`${channel.channelName} banner`}
          />
        ) : (
          <div className="default-banner">
            <h2>{channel.channelName}</h2>
          </div>
        )}

      </div>


      {/* =========================
          CHANNEL INFORMATION
      ========================== */}
      <div className="channel-info">

        <div className="channel-details">

          <h1>
            {channel.channelName}
          </h1>

          <p>
            {channel.description}
          </p>

          <p>
            {channel.subscribers || 0} subscribers
          </p>

        </div>


        {/* =========================
            OWNER CONTROLS
        ========================== */}
        {isOwner && (
          <div className="channel-actions">

            <Link
              to="/upload"
              className="upload-button"
            >
              Upload Video
            </Link>

          </div>
        )}

      </div>


      {/* =========================
          VIDEOS SECTION
      ========================== */}
      <section className="channel-videos">

        <h2>
          Videos
        </h2>


        {videos.length === 0 ? (
          <div className="no-videos">

            <p>
              No videos have been uploaded to this
              channel yet.
            </p>

            {isOwner && (
              <Link to="/upload">
                Upload your first video
              </Link>
            )}

          </div>
        ) : (

          <div className="channel-video-grid">

            {videos.map((video) => (

              <div
                className="channel-video-card"
                key={video._id}
              >

                {/* =========================
                    VIDEO THUMBNAIL
                ========================== */}

                <Link
                  to={`/watch/${video._id}`}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                </Link>


                {/* =========================
                    VIDEO INFORMATION
                ========================== */}

                <div className="channel-video-info">

                  <Link
                    to={`/watch/${video._id}`}
                  >
                    <h3>
                      {video.title}
                    </h3>
                  </Link>

                  <p>
                    {video.views || 0} views
                  </p>

                  <p>
                    {video.category}
                  </p>


                  {/* =========================
                      EDIT / DELETE
                  ========================== */}

                  {isOwner && (
                    <div className="video-actions">

                      <button
                        type="button"
                        onClick={() =>
                          editVideo(video)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteVideo(video._id)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
};