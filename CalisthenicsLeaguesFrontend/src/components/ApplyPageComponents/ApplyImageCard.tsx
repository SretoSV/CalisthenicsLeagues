import styles from '../../styles/ApplyPageStyle.module.css';
import leagueLogoImage from '../../images/league1.png';

interface ApplyImageCardProps{
    leagueName: string,
}
export function ApplyImageCard(props :ApplyImageCardProps){
    return (
        <div className={styles.applyImageCardMainDiv}>
            <h2>{props.leagueName}</h2>
            <img 
                src={leagueLogoImage}
                alt="League"
                className={styles.leagueImage}
            />
            <div>Members: 10</div>
        </div>
    );
}

