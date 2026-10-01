import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import SearchFilter from "./components/SearchFilter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useAnecdotesActions } from "./store";

const App = () => {
  const { initialize } = useAnecdotesActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <SearchFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
