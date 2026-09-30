import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Comment = ({
  comment,
  onUpdated,
  onDeleted,
}) => {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const isOwner =
    user?.id === comment.user?._id;

  const handleUpdate = async () => {
    try {
      const { data } = await api.put(
        `/comments/${comment._id}`,
        {
          text,
        }
      );

      onUpdated(data);

      setEditing(false);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update comment"
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/comments/${comment._id}`
      );

      onDeleted(comment._id);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete comment"
      );
    }
  };

  return (
    <div className="comment">

      <strong>
        {comment.user?.username}
      </strong>

      {editing ? (
        <>
          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          />

          <button onClick={handleUpdate}>
            Save
          </button>

          <button
            onClick={() => {
              setEditing(false);
              setText(comment.text);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{comment.text}</p>

          {isOwner && (
            <>
              <button
                onClick={() => setEditing(true)}
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </>
      )}

    </div>
  );
};

export default Comment;