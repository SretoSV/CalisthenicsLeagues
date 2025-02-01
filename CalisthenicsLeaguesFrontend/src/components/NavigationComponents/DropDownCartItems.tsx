import { useContext } from 'react';
import styles from '../../styles/NavigationStyles/DropDownCartItemsStyle.module.css';
import { CartItemCard } from './CartItemCard';
import { CartContext } from '../../context/CartContext';

export function DropDownCartItems(){
    const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider.");
  }

  const { cartItems } = cartContext;

    const handleSubmit = () => {
        //send to API whole string of Items
        console.log(cartItems);
    };

    return(
        <>
            <div className={styles.dropdownStyle}>
                <div className={styles.triangleDivOuter}></div>
                {
                    cartItems.map((shirt) => {
                        return (
                            <CartItemCard
                                key={`${shirt.id}-${shirt.size}-${shirt.shirtImage}`} 
                                id={shirt.id}
                                leagueName={shirt.leagueName}
                                shirtImage={shirt.shirtImage}
                                size={shirt.size}
                                quantity={shirt.quantity}
                            />
                        );
                    }
                    )
                }
                    
                    <button
                        className={styles.dropDownLinks}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                
            </div>
        </>
    );
}