import { checkServices } from '@/data';
import { useReducer } from 'react';

const PICK_ACTIONS = {
  SET_PICK: 'set-pick',
  SET_SERVICE: 'set-service',
  SET_SERVICE_DROPDOWN: 'set-service-dropdown',
  SET_SERVICE_LINK: 'set-service-link',
  REMOVE_PICK: 'remove-pick',
  RESET_PICKS: 'reset-picks'
};

const usePicks = (initialPicks) => {
  const [data, dispatch] = useReducer((picks, action) => {
    const newPicks = [...picks ];
    switch(action.type){
      case PICK_ACTIONS.SET_PICK:
        const blankIndex = picks.indexOf(false);
        if(blankIndex === -1 || !action.payload ){ return picks; }
        if(newPicks.find((movie) => movie.imdbID === action.payload.imdbID)){ return picks; }
        checkServices(action.payload.imdbID)
          .then((service) => {
            dispatch({
              type: PICK_ACTIONS.SET_SERVICE,
              payload: service
            })
          });
  
        newPicks[blankIndex] = {
          ...action.payload,
          loading: true,
          service: '',
          serviceLink: '',
        };
        return newPicks;
      case PICK_ACTIONS.SET_SERVICE:
        return picks.map((pick) => pick.imdbID !== action.payload.id? pick : {
          ...pick,
          loading: false,
          service: action.payload?.service || '',
          serviceLink : action.payload?.serviceLink || ''
        });
      case PICK_ACTIONS.SET_SERVICE_DROPDOWN:
        return picks.map(pick => pick.imdbID !== action.payload.id? pick : {
          ...pick,
          service: action.payload.service 
        });
      case PICK_ACTIONS.SET_SERVICE_LINK:
        return picks.map(pick => pick.imdbID !== action.payload.id? pick : {
          ...pick,
          serviceLink: action.payload.serviceLink 
        });
      case PICK_ACTIONS.REMOVE_PICK:
        return picks.map((pick) => ( pick.imdbID === action.payload? false: pick));
      case PICK_ACTIONS.RESET_PICKS:
        return [ false, false, false ];
      default:
        return picks;
    }
  }, initialPicks);
  return [ data, dispatch ];
}

export { usePicks, PICK_ACTIONS };