import { useReducer } from 'react';

export const WEEK_SETTINGS_ACTIONS = {
  SET_NOTE: 'set-note',
  SET_DATE: 'set-date',
  MARK_ABSENT: 'mark-absent',
  MARK_ATTENDING: 'mark-attending',
}

export const useWeekSettings = (initialSettings) => {
  return useReducer((settings, action) => {
    let user = null;
    let invalid = false;
    switch(action.type){
      case WEEK_SETTINGS_ACTIONS.SET_DATE:
        return {
          ...settings,
          date: action.payload
        };
      case WEEK_SETTINGS_ACTIONS.SET_NOTE:
        return {
          ...settings,
          note: action.payload
        }
      case WEEK_SETTINGS_ACTIONS.MARK_ABSENT:
        user = settings.users.find(usr => usr.id === action.payload);
        invalid = settings.absentees.find(usr => usr.id === action.payload );
        if(!!invalid){ return settings; }
        return {
          ...settings,
          absentees: [...settings.absentees, user],
          attendees: settings.attendees.filter(usr => usr.id !== action.payload )
        }
      case WEEK_SETTINGS_ACTIONS.MARK_ATTENDING:
        user = settings.users.find(usr => usr.id === action.payload);
        invalid = settings.attendees.find(usr => usr.id === action.payload );
        if(!!invalid){ return settings; }
        return {
          ...settings,
          attendees: [...settings.attendees, user],
          absentees: settings.absentees.filter(usr => usr.id !== action.payload )
        }
      default: 
        return settings;
    }
  }, initialSettings);
}
