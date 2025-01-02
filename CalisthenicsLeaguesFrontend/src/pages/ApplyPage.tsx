import { Navigation } from "../components/Navigation";
import { RequirementsCard } from "../components/ApplyPageComponents/RequirementsCard";
import { RulesCard } from "../components/ApplyPageComponents/RulesCard";
import styles from '../styles/ApplyPageStyle.module.css';
import { ApplyImageCard } from "../components/ApplyPageComponents/ApplyImageCard";
import { useParams } from "react-router-dom";

export function ApplyPage(){
    const { Name } = useParams<{ Name: string }>();

    return(
        <>
            <Navigation isApplyPage={true}/>
            <div className={styles.mainDiv}>
                <div className={styles.topDiv}>
                    <ApplyImageCard leagueName={Name || "Unknown"}/>
                    <RequirementsCard />
                </div>
                <RulesCard />
            </div>
        </>
    );
}