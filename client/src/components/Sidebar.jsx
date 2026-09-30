const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <a href="/">Home</a>
      <a href="/">Trending</a>
      <a href="/">Subscriptions</a>
      <a href="/">Library</a>
      <a href="/">History</a>
    </aside>
  );
};

export default Sidebar;