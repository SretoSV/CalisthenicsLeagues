import colorImageBlack from '../../images/colorImageBlack.png';
import colorImageWhite from '../../images/colorImageWhite.png';
import styles from '../../styles/ShopPageStyles/ShirtCardStyle.module.css';
import { useState, useEffect } from 'react';
import { serverPath } from '../../functions/serverpath';
import { useCartContext } from '../../context/CartContext';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LeagueCardProps {
    id: number,
    league: string,
    shirtImageBlackFront: string,
    shirtImageBlackBack: string,
    shirtImageWhiteFront: string,
    shirtImageWhiteBack: string,
    available: boolean,
    price: number,
}

export function ShirtCard(props: LeagueCardProps) {
    const { updateCartItems } = useCartContext();
    const [shirtSize, setShirtSize] = useState("S");
    const [quantity, setQuantity] = useState<number>(1);
    const [currentShirtImage, setCurrentShirtImage] = useState<string>(""); 
    const [selectedView, setSelectedView] = useState<string>("front");
    const [currentColorImage, setCurrentColorImage] = useState<boolean>(true); 

    const handleViewChange = (view: string) => {
        setSelectedView(view);
    };
    
    const handleColorImageClick = () => {
        setCurrentColorImage(current => !current);
        if (currentColorImage && selectedView === "front") {
            setCurrentShirtImage(serverPath()+props.shirtImageWhiteFront);
        } else if (currentColorImage && selectedView === "back") {
            setCurrentShirtImage(serverPath()+props.shirtImageWhiteBack);
        }
        else if (!currentColorImage && selectedView === "front") {
            setCurrentShirtImage(serverPath()+props.shirtImageBlackFront);
        }else{
            setCurrentShirtImage(serverPath()+props.shirtImageBlackBack);
        }
    };
    
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : 1; 
        if (!isNaN(value) && value >= 1) {
          setQuantity(value);
        }
    };

    const handleClick = () => {
        if(currentColorImage){
            updateCartItems(props.id, props.league, props.shirtImageBlackFront, shirtSize, quantity, 1, props.price);
        }else{
            updateCartItems(props.id, props.league, props.shirtImageWhiteFront, shirtSize, quantity, 1, props.price);
        }
    };

    useEffect(() => {
        if (currentColorImage && selectedView === "front") {
            setCurrentShirtImage(serverPath()+props.shirtImageBlackFront);
        } else if (currentColorImage && selectedView === "back") {
            setCurrentShirtImage(serverPath()+props.shirtImageBlackBack);
        }
        else if (!currentColorImage && selectedView === "front") {
            setCurrentShirtImage(serverPath()+props.shirtImageWhiteFront);
        }else{
            setCurrentShirtImage(serverPath()+props.shirtImageWhiteBack);
        }

    }, [selectedView]);
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div 
            ref={ref}
            className={styles.mainDiv}
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: (props.id/2 * 0.15)}}
        >
            <h2 className={styles.header2}>{props.league}</h2>
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
                    data-testid="front-radio"
                />

                <input 
                    className={styles.customRadio}
                    type="radio" 
                    id="back" 
                    checked={selectedView === "back"} 
                    onChange={() => handleViewChange("back")} 
                    data-testid="back-radio"
                />
            </div>

            <div className={styles.priceDiv}>
                {"Price: " + props.price + " €"}
            </div>
            <div style={{height:"10px"}}></div>
            <div>
                <select id="attributeSelect" className={styles.dropdownInput} value={shirtSize} 
                    onChange={(e) => {setShirtSize(e.target.value)}} required>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <input 
                    type="number" 
                    value={quantity} 
                    className={styles.quantityInput}
                    onChange={handleQuantityChange}
                    min={1}
                    required
                    data-testid="quantity-radio"
                />
            </div>
            {props.available ? 
            <button onClick={handleClick} className={styles.addToCartButton}>Add To Cart</button> :
            <button onClick={handleClick} className={styles.addToCartButton} disabled>Add To Cart</button>
            }
        </motion.div>
    );
}