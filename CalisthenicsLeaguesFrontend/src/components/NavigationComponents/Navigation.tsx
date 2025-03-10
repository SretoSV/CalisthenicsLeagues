import logoImage from '../../images/logo.png';
import styles from '../../styles/NavigationStyles/NavigationStyle.module.css';
import { PictureDropDownList } from './PictureDropDownList';
import { useUserContext } from '../../context/UserContext';
import { CartCard } from './CartCard';
import { motion } from "framer-motion";

interface NavigationProps{
    isApplyPage: boolean,
}
export function Navigation(props: NavigationProps){

    const { user } = useUserContext();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut"}}
        >
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
            {
                user ? 
                <>
                {
                    user.admin ? 
                    <>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeaguesPage">Leagues</a>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeagueMembersPage">Members</a>
                    <a className={styles.Links} href="../ShopPage">Shop</a>
                    <a className={styles.Links} href="../ChatPage">Chat</a>
                    <a className={styles.Links} href="../AdminPage">Applications</a>
                    </>
                    :
                    <>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeaguesPage">Leagues</a>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="../LeagueMembersPage">Members</a>
                    <a className={styles.Links} href="../ShopPage">Shop</a>
                    <a className={styles.Links} href="../ChatPage">Chat</a>
                    </>
                }
                </>
                :
                <>
                <a className={`${styles.LinksOut} ${styles.LinksBorder}`} href="../LeaguesPage">Leagues</a>
                <a className={`${styles.LinksOut} ${styles.LinksBorder}`} href="../LeagueMembersPage">Members</a>
                <a className={styles.LinksOut} href="../ShopPage">Shop</a>
                </>
            }
        </div> : 
        <div className={styles.LinksDiv}>
            {
                user ? 
                <>
                {
                    user.admin ? 
                    <>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeaguesPage">Leagues</a>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeagueMembersPage">Members</a>
                    <a className={styles.Links} href="ShopPage">Shop</a>
                    <a className={styles.Links} href="ChatPage">Chat</a>
                    <a className={styles.Links} href="AdminPage">Applications</a>
                    </>
                    :
                    <>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeaguesPage">Leagues</a>
                    <a className={`${styles.Links} ${styles.LinksBorder}`} href="LeagueMembersPage">Members</a>
                    <a className={styles.Links} href="ShopPage">Shop</a>
                    <a className={styles.Links} href="ChatPage">Chat</a>
                    </>
                }
                </>
                :
                <>
                <a className={`${styles.LinksOut} ${styles.LinksBorder}`} href="LeaguesPage">Leagues</a>
                <a className={`${styles.LinksOut} ${styles.LinksBorder}`} href="LeagueMembersPage">Members</a>
                <a className={styles.LinksOut} href="ShopPage">Shop</a>
                </>
            }
        </div>
        }
        </motion.div>
    );
}