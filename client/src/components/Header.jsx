import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      navigate(
        `/?search=${encodeURIComponent(trimmedSearch)}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header">

      <button onClick={onMenuClick}>
        ☰
      </button>

      <Link to="/" className="logo">
        YouTube
      </Link>

      <form onSubmit={handleSearch}>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          🔍
        </button>

      </form>

      {user ? (
        <div>
          <span>{user.username}</span>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          Sign in
        </Link>
      )}

    </header>
  );
};

export default Header;