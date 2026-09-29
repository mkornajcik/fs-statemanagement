import { useAnecdotes, useAnecdotesActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { incrementVotes } = useAnecdotesActions();

  const vote = (id) => {
    incrementVotes(id);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
