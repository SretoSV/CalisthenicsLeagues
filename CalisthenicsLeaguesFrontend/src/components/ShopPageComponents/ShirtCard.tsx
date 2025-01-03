import shirtImageBlackFront from '../../images/shirtImageBlackFront.png';
import shirtImageBlackBack from '../../images/shirtImageBlackBack.png';
import shirtImageWhiteFront from '../../images/shirtImageWhiteFront.png';
import shirtImageWhiteBack from '../../images/shirtImageWhiteBack.png';
import colorImageBlack from '../../images/colorImageBlack.png';
import colorImageWhite from '../../images/colorImageWhite.png';
import styles from '../../styles/ShopPageStyles/ShirtCardStyle.module.css';
import { useState, useEffect } from 'react';

interface LeagueCardProps {
    id: number,
    leagueName: string,
    shirtImageBlackFront: string,
    shirtImageBlackBack: string,
    shirtImageWhiteFront: string,
    shirtImageWhiteBack: string,
}

export function ShirtCard(props: LeagueCardProps) {
    const [currentShirtImage, setCurrentShirtImage] = useState<string>(shirtImageBlackBack); 
    const [selectedView, setSelectedView] = useState<string>("front");
    const [currentColorImage, setCurrentColorImage] = useState<boolean>(true); 

    useEffect(() => {
        if (currentColorImage && selectedView === "front") {
            setCurrentShirtImage(shirtImageBlackFront);
        } else if (currentColorImage && selectedView === "back") {
            setCurrentShirtImage(shirtImageBlackBack);
        }
        else if (!currentColorImage && selectedView === "front") {
            setCurrentShirtImage(shirtImageWhiteFront);
        }else{
            setCurrentShirtImage(shirtImageWhiteBack);
        }

    }, [selectedView]);

    const handleViewChange = (view: string) => {
        setSelectedView(view);
    };

    const handleColorImageClick = () => {
        setCurrentColorImage(current => !current);
        if (currentColorImage && selectedView === "front") {
            setCurrentShirtImage(shirtImageWhiteFront);
        } else if (currentColorImage && selectedView === "back") {
            setCurrentShirtImage(shirtImageWhiteBack);
        }
        else if (!currentColorImage && selectedView === "front") {
            setCurrentShirtImage(shirtImageBlackFront);
        }else{
            setCurrentShirtImage(shirtImageBlackBack);
        }
    };

    return (
        <div className={styles.mainDiv}>
                <h2 className={styles.header2}>{props.leagueName}</h2>
                <img 
                    src={currentColorImage ? colorImageBlack : colorImageWhite}
                    alt="color"
                    className={styles.colorImage}
                    onClick={handleColorImageClick}
                    title='change color'
                />
            <img 
                src={currentShirtImage}
                alt="Shirt"
                className={styles.leagueImage}
            />
            <div>
                <input 
                    className={styles.customRadio}
                    type="radio" 
                    id="front" 
                    checked={selectedView === "front"} 
                    onChange={() => handleViewChange("front")} 
                />

                <input 
                    className={styles.customRadio}
                    type="radio" 
                    id="back" 
                    checked={selectedView === "back"} 
                    onChange={() => handleViewChange("back")} 
                />
            </div>

            <a className={styles.addToCartButton} href="#">Add To Cart</a>
        </div>
    );
}