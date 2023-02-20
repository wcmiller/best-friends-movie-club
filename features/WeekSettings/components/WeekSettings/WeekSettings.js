import { Button } from '@/design-system';
import styles from './WeekSettings.module.scss';
import useWeekSettings from '../../hooks/useWeekSettings';

function WeekSettings({}){
  const { state, actions } = useWeekSettings();
  const saveSettings = () => {};
  return (
    <aside className={styles.settings}>
      <h3>Settings</h3>
      <form onSubmit={saveSettings}>                
        <section className={styles.date}>
          <h4>Date</h4>
          <input 
            type="date" 
            value={state.date}
            onChange={({target}) => {
              settingsDispatch({
                type: WEEK_SETTINGS_ACTIONS.SET_DATE,
                payload: target.value
              })
            }}
          />
        </section>
        <section className={styles.attendees}>
          <h4>Attending</h4>
          <ul>
            {state.attendees.map(({ id, name }) => (
              <li 
                key={id}
                onClick={() => {
                  settingsDispatch({
                    type: WEEK_SETTINGS_ACTIONS.MARK_ABSENT,
                    payload: id
                  })
                }}
              >{name}</li>
            ))}
          </ul>
        </section>
        <section className={styles.absentees}>
          <h4>Absent</h4>
          <ul>
            {state.absentees.map(({id, name }) => (
              <li 
                key={id}
                onClick={() => {
                  settingsDispatch({
                    type: WEEK_SETTINGS_ACTIONS.MARK_ATTENDING,
                    payload: id
                  })
                }}
              >{name}</li>
            ))}
          </ul>
        </section>
        <section className={styles.comments}>
          <h4>Commentary</h4>
          <textarea 
            value={state.commentary} 
            onChange={({target}) => {
              settingsDispatch({
                type: WEEK_SETTINGS_ACTIONS.SET_NOTE,
                payload: target.value
              })
            }} 
          />
        </section>
        <p>
          <Button type='submit'>Save Settings</Button>
        </p>
      </form>
    </aside>
  )
}

export default WeekSettings;