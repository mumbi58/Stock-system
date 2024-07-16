
const useSearch = (initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    handleSearch,
  };
};

export default useSearch;
