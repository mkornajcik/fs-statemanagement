import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export const useReviewsStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  all: 0,
  incrementGood: () => set((state) => ({ good: state.good + 1, all: state.all + 1 })),
  incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1, all: state.all + 1 })),
  incrementBad: () => set((state) => ({ bad: state.bad + 1, all: state.all + 1 })),
}));

export const useValues = () =>
  useReviewsStore(
    useShallow((state) => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad,
      all: state.all,
    })),
  );
