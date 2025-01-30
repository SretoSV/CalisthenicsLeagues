import { serverPath } from '../../functions/serverpath';
import styles from '../../styles/LeaguesPageStyles/LeagueCardStyle.module.css';

interface LeagueCardProps{
    id: number,
    leagueName: string,
    leagueImage: string,
}

export function LeagueCard(props: LeagueCardProps){
    return (
        <div className={styles.mainDiv}>
            <h2 className={styles.header2}>{props.leagueName}</h2>
            <img 
                src={serverPath()+props.leagueImage}
                alt="League"
                className={styles.leagueImage}
            />
            <a className={styles.applyButton} href={`ApplyPage/${props.leagueName}`}>Apply</a>
        </div>
    );
}