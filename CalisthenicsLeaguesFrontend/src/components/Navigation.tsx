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
            {
                user ? 
                <>
                    <a className={styles.links2} href="LeaguesPage">Leagues</a>
                    <a className={styles.links2} href="LeagueMembersPage">League members</a>
                    <a className={styles.links2} href="ShopPage">Shop</a>
                </>
                :
                <>
                    <a className={styles.links} href="LeaguesPage">Leagues</a>
                    <a className={styles.links} href="LeagueMembersPage">League members</a>
                    <a className={styles.links} href="ShopPage">Shop</a>
                </>
            }
            
            {user ? <PictureDropDownList /> : <a className={styles.loginLink} href="#">Login</a>}
            
        </header>
        <div className={styles.smallLinksDiv}>
            <a className={styles.smallLinks} href="LeaguesPage">Leagues</a>
            <br />
            <a className={styles.smallLinks} href="LeagueMembersPage">League members</a>
            <br />
            <a className={styles.smallLinks} href="ShopPage">Shop</a>
        </div>
        </>
    );
}