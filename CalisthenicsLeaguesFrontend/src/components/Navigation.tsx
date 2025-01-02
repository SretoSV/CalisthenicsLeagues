import logoImage from '../images/logo.png';
import styles from '../styles/NavigationStyle.module.css';
import { PictureDropDownList } from './PictureDropDownList';
interface NavigationProps{
    isApplyPage: boolean,
}
export function Navigation(props: NavigationProps){
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