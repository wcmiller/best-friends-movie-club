import styles from '@/styles/Profile.module.scss';
import { getProfile } from '@/data';

export async function getServerSideProps(ctx){
  return { props: await getProfile(ctx) };
}

export default function MyProfile(){
  return (
    <article className={styles.card}>
      <h2>My Profile</h2>
    </article>
  );
}