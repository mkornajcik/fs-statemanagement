import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAnecdoteStore, { useAnecdotesActions, useAnecdotes } from "./store";
import anecdoteService from "./services/anecdotes";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
  },
}));

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("anecdotes", () => {
  it("initial state is initialized with the anecdotes returned by server", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdotesActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("displays anecdotes sorted by votes", () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "Least popular",
        votes: 1,
      },
      {
        id: 2,
        content: "Most popular",
        votes: 10,
      },
      {
        id: 3,
        content: "Middle",
        votes: 5,
      },
    ];

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
    });

    const { result } = renderHook(() => useAnecdotes());

    expect(result.current.map((anecdote) => anecdote.id)).toEqual([2, 3, 1]);

    expect(useAnecdoteStore.getState().anecdotes).toEqual(mockAnecdotes);
  });

  it("anecdotes are properly filtered", () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "Filter 1",
        votes: 1,
      },
      {
        id: 2,
        content: "Test 1",
        votes: 10,
      },
      {
        id: 3,
        content: "Filter 2",
        votes: 5,
      },
    ];

    useAnecdoteStore.setState({
      anecdotes: mockAnecdotes,
    });

    const { result: actions } = renderHook(() => useAnecdotesActions());

    const { result: anecdotes } = renderHook(() => useAnecdotes());

    act(() => {
      actions.current.setFilter("Filter");
    });

    expect(anecdotes.current.map((anecdote) => anecdote.id)).toEqual([3, 1]);
  });

  it("voting increases the number of votes", async () => {
    const mockAnecdote = { id: 1, content: "Test", votes: 0 };
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] });

    anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: 1 });

    const { result } = renderHook(() => useAnecdotesActions());
    await act(async () => {
      await result.current.incrementVotes(1);
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toBe(1);
  });
});
