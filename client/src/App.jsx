import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Channel from "./pages/Channel";
import CreateChannel from "./pages/CreateChannel";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/watch/:videoId"
          element={<Watch />}
        />

        <Route
          path="/channel/:channelId"
          element={<Channel />}
        />

        <Route
          path="/create-channel"
          element={<CreateChannel />}
        />

        <Route
          path="/upload"
          element={<UploadVideo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;