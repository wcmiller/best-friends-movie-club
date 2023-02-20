import { Button } from '@/design-system';
import styles from './SaveButtons.module.scss';
import useMovieSearch from '../../hooks/useMovieSearch';

function SaveButtons({}){
  const { state: { isVotingWeek }, actions } = useMovieSearch();
  return (
    <footer className={`${styles.wrapper} ${styles[isVotingWeek? 'wrap3' : 'wrap2']}`}>
      <Button>Save</Button>
      { isVotingWeek && <Button variant='outline'>Send Out</Button> }
      <Button>Clear</Button>
    </footer>
  )
}

export default SaveButtons;