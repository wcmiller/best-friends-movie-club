import { useReducer } from 'react';
import { searchMovie, checkServices } from '../apis';

const SEARCH_ACTIONS = {
  UPDATE_SEARCH_FIELD: 'update-search-field',
  SEARCH_INIT: 'search-init',
  SEARCH_SUCCESS: 'search-success',
  SEARCH_ERROR: 'search-error',
  SET_PICK: 'set-pick',
  SET_SERVICE: 'set-service',
  SET_SERVICE_DROPDOWN: 'set-service-dropdown',
  SET_SERVICE_LINK: 'set-service-link',
  REMOVE_PICK: 'remove-pick',
  RESET_PICKS: 'reset-picks',
  SAVE_PICKS: 'save-picks',
  SAVE_AND_SEND_PICKS: 'save-and-send-picks',
  SAVE_PICKS_SUCCESS: 'save-picks-success',
  SAVE_PICKS_FAILURE: 'save-picks-failure',
  SAVE_PICKS_FINALLY: 'save-picks-finally',
};

const useMovieSearchData = (initialState) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    const newPicks = [...oldState.picks ];
    switch(action.type){
      // SEARCH MANAGEMENT
      case SEARCH_ACTIONS.UPDATE_SEARCH_FIELD:
        return {
          ...oldState,
          searchString: action.payload
        };
      case SEARCH_ACTIONS.SEARCH_INIT:
        searchMovie(action.payload)
          .then((results) => {
            dispatch({ type: SEARCH_ACTIONS.SEARCH_SUCCESS, payload: results })
          })
          .catch((error) => {
            dispatch({ type: SEARCH_ACTIONS.SEARCH_ERROR, payload: error.message })
          })
          .finally(() => { dispatch({ type: SEARCH_ACTIONS.SEARCH_FINALLY })})
          return{
            ...oldState,
            isSearchLoading: true,
            searchError: '',
            searchResults: []
          };
      case SEARCH_ACTIONS.SEARCH_SUCCESS:
        return {
          ...oldState,
          searchResults: action.payload
        };
      case SEARCH_ACTIONS.SEARCH_ERROR:
        return {
          ...oldState,
          searchError: action.payload
        };
      case SEARCH_ACTIONS.SEARCH_FINALLY:
        return {
          ...oldState,
          isSearchLoading: false,
        };
      // SERVICE MANAGEMENT
      case SEARCH_ACTIONS.SET_SERVICE:
        return {
          ...oldState,
          picks: oldState.picks.map((pick) => pick.imdbID !== action.payload.id? pick : {
            ...pick,
            loading: false,
            service: action.payload?.service || '',
            serviceLink : action.payload?.serviceLink || ''
          })
        };
      case SEARCH_ACTIONS.SET_SERVICE_DROPDOWN:
        return { 
          ...oldState,
          picks: oldState.picks.map(pick => pick.imdbID !== action.payload.id? pick : {
            ...pick,
            service: action.payload.service 
          })
        };
      case SEARCH_ACTIONS.SET_SERVICE_LINK:
        return {
          ...oldState,
          picks: oldState.picks.map(pick => pick.imdbID !== action.payload.id? pick : {
            ...pick,
            serviceLink: action.payload.serviceLink 
          })
        };
      // PICK MANAGEMENT 
      case SEARCH_ACTIONS.SET_PICK:
          const blankIndex = oldState.picks.indexOf(false);
          if(blankIndex === -1 || !action.payload ){ return oldState; }
          if(newPicks.find((movie) => movie.imdbID === action.payload.imdbID)){ return oldState; }
          checkServices(action.payload.imdbID)
            .then((service) => {
              dispatch({
                type: SEARCH_ACTIONS.SET_SERVICE,
                payload: service
              })
            });
    
          newPicks[blankIndex] = {
            ...action.payload,
            loading: true,
            service: '',
            serviceLink: '',
          };
          return {
            ...oldState,
            picks: newPicks
          };
      case SEARCH_ACTIONS.REMOVE_PICK:
        return { 
          ...oldState,
          picks: oldState.picks.map((pick) => ( pick.imdbID === action.payload? false : pick))
        };
      case SEARCH_ACTIONS.RESET_PICKS:
        return {
          ...oldState,
          picks: [ false, false, false ]
        };
      // SAVE PICKS
      case SEARCH_ACTIONS.SAVE_PICKS:
        return {
          ...oldState
        };
      case SEARCH_ACTIONS.SAVE_PICKS_SUCCESS:
      case SEARCH_ACTIONS.SAVE_PICKS_FAILURE:
      case SEARCH_ACTIONS.SAVE_PICKS_FINALLY:
// DEFAULT
      default:
        return oldState;
    }
  }, initialState);
  const actions = {
    updateSearch(evt){ 
      dispatch({
        type: SEARCH_ACTIONS.UPDATE_SEARCH_FIELD,
        payload: evt.target.value
      });
    },
    search(title){
      dispatch({
        type: SEARCH_ACTIONS.SEARCH_INIT,
        payload: title
      })
    },
    pick(pick){
      dispatch({
        type: SEARCH_ACTIONS.SET_PICK,
        payload: pick
      })
    },
    setService(id){
      return ({ target }) => {
        dispatch({
          type: SEARCH_ACTIONS.SET_SERVICE_DROPDOWN,
          payload: {
            id,
            service: target.value
          }
        })
      }
    },
    setServiceLink(id){
      return ({ target }) => {
        dispatch({
          type: SEARCH_ACTIONS.SET_SERVICE_LINK,
          payload: {
            id,
            serviceLink: target.value
          }
        })
      }
    },
    removePick(pick){
      return () => {
        dispatch({
          type: SEARCH_ACTIONS.REMOVE_PICK,
          payload: pick
        });
      }
    },
    savePicks(shouldSendPicks){
      dispatch({
        type: SEARCH_ACTIONS.SAVE_PICKS
      })
    }
  }
  return [ state, actions ];
}

export { useMovieSearchData, SEARCH_ACTIONS };