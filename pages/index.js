import Head from 'next/head';
import { MovieList } from '@/features/Pending/components';
import { PendingProvider } from '@/features/Pending/context/Provider';
import getWeek from '@/features/Pending/actions/getWeek';

  export async function getServerSideProps(ctx ){
    return {
      props: {
        ...(await getWeek(ctx)),
        page: ''
      }
    }
  }
  
  export default function CurrentWeek({ week }) {
    console.log(week);
    return (
      <>
        <Head>
          <title>Best Friends Movie Club</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PendingProvider initialValue={week}>
          <MovieList />
        </PendingProvider>
      </>
    )
}
