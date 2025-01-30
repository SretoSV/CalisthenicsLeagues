import { useEffect, useState } from "react";
import { LeagueCard } from "../components/LeaguesPageComponents/LeagueCard";
import { Navigation } from "../components/NavigationComponents/Navigation";
import styles from '../styles/LeaguesPageStyles/LeaguePageStyle.module.css';
import { serverPath } from "../functions/serverpath";

interface League {
    id: number;
    name: string;
    image: string;
}

export function LeaguesPage(){

    const [leagues, setLeagues] = useState<League[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchLeagues = async () => {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch(`${serverPath()}League/leagues`,{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setLeagues(data);
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err?.message || 'Unknown error');
                }
                else {
                    setError('Unknown error');
                }
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchLeagues();
    }, []);
    return(
        <>
            <Navigation isApplyPage={false}/>
            <div className={styles.mainDiv}>
                {leagues.map((league) => {
                    return <LeagueCard 
                                key={league.id} 
                                id={league.id} 
                                leagueName={league.name}
                                leagueImage={league.image}
                            />
                })}
            </div>
        </>
    );
}