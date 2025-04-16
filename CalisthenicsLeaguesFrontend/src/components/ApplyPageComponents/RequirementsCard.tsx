import { useEffect, useState } from 'react';
import styles from '../../styles/ApplyPageStyles/ApplyPageStyle.module.css';
import ApplyModal from './ApplyModal';
import { useUserContext } from '../../context/UserContext';
import { setLeagueIdByLeagueName } from '../../functions/formChangeFunction';

interface RequirementsCardProps{
    leagueName: string,
}

export function RequirementsCard(props: RequirementsCardProps){
    const { user } = useUserContext();

    const [leagueId, setLeagueId] = useState<number>(0);

    const [activeLeague, setActiveLeague] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        setLeagueId(setLeagueIdByLeagueName(props.leagueName) || 0);
        setActiveLeague(props.leagueName);
    }, [props.leagueName]);

    const openModal = () => { setShowModal(true); };
    const closeModal = () => { setShowModal(false); };

    return (
        <div className={styles.RequirementsCardMainDiv}>
        <h2>REQUIREMENTS:</h2>
        {activeLeague === "Legendary" && (
            <div>
                -----------------------------------<br />
                10mu<br />
                50dips<br />
                30pulls<br />
                60pushups<br />
                10mu<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        {activeLeague === "World-Class" && (
            <div>
                -----------------------------------<br />
                8mu<br />
                40dips<br />
                30pulls<br />
                60pushups<br />
                8mu<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        {activeLeague === "Pro" && (
            <div>
                -----------------------------------<br />
                5mu<br />
                50dips<br />
                30pulls<br />
                60pushups<br />
                5mu<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        {activeLeague === "Semi-pro" && (
            <div>
                -----------------------------------<br />
                3mu<br />
                25dips<br />
                20pulls<br />
                40pushups<br />
                3mu<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        {activeLeague === "Amateur" && (
            <div>
                -----------------------------------<br />
                1mu<br />
                25dips<br />
                15pulls<br />
                30pushups<br />
                1mu<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        {activeLeague === "Beginner" && (
            <div>
                -----------------------------------<br />
                10pulls<br />
                20dips<br />
                10pulls<br />
                40pushups<br />
                -----------------------------------<br />
                under 5min
            </div>
        )}
        <ApplyModal
            leagueName = {props.leagueName}
            show={showModal} 
            onClose={closeModal}
        />
        {
            user ? 
            (user.league <= leagueId) ? <button className={styles.applyButton} onClick={openModal} disabled>Apply</button> :
            <button className={styles.applyButton} onClick={openModal}>Apply</button>
            : <button className={styles.applyButton} onClick={openModal}>Apply</button>
        }

    </div>
    );
}

