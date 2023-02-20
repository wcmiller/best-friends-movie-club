import { createContext, useReducer } from "react";
import useWeekSettingsData from '../hooks/useWeekSettingsData';

const WeekSettingsCtx = createContext({})

function WeekSettingsProvider({ children, initialValue }){
  const [ state, actions ] = useWeekSettingsData(initialValue)
  return (
    <WeekSettingsCtx.Provider value={ { state, actions }}>
      {children}
    </WeekSettingsCtx.Provider>
  );
}

export {  WeekSettingsCtx, WeekSettingsProvider };