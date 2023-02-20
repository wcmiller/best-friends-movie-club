
import styles from './Card.module.scss';

function Card({ children, className }){
  return (
    <article className={`${styles.card} ${className}`}>
      {children}
    </article>
  )
}

export default Card;