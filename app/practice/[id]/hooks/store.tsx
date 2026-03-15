import { create } from "zustand";

interface PronunciationStore {
    result: any;
    setResult: (result: any) => void;
    modal: "submit" | "exit" | "errorUpload" | null;
    setModal: (modal: "submit" | "exit" | "errorUpload" | null) => void;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (currentQuestionIndex: number) => void;
    isPracticing: boolean;
    setIsPracticing: (value: boolean) => void;
}

export const PronunciationStore = create<PronunciationStore>((set) => ({
    result: null,
    setResult: (result: any) => set({ result }),
    modal: null,
    setModal: (modal: "submit" | "exit" | "errorUpload" | null) => set({ modal }),
    currentQuestionIndex: 0,
    setCurrentQuestionIndex: (currentQuestionIndex: number) => set({ currentQuestionIndex }),
    isPracticing: false,
    setIsPracticing: (value: boolean) => set({ isPracticing: value }),
}))

export const getIsPracticing = () => PronunciationStore.getState().isPracticing
export const setIsPracticing = (value: boolean) => PronunciationStore.getState().setIsPracticing(value)