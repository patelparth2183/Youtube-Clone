import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

const Watch = () => {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const videos = await api.get("/videos");

      const selected = videos.data.find(
        video => video._id === videoId
      );

      setVideo(selected);

      const commentResponse = await api.get(
        `/comments/video/${videoId}`
      );

      setComments(commentResponse.data);
    };

    load();
  }, [videoId]);

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <main>

      <video
        src={video.videoUrl}
        controls
        width="100%"
      />

      <h1>{video.title}</h1>

      <p>
        {video.channel?.channelName}
      </p>

      <p>
        {video.views} views
      </p>

      <div>
        <button>👍 {video.likes.length}</button>

        <button>👎 {video.dislikes.length}</button>
      </div>

      <p>{video.description}</p>

      {comments.map((comment) => (
        <div key={comment._id}>

          <strong>
            {comment.user.username}
          </strong>

          <p>{comment.text}</p>

          {user?.id === comment.user._id && (
            <>
              <button onClick={() => editComment(comment)}>
                Edit
              </button>

              <button onClick={() => deleteComment(comment._id)}>
                Delete
              </button>
            </>
          )}

        </div>
      ))}

    </main>
  );
};

export default Watch;