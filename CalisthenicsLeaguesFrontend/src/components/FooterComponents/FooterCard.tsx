import styles from '../../styles/FooterStyles/FooterCardStyle.module.css';

export function FooterCard(){
    return <div className={styles.footerDiv}>
            <div>© 2025 All Rights Reserved.</div>
            <div className={styles.caliDiv}>CALISTHENICS</div>
    </div>
}