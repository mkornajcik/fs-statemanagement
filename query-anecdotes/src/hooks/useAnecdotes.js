import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import useNotify from "./useNotify";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notify(`Anecdote '${newAnecdote.content}' created`);
    },
    onError: () => {
      notify(`Anecdote is too short, must have at least 5 characters`);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a)),
      );
      notify(`Anecdote '${updatedAnecdote.content}' voted`);
    },
  });

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote,
    handleVote,
  };
};
