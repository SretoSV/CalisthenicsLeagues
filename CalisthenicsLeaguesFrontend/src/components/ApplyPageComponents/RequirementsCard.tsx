import styles from '../../styles/ApplyPageStyle.module.css';
import leagueLogoImage from '../../images/league1.png';

export function RequirementsCard(){
    return (
        <div className={styles.RequirementsCardMainDiv}>
        <h2>REQIREMENTS:</h2>
        <div>
            -----------------------------------<br/>
            5mu<br/>
            50dips<br/>
            30pulls<br/>
            60pushups<br/>
            5mu<br/>
            -----------------------------------<br/>
            under 5min
        </div>
        <button className={styles.applyButton}>Apply</button>
    </div>
    );
}

