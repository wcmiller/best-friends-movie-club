import React, { useEffect, useState } from 'react'; 
import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/EditWeek.module.scss';
import axios from 'axios';
import { checkServices, getUserWeek } from '@/data'

export async function getServerSideProps(ctx){
  return {
    props: {
      ...(await getUserWeek(ctx)),
      page: 'archive-home'
    }
  };
}

export default function EditWeek({ week, user, users }){

  return (
    <>
     <Head>
        <title>Best Friends Movie Club</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <article className={styles.card}>
          <div className={styles.picks}>
            <h4>Archive</h4>
         </div>
        </article>
      </main>
    </>
  )
}