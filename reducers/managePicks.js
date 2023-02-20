import { checkServices } from "@/data";
export const PICK_ACTIONS = {
  REMOVE_PICK: 'remove-pick',
  ADD_PICK: 'add-pick'
};

export default async function reducer(picks, action){
  let newPicks = [ ...state ];
  switch(action.type){
    case PICK_ACTIONS.REMOVE_PICK:
      return [
        ...state
      ];
    case PICK_ACTIONS.ADD_PICK:
      // const pick = searchResults.find((movie) => movie.imdbID === id);
      const blankIndex = newPicks.indexOf(false);
      if(blankIndex === -1 || !pick){ return picks; }
      if(newPicks.find((movie) => movie.imdbID === action.payload.imdbID)){ return picks; }
      const service = await checkServices(action.payload.imdbID);

      newPicks[blankIndex] = {
        ...action.payload,
        service: service?.name || '',
        serviceLink: service?.link || '',
      };
      return newPicks;
    case PICK_ACTIONS.RESET_PICKS:
      return [ false, false, false ]
    default:
       return state;
  }
}