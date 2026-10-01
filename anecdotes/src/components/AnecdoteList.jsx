import { useAnecdotes, useAnecdotesActions, useFilter, useNotificationActions } from "../store";

const AnecdoteList = () => {
  const filter = useFilter();
  const anecdotes = useAnecdotes();
  const { incrementVotes, remove } = useAnecdotesActions();
  const { setNotification } = useNotificationActions();

  const vote = (anecdote) => {
    incrementVotes(anecdote.id);
    setNotification(`You voted ${anecdote.content}`);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const anecdotesToShow = sortedAnecdotes.filter((note) => note.content.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => remove(anecdote.id)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
