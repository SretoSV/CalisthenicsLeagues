import styles from '../../styles/ChatPageStyles/MessageOptionCardStyle.module.css';

export function MessageOptionCard(){

    return (
        <div className={styles.dropdownStyle}>
            <button className={`${styles.buttons} ${styles.marginStyle}`}>Edit</button>
            <button className={`${styles.buttons} ${styles.marginStyle}`}>Reply</button>
            <button className={styles.buttons}>Delete</button>
        </div>
    );
}