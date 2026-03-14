import { create } from "zustand";

interface PronunciationStore {
    result: any;
    setResult: (result: any) => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (currentQuestionIndex: number) => void;
}

export const PronunciationStore = create<PronunciationStore>((set) => ({
    result: null,
    setResult: (result: any) => set({ result }),
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (currentQuestionIndex: number) => set({ currentQuestionIndex }),
}))