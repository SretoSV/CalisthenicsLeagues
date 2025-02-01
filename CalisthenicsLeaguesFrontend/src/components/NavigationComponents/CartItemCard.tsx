import { useContext, useEffect, useState } from "react";
import { serverPath } from "../../functions/serverpath";
import styles from '../../styles/NavigationStyles/CartItemCardStyle.module.css';
import { CartContext } from "../../context/CartContext";

interface Shirt{
    id: number,
    leagueName: string,
    shirtImage: string,
    size: string,
    quantity: number,
}

export function CartItemCard(props: Shirt){
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext must be used within a CartProvider.");
    }
    const { removeItem, updateCartItems } = cartContext;

    const [quantity, setQuantity] = useState<number>(props.quantity);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : 1; 
        if (!isNaN(value) && value >= 1) {
          setQuantity(value);
        }
    };
    
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        removeItem(props.id, props.leagueName, props.shirtImage, props.size);
    };

    useEffect(() => {
        updateCartItems(props.id, props.leagueName, props.shirtImage, props.size, quantity, 2);
    }, [quantity]);

    return (
        <>
        <div className={styles.mainDiv}>
            <img 
                src={serverPath()+props.shirtImage}
                alt="Shirt"
                className={styles.shirtImage}
            />
            <b>
            <div>
                {props.leagueName}<br/><br/>
                {"Size: " + props.size}<br/><br/>
                <input 
                    type="number" 
                    value={quantity} 
                    className={styles.quantityInput}
                    onChange={handleQuantityChange}
                    min={1}
                    required
                />
            </div>
            </b>
            <button className={styles.removeButton} onClick={handleClick}>X</button>
        </div>

        <br />
        </>
    );
}