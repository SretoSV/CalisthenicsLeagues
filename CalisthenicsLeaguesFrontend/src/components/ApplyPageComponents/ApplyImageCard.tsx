import styles from '../../styles/ApplyPageStyles/ApplyPageStyle.module.css';
import { serverPath } from '../../functions/serverpath';
import { useEffect, useState } from 'react';
import { setLeagueIdByLeagueName } from '../../functions/formChangeFunction';

interface ApplyImageCardProps{
    leagueName: string,
}
export function ApplyImageCard(props :ApplyImageCardProps){
    const [members, setMembers] = useState(0);
    const [leagueId, setLeagueId] = useState<number | null>(null);

    useEffect(() => {
        setLeagueId(setLeagueIdByLeagueName(props.leagueName) || 0);
    }, [props.leagueName]);

    useEffect(() => {
        const fetchMembers = async () => {
            if (leagueId === null) return;
            try {
                const response = await fetch(`${serverPath()}League/members/number/${leagueId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMembers(data);
                } else {
                    console.error('Error fetching members:', response.status, response.statusText);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchMembers();
    }, [leagueId]);

    return (
        <div className={styles.applyImageCardMainDiv}>
            <h2>{props.leagueName}</h2>
            <img 
                src={serverPath()+`Images/Leagues/${props.leagueName}.png`}
                alt="League"
                className={styles.leagueImage}
            />
            <div>Members: {members}</div>
        </div>
    );
}

