import { useState } from "react";
import { Navigation } from "../components/Navigation";
import styles from '../styles/LeagueMembersPageStyle.module.css';
import { AthleteCard } from "../components/AthleteCard";

export function LeagueMembersPage(){

    const [leaguesMembers, setLeaguesMembers] = useState([
        {   
            id: 1,
            Name: "Sergio",
            Surname: "Di Pasquale",
            Country: "Italy",
            Instagram: "@sergiodipasquale_newerabarbarian",
            Image: "",
        },
        {   
            id: 2,
            Name: "Cristian",
            Surname: "Mariani",
            Country: "Italy",
            Instagram: "@christian_mariani",
            Image: "",
        },        {   
            id: 3,
            Name: "Uros",
            Surname: "Askovic",
            Country: "Serbia",
            Instagram: "@uros_aske",
            Image: "",
        },
    ]);


    return(
        <>
            <Navigation />
            <div className={styles.selectDiv}>
                <select className={styles.dropdownInput}>
                        <option value="Legendary">Legendary</option>
                        <option value="WorldClass">World-Class</option>
                        <option value="Pro">Pro</option>
                        <option value="SemiPro">Semi-pro</option>
                        <option value="Amateur">Amateur</option>
                        <option value="Begginer">Begginer</option>
                </select>
                <div className={styles.memberNumber}>Members: 10</div>
            </div>
            <div className={styles.membersDiv}>
                {leaguesMembers.map((member) => {
                    return <AthleteCard 
                                id={member.id}
                                Name={member.Name}
                                Surname={member.Surname}
                                Country={member.Country}
                                Instagram={member.Instagram}
                                Image={member.Image}
                            />
                })}
            </div>
        </>
    );
}