import styles from './ServicePicker.module.scss';
import useMovieSearch from '../../hooks/useMovieSearch';

function ServicePicker({ pick }){
  const { actions: { setService} } = useMovieSearch(); 
  return (
    <label className={styles.servicePicker}>
      <span className={styles.label}>Service:</span> 
      <select className={styles.select} onChange={setService(pick.imdbID)} value={pick.service}>
        <option value=""></option>
        <option value="HBO">HBO Max</option>
        <option value="AMAZON">Amazon Prime</option>
      </select>
    </label>
  );
}

export default ServicePicker;