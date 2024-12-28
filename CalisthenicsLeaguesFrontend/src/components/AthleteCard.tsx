import leagueLogoImage from '../images/league1.png';
import instagramImage from '../images/instagram.png';
import styles from '../styles/AthleteCardStyle.module.css';

interface AthleteCardProps{
    id: number,
    Name: string,
    Surname: string,
    Country: string,
    Instagram: string,
    Image: string,
}

export function AthleteCard(props: AthleteCardProps){
    return (
        <div className={styles.mainDiv}>
            <img 
                src={leagueLogoImage}
                alt="athlete" 
                className={styles.athleteImage}
            />
            <div>
                <div className={styles.infoClass}>{props.Name} {props.Surname}</div>
                <div className={`${styles.infoClass} ${styles.imageAndText}`}>
                    {props.Country}
                    <img 
                        src={instagramImage}
                        alt="athlete" 
                        className={styles.instagramImage}
                    />
                </div>
                <div className={`${styles.infoClass} ${styles.imageAndText}`}
                >
                    <img 
                        src={instagramImage}
                        alt="athlete" 
                        className={styles.instagramImage}
                    />
                    {props.Instagram}
                </div>
            </div>
        </div>
    );
}