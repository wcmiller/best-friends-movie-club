import Image from 'next/image';
import ServicePicker from './ServicePicker';
import ServiceLink from './ServiceLink';

import styles from './PicksList.module.scss';
import SaveButtons from '../SaveButtons/SaveButtons';
import useMovieSearch from '../../hooks/useMovieSearch';

function PicksList({}){
  const { state: { picks }, actions: { removePick } } = useMovieSearch();
  const savePicks = () => {};
  return (
    <section className={styles.picks}>
      <h4>Picks</h4>
      <ul className={styles.picksList}>
        {picks.map((pick, index) => {
          return pick? (
            <li key={pick.imdbID} className={styles.picksList__item}>
              <h3 className={styles.picksList__item_headline}>Pick {index + 1}</h3>
              <Image  src={pick.Poster} width={300} height={450} className={styles.picksList__poster} alt={`${pick.Title} - ${pick.Year}`} />
              <div className={styles.picksList__item_info}>
                <div className={styles.picksList__item_title}>{pick.Title} ({pick.Year})</div>
                {pick.loading? 
                  'Loading' : 
                  <>
                    <ServicePicker pick={pick} />
                    <ServiceLink pick={pick} />
                  </>
                }
              </div>
              <div className={styles.picksList__item_clear} onClick={removePick(pick.imdbID)}>&times;</div>
            </li>
          ) : (
            <li key={index} className={styles.picksList__item}>
              <h3 className={styles.picksList__item_headline}>Pick {index + 1}</h3>
              <Image  src='/img/no-poster.png' width={300} height={450} className={styles.picksList__poster} alt={'No Poster'} />
            </li>
          )
        })}
      </ul>
      <SaveButtons />
    </section>
  );
}

export default PicksList;