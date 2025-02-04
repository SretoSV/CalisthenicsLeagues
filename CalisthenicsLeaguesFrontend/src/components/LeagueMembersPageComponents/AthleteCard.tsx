import instagramImage from '../../images/instagram.png';
import styles from '../../styles/LeagueMembersPageStyles/AthleteCardStyle.module.css';
import { useEffect, useState } from 'react';
import { serverPath } from '../../functions/serverpath';

interface AthleteCardProps{
    id: number,
    Name: string,
    Surname: string,
    Country: string,
    Instagram: string,
    Image: string,
}

export function AthleteCard(props: AthleteCardProps){
    const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${props.Country}`);
        const data = await response.json();

        setFlagUrl(data[0].flags.svg || data[0].flags.png);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchCountryData();
  }, [props.Country]);
      
    return (
        <div className={styles.mainDiv}>
            <img 
                src={serverPath()+props.Image}
                alt="athlete" 
                className={styles.athleteImage}
            />
            <div>
                <div className={styles.infoClass}>{props.Name} {props.Surname}</div>
                <div className={`${styles.infoClass} ${styles.imageAndText}`}>
                    {props.Country}
                    <img 
                        src={flagUrl}
                        alt="athlete" 
                        className={styles.flagImage}
                    />
                </div>
                <div className={`${styles.infoClass} ${styles.imageAndText}`}
                >
                    <img 
                        src={instagramImage}
                        alt="athlete" 
                        className={styles.instagramImage}
                    />
                    <a 
                      href={`https://www.instagram.com/${props.Instagram}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.instagramLink}
                    >
                      {"@" + props.Instagram}
                    </a>
                </div>
            </div>
        </div>
    );
}