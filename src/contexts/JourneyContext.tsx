/**
 * JOURNEY CONTEXT — Global state provider for journey data
 * Allows switching between customer/executive views without losing context
 */

import { createContext, useContext, ReactNode } from "react";
import { useJourneyState } from "@/hooks/useJourneyState";

type JourneyContextType = ReturnType<typeof useJourneyState>;

const JourneyContext = createContext<JourneyContextType | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const journeyState = useJourneyState();

  return (
    <JourneyContext.Provider value={journeyState}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourneyContext() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourneyContext must be used within a JourneyProvider");
  }
  return context;
}
