import { useReducer } from 'react';

const WEEK_SETTINGS_ACTIONS = {
  SET_COMMENTARY: 'set-commentary',
  SET_DATE: 'set-date',
  MARK_ABSENT: 'mark-absent',
  MARK_ATTENDING: 'mark-attending',
}

function useWeekSettingsData(initialState){
  const [ state, dispatch ] = useReducer((oldState, action) => {
    let user = null;
    let invalid = false;
    switch(action.type){
      case WEEK_SETTINGS_ACTIONS.SET_DATE:
        return {
          ...oldState,
          date: action.payload
        };
      case WEEK_SETTINGS_ACTIONS.SET_COMMENTARY:
        return {
          ...oldState,
          commentary: action.payload
        }
      case WEEK_SETTINGS_ACTIONS.MARK_ABSENT:
        user = oldState.users.find(usr => usr.id === action.payload);
        invalid = oldState.absentees.find(usr => usr.id === action.payload );
        if(!!invalid){ return oldState; }
        return {
          ...oldState,
          absentees: [...oldState.absentees, user],
          attendees: oldState.attendees.filter(usr => usr.id !== action.payload )
        }
      case WEEK_SETTINGS_ACTIONS.MARK_ATTENDING:
        user = oldState.users.find(usr => usr.id === action.payload);
        invalid = oldState.attendees.find(usr => usr.id === action.payload );
        if(!!invalid){ return oldState; }
        return {
          ...oldState,
          attendees: [...oldState.attendees, user],
          absentees: oldState.absentees.filter(usr => usr.id !== action.payload )
        }
      default: 
        return oldState;
    }
  }, initialState);

  const actions = {
    updateCommentary(evt){ 
      dispatch({
        type: WEEK_SETTINGS_ACTIONS.SET_NOTE,
        payload: evt.target.value
      });
    },
    updateDate(title){
      dispatch({
        type: WEEK_SETTINGS_ACTIONS.SEARCH_INIT,
        payload: title
      })
    }
  }

  return [ state, actions ]
}

export default useWeekSettingsData;