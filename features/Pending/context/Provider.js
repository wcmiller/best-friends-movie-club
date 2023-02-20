import { createContext } from "react";
import usePendingData from "../hooks/usePendingData";

const PendingCtx = createContext({})

function PendingProvider({ children, initialValue }){
  const [ state, actions ] = usePendingData(initialValue)
  return (
    <PendingCtx.Provider value={ { state, actions }}>
      {children}
    </PendingCtx.Provider>
  );
}

export {  PendingCtx, PendingProvider };