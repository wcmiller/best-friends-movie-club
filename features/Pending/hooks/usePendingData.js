import { useReducer } from 'react';
import { vote } from '../apis';

const PENDING_ACTIONS = {
  VOTE: Symbol('vote'),
  VOTE_SUCCESS: Symbol('vote-success'),
  VOTE_FAILURE: Symbol('vote-failure'),
  VOTE_FINALLY: Symbol('vote-finally'),
  CLEAR_ERROR: Symbol('clear-error')
};

function usePendingData(initialState){
  const [ state, dispatch ] = useReducer((oldState, action) => {
    switch(action.type){
      case PENDING_ACTIONS.VOTE:
        return {
          ...oldState,
          isLoading: true,
          error: false,
          pendingPick: action.payload
        };
      case PENDING_ACTIONS.VOTE_SUCCESS:
        return {
          ...action.payload
        };
      case PENDING_ACTIONS.VOTE_FAILURE:
        return {
          ...oldState,
          error: action.payload
        };
      case PENDING_ACTIONS.VOTE_FINALLY:
        return {
          ...oldState,
          isLoading: false,
          pendingPick: false
        }
      case PENDING_ACTIONS.CLEAR_ERROR:
        return {
          ...oldState,
          error: false
        }
      default:
        return oldState
    }
  }, initialState);

  const actions = {
    clearError(){
      dispatch({
        type: PENDING_ACTIONS.CLEAR_ERROR
      })
    },
    submitVote(weekId, pickId){
      vote({weekId, pickId })
        .then(response => {
          dispatch({
            type: PENDING_ACTIONS.VOTE_SUCCESS,
            payload: response
          })
        })
        .catch(error => {
          dispatch({
            type: PENDING_ACTIONS.VOTE_FAILURE,
            payload: error
          });
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .finally(() => {
          dispatch({
            type: PENDING_ACTIONS.VOTE_FINALLY,
          });
        });
        dispatch({
          type: PENDING_ACTIONS.VOTE,
          payload: pickId
        })
    }
  };

  return [ state, actions ];
}

export default usePendingData;