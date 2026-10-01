import { create } from "zustand";
import anecdoteService from "./services/anecdotes";
import { devtools } from "zustand/middleware";

let notificationTimeout;

const useAnecdoteStore = create(
  devtools((set, get) => ({
    anecdotes: [],
    filter: "",
    actions: {
      initialize: async () => {
        const anecdotes = await anecdoteService.getAll();
        set(() => ({ anecdotes }));
      },
      add: async (content) => {
        const newAnecdote = await anecdoteService.createNew(content);
        set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
      },
      incrementVotes: async (id) => {
        const anecdote = get().anecdotes.find((a) => a.id === id);
        const updatedAnecdote = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 });
        set((state) => ({
          anecdotes: state.anecdotes.map((a) => (a.id === id ? updatedAnecdote : a)),
        }));
      },
      remove: async (id) => {
        const anecdote = get().anecdotes.find((a) => a.id === id);
        if (anecdote.votes !== 0) return;
        await anecdoteService.remove(id);
        set((state) => ({
          anecdotes: state.anecdotes.filter((a) => a.id !== id),
        }));
      },
      setFilter: (value) => set(() => ({ filter: value })),
    },
  })),
);

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (text) => {
      clearTimeout(notificationTimeout);

      set(() => ({ notification: text }));

      notificationTimeout = setTimeout(() => {
        set(() => ({ notification: "" }));
      }, 5000);
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  return anecdotes
    .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes);
};
export const useAnecdotesActions = () => useAnecdoteStore((state) => state.actions);

export const useNotification = () => useNotificationStore((state) => state.notification);
export const useNotificationActions = () => useNotificationStore((state) => state.actions);

export default useAnecdoteStore;
