import { useEffect, useState } from "react";
import { serverPath } from "../../functions/serverpath";
import styles from '../../styles/NavigationStyles/CartItemCardStyle.module.css';
import { useCartContext } from "../../context/CartContext";

interface Shirt{
    id: number,
    league: string,
    shirtImage: string,
    size: string,
    quantity: number,
    price: number,
}

export function CartItemCard(props: Shirt){
    const { removeItem, updateCartItems } = useCartContext();

    const [quantity, setQuantity] = useState<number>(props.quantity);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : 1; 
        if (!isNaN(value) && value >= 1) {
          setQuantity(value);
        }
    };
    
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        removeItem(props.id, props.league, props.shirtImage, props.size);
    };

    useEffect(() => {
        updateCartItems(props.id, props.league, props.shirtImage, props.size, quantity, 2, props.price);
    }, [quantity]);

    return (
        <>
        <div data-testid="cart-item-card" className={styles.mainDiv}>
            <img 
                src={serverPath()+props.shirtImage}
                alt="Shirt"
                className={styles.shirtImage}
            />
            <b>
            <div>
                {props.league}<br/>
                {"Size: " + props.size}<br/>
                {"Price: " + (props.price * props.quantity).toFixed(2) + " €"}
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