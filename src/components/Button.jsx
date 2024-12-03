import styles from './Button.module.css';

export default function Button({ children, onClick, type }) {
    return <button onClick={(e) => onClick ? onClick(e) : null}
                   className={`${styles.btn} ${styles[type]}`}>{children}</button>
}