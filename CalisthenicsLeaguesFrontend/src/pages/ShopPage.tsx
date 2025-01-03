import { useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import { ShirtCard } from "../components/ShopPageComponents/ShirtCard";
import styles from '../styles/ShopPageStyles/ShopPageStyle.module.css';

export function ShopPage(){

    const [shirts, setShirts] = useState([
        {   
            id: 1,
            leagueName: "Legendary",
            shirtImageBlackFront: "league1",//cuvacu ih na backendu
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
        {   
            id: 2,
            leagueName: "World-Class",
            shirtImageBlackFront: "league1",
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
        {   
            id: 3,
            leagueName: "Pro",
            shirtImageBlackFront: "league1",
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
        {   
            id: 4,
            leagueName: "Semi-pro",
            shirtImageBlackFront: "league1",
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
        {   
            id: 5,
            leagueName: "Amateur",
            shirtImageBlackFront: "league1",
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
        {   
            id: 6,
            leagueName: "Begginer",
            shirtImageBlackFront: "league1",
            shirtImageBlackBack: "league1",
            shirtImageWhiteFront: "league1",
            shirtImageWhiteBack: "league1",
        },
    ]);

    return(
        <>
            <Navigation isApplyPage={false}/>
            <div className={styles.mainDiv}>
                {shirts.map((shirt) => {
                    return <ShirtCard 
                                key={shirt.id} 
                                id={shirt.id} 
                                leagueName={shirt.leagueName}
                                shirtImageBlackFront={shirt.shirtImageBlackFront}
                                shirtImageBlackBack={shirt.shirtImageBlackBack}
                                shirtImageWhiteFront={shirt.shirtImageWhiteFront}
                                shirtImageWhiteBack={shirt.shirtImageWhiteBack}
                            />
                })}
            </div>
        </>
    );
}