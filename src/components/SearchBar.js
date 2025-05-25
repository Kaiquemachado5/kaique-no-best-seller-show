const AdvancedSearch = () => (
  <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl">
    <FilterSection title="Gênero" options={genres} />
    <FilterSection title="Ano" type="range" />
    <FilterSection title="Avaliação" type="stars" />
    <SortOptions />
  </div>
);

const handleSearch = (value) => {
  const sanitizedValue = value
    .replace(/[^\w\s]/gi, '')
    .toLowerCase()
    .trim();
  setSearchTerm(sanitizedValue);
};
