import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../services/api";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CategoryBar from "../components/CategoryBar";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [category, setCategory] = useState("All");

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await api.get("/videos", {
        params: {
          search,
          category
        }
      });

      setVideos(data);
    };

    fetchVideos();
  }, [search, category]);

  return (
    <>
      <Header
        onMenuClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      <Sidebar open={sidebarOpen} />

      <main
        className={
          sidebarOpen
            ? "content sidebar-visible"
            : "content"
        }
      >
        <CategoryBar
          selected={category}
          onSelect={setCategory}
        />

        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;