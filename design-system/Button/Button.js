import styles from './Button.module.scss';

export default function Button({ 
  children, 
  onClick, 
  isLoading = false, 
  variant = 'primary',
  type = 'button',
  className = ''
}){
  return (
    <button type={type} className={`${styles.btn} ${styles[variant]} ${className}`} onClick={onClick}>
      {isLoading
        ? <span className={styles.loader} />
        : children
      }
    </button>
  );
}