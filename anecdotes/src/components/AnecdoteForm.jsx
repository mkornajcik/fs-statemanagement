import { useAnecdotesActions } from "../store";

const AnecdoteList = () => {
  const { add } = useAnecdotesActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    add(content);
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteList;
