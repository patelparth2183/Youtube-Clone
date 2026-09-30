import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const UploadVideo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "Programming",
    channel: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Music",
    "Gaming",
    "Programming",
    "News",
    "Sports",
    "Education",
    "Entertainment"
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.videoUrl.trim()) {
      setError("Video URL is required");
      return;
    }

    if (!form.thumbnailUrl.trim()) {
      setError("Thumbnail URL is required");
      return;
    }

    if (!form.channel.trim()) {
      setError("Channel ID is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/videos", {
        title: form.title,
        description: form.description,
        videoUrl: form.videoUrl,
        thumbnailUrl: form.thumbnailUrl,
        category: form.category,
        channel: form.channel
      });

      navigate(`/channel/${form.channel}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to upload video"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      <h1>Upload Video</h1>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter video title"
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter video description"
          />
        </div>

        <div>
          <label>Video URL</label>

          <input
            type="url"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
          />
        </div>

        <div>
          <label>Thumbnail URL</label>

          <input
            type="url"
            name="thumbnailUrl"
            value={form.thumbnailUrl}
            onChange={handleChange}
            placeholder="https://example.com/thumbnail.jpg"
          />
        </div>

        <div>
          <label>Category</label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Channel ID</label>

          <input
            type="text"
            name="channel"
            value={form.channel}
            onChange={handleChange}
            placeholder="Enter channel ID"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>

      </form>

    </div>
  );
};

export default UploadVideo;