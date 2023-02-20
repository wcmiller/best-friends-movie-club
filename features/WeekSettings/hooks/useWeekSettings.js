import { useContext } from 'react';
import { WeekSettingsCtx } from '../context/Provider';

function useWeekSettings(){
  return useContext(WeekSettingsCtx);
}

export default useWeekSettings;