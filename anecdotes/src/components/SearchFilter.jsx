import { useAnecdotesActions } from "../store";

const SearchFilter = () => {
  const { setFilter } = useAnecdotesActions();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter: <input onChange={handleChange} data-testid="filter" />
    </div>
  );
};

export default SearchFilter;
