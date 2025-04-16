import { Navigation } from "../components/NavigationComponents/Navigation";
import { RequirementsCard } from "../components/ApplyPageComponents/RequirementsCard";
import { RulesCard } from "../components/ApplyPageComponents/RulesCard";
import styles from '../styles/ApplyPageStyles/ApplyPageStyle.module.css';
import { ApplyImageCard } from "../components/ApplyPageComponents/ApplyImageCard";
import { useNavigate, useParams } from "react-router-dom";
import { FooterCard } from "../components/FooterComponents/FooterCard";
import { useEffect } from "react";

export function ApplyPage(){
    const { Name } = useParams<{ Name: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if(Name != "Legendary" && Name != "World-Class" && Name != "Pro" && Name != "Semi-pro" && Name != "Amateur" && Name != "Beginner") {
            navigate("/");
        }
    }, []);

    return(
        <>
            <Navigation isApplyPage={true}/>
            <div className={styles.mainDiv}>
                <div className={styles.topDiv}>
                    <ApplyImageCard leagueName={Name || "Unknown"}/>
                    <RequirementsCard leagueName={Name || "Unknown"}/>
                </div>
                <RulesCard />
            </div>
            <FooterCard />
        </>
    );
}