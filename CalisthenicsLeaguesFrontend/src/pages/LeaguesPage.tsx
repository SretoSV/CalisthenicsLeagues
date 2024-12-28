import { useState } from "react";
import { LeagueCard } from "../components/LeagueCard";
import { Navigation } from "../components/Navigation";
import styles from '../styles/LeaguePageStyle.module.css';

export function LeaguesPage(){

    const [leagues, setLeagues] = useState([
        {   
            id: 1,
            leagueName: "Legendary",
            leagueImage: "league1",
        },
        {   
            id: 2,
            leagueName: "World-Class",
            leagueImage: "league1",
        },
        {   
            id: 3,
            leagueName: "Pro",
            leagueImage: "league1",
        },
        {   
            id: 4,
            leagueName: "Semi-pro",
            leagueImage: "league1",
        },
        {   
            id: 5,
            leagueName: "Amateur",
            leagueImage: "league1",
        },
        {   
            id: 6,
            leagueName: "Begginer",
            leagueImage: "league1",
        },
    ]);


    return(
        <>
            <Navigation />
            <div>
                {leagues.map((league) => {
                    return <LeagueCard 
                                key={league.id} 
                                id={league.id} 
                                leagueName={league.leagueName}
                                leagueImage={league.leagueImage}
                            />
                })}
            </div>
        </>
    );
}