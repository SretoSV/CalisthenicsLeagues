import { serverPath } from '../../functions/serverpath';
import styles from '../../styles/LeaguesPageStyles/LeagueCardStyle.module.css';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LeagueCardProps{
    id: number,
    leagueName: string,
    leagueImage: string,
}

export function LeagueCard(props: LeagueCardProps){
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div 
            ref={ref}
            className={styles.mainDiv}
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: (props.id/2 * 0.15)}}
            /*transition={{ type: "spring", stiffness: 100, damping: 5 }}*/
        >
            <h2 className={styles.header2}>{props.leagueName}</h2>
            <img 
                src={serverPath()+props.leagueImage}
                alt="League"
                className={styles.leagueImage}
            />
            <a className={styles.applyButton} href={`ApplyPage/${props.leagueName}`}>Apply</a>
        </motion.div>
    );
}