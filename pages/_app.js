import '@/styles/globals.scss'
import { SiteHeader, SiteFooter } from '@/components'
import styles from '@/styles/layout.module.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
    <div className={styles.background}/>
    <div className={styles.wrapper}>
      <SiteHeader {...pageProps } />
      <Component {...pageProps} />
      { !!pageProps.user && <SiteFooter /> }
    </div>
    </>
  )
}
