import styles from './ServiceLink.module.scss';
import useMovieSearch from '../../hooks/useMovieSearch';

function ServiceLink({ pick }){
  const { actions: { setServiceLink } } = useMovieSearch();
  return (
    <label className={styles.serviceLink}>
      <div className={styles.label}>
        <span>Link:</span> 
        { 
          (pick.serviceLink || '').length > 0 && 
          <a target='_blank' rel='noreferrer' href={pick.serviceLink}>Test</a> 
        }
      </div>
      <input 
        type="text" 
        className={styles.input}
        value={pick.serviceLink} 
        placeholder='Link' 
        onChange={setServiceLink(pick.imdbID)}
      />
  
    </label>
  )
}

export default ServiceLink;