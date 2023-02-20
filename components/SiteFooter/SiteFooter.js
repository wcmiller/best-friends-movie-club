import styles from './SiteFooter.module.scss';
import Link from 'next/link';

export default function SiteFooter({ currentWeek, week }){
  return (
    <footer className={styles.footer}>
      <Link href='/api/logout'>Logout</Link>
      <Link href='/'>Home</Link>
      <Link href='/week'>Edit Week</Link>
      <Link href='/profile'>Profile</Link>
      <Link href='/week/archive'>Archive</Link>
    </footer>
  )
};