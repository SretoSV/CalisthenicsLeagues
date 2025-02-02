import { useContext, useEffect, useState } from "react";
import { Navigation } from "../components/NavigationComponents/Navigation";
import { ShirtCard } from "../components/ShopPageComponents/ShirtCard";
import styles from '../styles/ShopPageStyles/ShopPageStyle.module.css';
import { UserContext } from "../context/UserContext";
import { serverPath } from "../functions/serverpath";

interface Shirt{
    id: number,
    leagueName: string,
    shirtImageBlackFront: string,
    shirtImageBlackBack: string,
    shirtImageWhiteFront: string,
    shirtImageWhiteBack: string,
    price: number,
}

export function ShopPage(){
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("UserContext must be used within a UserProvider.");
    }
    const { user } = userContext;

    const [shirts, setShirts] = useState<Shirt[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeagues = async () => {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch(`${serverPath()}Shop/shirts`,{
                    method: 'GET', 
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setShirts(data);
            } 
            catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err?.message || 'Unknown error');
                }
                else {
                    setError('Unknown error');
                }
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchLeagues();
    }, []);

    return(
        <>
            {isLoading ? 
            (<div>Loading...</div>) : 
            (<>
                <Navigation isApplyPage={false}/>
                
                <div className={styles.mainDiv}>
                    {shirts.map((shirt) => {
                        if(user != null){
                            if(shirt.id >= user.league){
                                return <ShirtCard 
                                    key={shirt.id} 
                                    id={shirt.id} 
                                    leagueName={shirt.leagueName}
                                    shirtImageBlackFront={shirt.shirtImageBlackFront}
                                    shirtImageBlackBack={shirt.shirtImageBlackBack}
                                    shirtImageWhiteFront={shirt.shirtImageWhiteFront}
                                    shirtImageWhiteBack={shirt.shirtImageWhiteBack}
                                    available={true}
                                    price={shirt.price}
                                />
                            }
                            else{
                                return <ShirtCard 
                                    key={shirt.id} 
                                    id={shirt.id} 
                                    leagueName={shirt.leagueName}
                                    shirtImageBlackFront={shirt.shirtImageBlackFront}
                                    shirtImageBlackBack={shirt.shirtImageBlackBack}
                                    shirtImageWhiteFront={shirt.shirtImageWhiteFront}
                                    shirtImageWhiteBack={shirt.shirtImageWhiteBack}
                                    available={false}
                                    price={shirt.price}
                                />
                            }
                        }
                        else{
                            return <ShirtCard 
                                key={shirt.id} 
                                id={shirt.id} 
                                leagueName={shirt.leagueName}
                                shirtImageBlackFront={shirt.shirtImageBlackFront}
                                shirtImageBlackBack={shirt.shirtImageBlackBack}
                                shirtImageWhiteFront={shirt.shirtImageWhiteFront}
                                shirtImageWhiteBack={shirt.shirtImageWhiteBack}
                                available={false}
                                price={shirt.price}
                            />
                        }
                    })}
                </div>
            </>)
            }
            {error}
        </>
    );
}