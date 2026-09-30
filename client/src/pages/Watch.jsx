import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

function Watch() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load video
    const fetchVideo = async () => {
      const response = await api.get(`/videos/${videoId}`);
      setVideo(response.data);
    };

    // Load comments
    const fetchComments = async () => {
      const response = await api.get(`/comments/video/${videoId}`);
      setComments(response.data);
    };

    fetchVideo();
    fetchComments();
  }, [videoId]);

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment._id === updatedComment._id
          ? updatedComment
          : comment
      )
    );
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prev) =>
      prev.filter((comment) => comment._id !== commentId)
    );
  };

  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="watch-page">

      {/* Video Player */}
      <div className="video-player">
        <video
          src={video.videoUrl}
          controls
          width="100%"
        />
      </div>

      {/* Video Information */}
      <h1>{video.title}</h1>

      <p>{video.description}</p>

      {/* ========================= */}
      {/* COMMENTS SECTION */}
      {/* ========================= */}

      <section className="comments">
        <h2>Comments ({comments.length})</h2>

        <CommentForm
          videoId={videoId}
          onCommentAdded={handleCommentAdded}
        />

        <div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onUpdated={handleCommentUpdated}
              onDeleted={handleCommentDeleted}
            />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Watch;