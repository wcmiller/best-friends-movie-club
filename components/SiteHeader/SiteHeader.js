import styles from './SiteHeader.module.scss';
import Link from 'next/link';

export default function SiteHeader({ currentWeek, week, page, isLoggedInUser, user }){
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>
        <Link href='/'>
          B<span className='hideMobile'>est </span>
          F<span className='hideMobile'>riends </span> 
          M<span className='hideMobile'>ovie </span> 
          C<span className='hideMobile'>lub</span> 
        </Link>
      </h1>
      { page === '' && week && (
        <div className={styles.currentWeek}>
          <div className={styles.currentWeek__week}>
            <span className='hideMobile'>Now Playing: </span>Week {week.number}
          </div>
          <div className={styles.currentWeek__picker}>{week.picker}</div>
          <div className={styles.currentWeek__time}>{week.date} - 7:15 CST / 5:15 PST</div>
        </div>
      )}
      { page === 'week' && week && (
        <div className={styles.week}>
          Week: {week.number} &nbsp;({week.date})&nbsp; &ndash; {week.picker?.name}
        </div>
      )}
      {
        page === 'archive-home' && (
          <div className={styles.week}>
            Weekly Archives
          </div>
        )
      }
      {
        page === 'Profile' && (
          <div className={styles.week}>
            {isLoggedInUser? 'My Profile' : user.name}
          </div>
        )
      }
    </header>
  )
}