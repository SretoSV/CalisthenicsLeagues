import logoImage from '../images/logo.png';
import styles from '../styles/NavigationStyle.module.css';
import { PictureDropDownList } from './PictureDropDownList';

export function Navigation(){
    const user = true;

    return (
        <>
        <header className={styles.headerDiv}>
            <img 
                src={logoImage}
                alt="Logo"
                className={styles.logoImage}
            />

            {user ? <PictureDropDownList /> : <a className={styles.loginLink} href="#">Login</a>}
            
        </header>
        <div className={styles.LinksDiv}>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeaguesPage">Leagues</a>
            <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeagueMembersPage">League_members</a>
            <a className={styles.Links} href="ShopPage">Shop</a>
        </div>
        </>
    );
}