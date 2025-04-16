import { useEffect, useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import styles from '../styles/LeagueMembersPageStyles/LeagueMembersPageStyle.module.css';
import { AthleteCard } from "../components/LeagueMembersPageComponents/AthleteCard";
import { serverPath } from "../functions/serverpath";
import { Member } from "../types/MemberTypes";
import { FooterCard } from "../components/FooterComponents/FooterCard";
import { motion } from "framer-motion";

export function LeagueMembersPage(){

    const [leaguesMembers, setLeaguesMembers] = useState<Member[]>([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState(1);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedLeagueId(selectedId);
    };

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${serverPath()}League/members/${selectedLeagueId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLeaguesMembers(data);
                } else {
                    console.error('Error fetching members:', response.status, response.statusText);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchMembers();
    }, [selectedLeagueId]);

    return(
        <>
            <div className={styles.wrapper}>
                <div>
                    <Navigation isApplyPage={false}/>
                    <motion.div 
                        className={styles.selectDiv}
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut"}}    
                    >
                        <select className={styles.dropdownInput} onChange={handleSelectChange} value={selectedLeagueId}>
                            <option value="1">Legendary</option>
                            <option value="2">World-Class</option>
                            <option value="3">Pro</option>
                            <option value="4">Semi-pro</option>
                            <option value="5">Amateur</option>
                            <option value="6">Beginner</option>
                        </select>
                        <div className={styles.memberNumber}>Members: {leaguesMembers.length}</div>
                    </motion.div>
                    <div className={styles.membersDiv}>
                        {leaguesMembers.map((member) => {
                            return <AthleteCard 
                                        key={member.id}
                                        id={member.id}
                                        Name={member.name}
                                        Surname={member.surname}
                                        Country={member.country}
                                        Instagram={member.instagram}
                                        Image={member.image}
                                    />
                        })}
                    </div>
                </div>
                <FooterCard />
            </div>
        </>
    );
}