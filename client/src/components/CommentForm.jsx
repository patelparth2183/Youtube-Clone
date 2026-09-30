import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const CommentForm = ({ videoId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please login to comment");
      return;
    }

    if (!text.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const { data } = await api.post("/comments", {
        video: videoId,
        text,
      });

      onCommentAdded(data);

      setText("");
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add comment"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows="3"
      />

      {error && <p className="error">{error}</p>}

      <button type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;