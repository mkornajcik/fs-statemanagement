import { useAnecdotes, useAnecdotesActions, useNotificationActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { incrementVotes, remove } = useAnecdotesActions();
  const { setNotification } = useNotificationActions();

  const vote = (anecdote) => {
    incrementVotes(anecdote.id);
    setNotification(`you voted '${anecdote.content}'`);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
