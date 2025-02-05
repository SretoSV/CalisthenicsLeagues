import logoImage from '../../images/logo.png';
import styles from '../../styles/NavigationStyles/NavigationStyle.module.css';
import { PictureDropDownList } from './PictureDropDownList';
import { useUserContext } from '../../context/UserContext';
import { CartCard } from './CartCard';

interface NavigationProps{
    isApplyPage: boolean,
}
export function Navigation(props: NavigationProps){

    const { user } = useUserContext();

    return (
        <>
        <header className={styles.headerDiv}>
            <img 
                src={logoImage}
                alt="Logo"
                className={styles.logoImage}
            />

            {user ? 
                <div className={styles.cartAndProfileDiv}>
                    <CartCard />
                    <PictureDropDownList />
                </div> : 
            (props.isApplyPage? <a className={styles.loginLink} href="../LoginPage">Login</a> : 
            <a className={styles.loginLink} href="LoginPage">Login</a> )
            }
            
        </header>
        {props.isApplyPage? 
        <div className={styles.LinksDiv}>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeaguesPage">Leagues</a>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeagueMembersPage">Members</a>
            <a className={styles.Links} href="../ShopPage">Shop</a>
        </div> : 
        <div className={styles.LinksDiv}>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeaguesPage">Leagues</a>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeagueMembersPage">Members</a>
            <a className={styles.Links} href="ShopPage">Shop</a>
        </div>
        }
        </>
    );
}