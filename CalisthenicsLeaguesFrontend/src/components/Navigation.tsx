import logoImage from '../images/logo.png';
import styles from '../styles/NavigationStyle.module.css';

export function Navigation(){
    return (
        <header className={styles.headerDiv}>
            <img 
                src={logoImage}
                alt="Logo"
                className={styles.logoImage}
            />
            <a className={styles.links} href="LeaguesPage">Leagues</a>
            <a className={styles.links} href="LeagueMembersPage">League members</a>
            <a className={styles.links} href="ShopPage">Shop</a>

            <a className={styles.loginLink} href="#">Login</a>
        </header>
    );
}