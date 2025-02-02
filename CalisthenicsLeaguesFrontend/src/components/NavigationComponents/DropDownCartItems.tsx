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

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    
    const handleSubmit = () => {
        //send to API whole string of Items
        //show modal for address, number, city, country
        console.log(cartItems);
    };

    return(
        <>
            <div className={styles.dropdownStyle}>
                <div className={styles.triangleDivOuter}></div>
                {
                    cartItems.length === 0 ? (
                        <div>
                            <b>Empty cart</b>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((shirt) => (
                                <CartItemCard
                                    key={`${shirt.id}-${shirt.size}-${shirt.shirtImage}`} 
                                    id={shirt.id}
                                    leagueName={shirt.leagueName}
                                    shirtImage={shirt.shirtImage}
                                    size={shirt.size}
                                    quantity={shirt.quantity}
                                    price={shirt.price}
                                />
                            ))}
                            <div className={styles.totalPriceDiv}>
                                {"Total price: " + totalPrice + " €"}
                            </div>
                            <form onSubmit={handleSubmit}>
                                
                                <button
                                    className={styles.submitButton}
                                    type='submit'
                                >
                                    Submit order
                                </button>
                            </form>
                        </>
                    )
                }
            </div>
        </>
    );
}