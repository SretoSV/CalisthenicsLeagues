import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/NavigationStyles/DropDownCartItemsStyle.module.css';
import { CartItemCard } from './CartItemCard';
import { CartContext } from '../../context/CartContext';

interface Country {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg: string;
    };
  }

export function DropDownCartItems(){
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error("CartContext must be used within a CartProvider.");
    }

    const { cartItems } = cartContext;

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    
    const [form, setForm] = useState({
        country: '',
        city: '',
        address: '',
        number: '',
    });

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data))
        .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
        setForm({
          ...form,
          [e.target.name]: e.target.value, 
        });
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        //send to API whole string of Items
        //add inputs for address, number, city, country
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
                            <form onSubmit={handleSubmit} className={styles.dataForm}>
                                
                                <label htmlFor="country">Country</label>
                                <input
                                    id="country"
                                    type="text"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    list="countries-list"
                                    autoComplete="off"
                                    required
                                />
                                <datalist id="countries-list">
                                    {countries.map((country) => (
                                    <option key={country.name.common} value={country.name.common} />
                                    ))}
                                </datalist>

                                <label htmlFor="city" className={styles.cityLabel}>City</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    defaultValue={form.city}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />

                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    defaultValue={form.address}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />

                                <label htmlFor="number">Number</label>
                                <input
                                    id="number"
                                    type="text"
                                    name="number"
                                    defaultValue={form.number}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                />

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