import { createContext, useContext } from "react";

export const InViewContext = createContext(false);

export const useInViewState = () => useContext(InViewContext);
