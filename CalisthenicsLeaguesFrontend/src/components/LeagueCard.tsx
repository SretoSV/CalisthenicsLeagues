import leagueLogoImage from '../images/league1.png';
import styles from '../styles/LeagueCardStyle.module.css';

export function LeagueCard(){
    return (
        <div className={styles.mainDiv}>
            <h2 className={styles.header2}>League Name</h2>
            <img 
                src={leagueLogoImage}
                alt="League"
                className={styles.leagueImage}
            />
            <a className={styles.applyButton} href="ApplyPage">Apply</a>
        </div>
    );
}