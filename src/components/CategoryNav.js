const CategoryNav = () => (
  <nav className="sticky top-0 bg-white/80 backdrop-blur-md">
    <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
      {categories.map(category => (
        <CategoryButton 
          key={category}
          active={currentCategory === category}
          onClick={() => setCategory(category)}
        />
      ))}
    </div>
  </nav>
);
