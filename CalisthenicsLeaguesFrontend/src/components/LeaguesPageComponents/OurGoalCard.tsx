import styles from '../../styles/LeaguesPageStyles/OurGoalCardStyle.module.css';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function OurGoalCard(){
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 80 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={styles.mainDiv}>
                <b>
                    Our goal is to connnect all CALISTHENICS people in one place.
                </b>
            </div>
        </motion.div>
    );
}