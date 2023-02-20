import { useContext } from 'react';
import { PendingCtx } from '../context/Provider';

function usePending(){
  return useContext(PendingCtx);
}

export default usePending;