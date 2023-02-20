import React, { useState } from 'react';
import styles from '@/styles/Login.module.scss';
import axios from 'axios';
import Router from 'next/router';
import { Button } from '@/design-system';

export default function LoginPage(){
  const [ email, setEmail ] = useState('');
  const [ pass, setPass ] = useState('');
  async function login(){
    const res = await axios.post('/api/login', { username: email, password: pass });
    Router.push('/week')
  }
  
  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className='text-center'>Login</h2>
        <p>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name='email' 
            placeholder='email@gmail.com'
            value={email}
            onChange={({target}) => { setEmail(target.value); }}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input 
            type="text" 
            name='password' 
            placeholder='password'
            value={pass}
            onChange={({target}) => { setPass(target.value); }}
          />
        </p>
        <p className='text-center'>
          <Button type='button' onClick={login}>Login</Button>
        </p>
      </div>
    </main>
  )
}