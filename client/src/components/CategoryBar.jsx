const CategoryBar = ({ selected, onSelect }) => {
  const categories = [
    "All",
    "Music",
    "Gaming",
    "Programming",
    "News",
    "Sports",
    "Education",
    "Entertainment"
  ];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selected === category
              ? "active"
              : ""
          }
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;