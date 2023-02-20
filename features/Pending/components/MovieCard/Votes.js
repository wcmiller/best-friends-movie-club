import styles from './Votes.module.scss';
import usePending from '../../hooks/usePending';

function Votes({ movie }){
  const { actions, state } = usePending();
  return (
    <section className={styles.votes}>
      <h2>Votes</h2>
        <ul className={styles.voteList}>
          {movie.votes.map(vt => (
            <li key={vt.id}>{vt.user.name}</li>
          ))}
          {movie.votes.length === 0 && <li>None</li>}
        </ul>
        <button 
          className={styles.voteButton} 
          type='button' 
          disabled={!movie.canVote || state.isLoading}
          onClick={() => { actions.submitVote(state.id, movie.pickId) }}
        >
          { state.isLoading && state.pendingPick === movie.pickId? <span className={styles.loader} /> : 'Vote' }
        </button>
    </section>
  );
}

export default Votes;
