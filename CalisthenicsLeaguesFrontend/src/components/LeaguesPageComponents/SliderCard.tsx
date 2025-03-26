import { useEffect, useState } from 'react';
import styles from '../../styles/LeaguesPageStyles/LeaguePageStyle.module.css';
import { motion } from "framer-motion";
import image1 from "../../images/background3.jpg";
import image2 from "../../images/background4.jpg";
import down from "../../images/downArrows.png";

export function SliderCard(){
    const images = [
        image1,
        image2
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [image, setImage] = useState(image1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setImage(images[currentIndex]);
    }, [currentIndex]);

    const goToPrevious = () => {
        console.log(currentIndex);
        setCurrentIndex((currentIndex) => currentIndex === 0 ? 1 : currentIndex- 1);
    };

    const goToNext = () => {
        console.log(currentIndex);
        setCurrentIndex((currentIndex) => currentIndex === 1 ? 0 : currentIndex + 1);
    };
    
    const handleScrollDown = () => {
        window.scrollTo({
            top: 600,
            behavior: 'smooth'
        });
    };

    return <motion.div 
                className={styles.backgroundDiv}
                initial={{ opacity: 0, y: 100 }}  // Početno stanje (nevidljiv + pomeren na dole)
                animate={{ opacity: 1, y: 0 }}  // Krajnje stanje (vidljiv + normalna pozicija)
                transition={{ duration: 0.8, ease: "easeOut" }}  // Trajanje animacije
            >

            <img src={image} alt="Image" className={styles.image} />
            <div className={styles.headDiv}>
                <div className={styles.head} ><b>CALISTHENICS LEAGUES <br /> WELCOME</b></div>
                <button className={styles.down} onClick={handleScrollDown} >
                    <img src={down} alt="down" className={styles.downArrows} />
                </button>
            </div>
            <button className={styles.prev} onClick={goToPrevious}>❮</button>
            <button className={styles.next} onClick={goToNext}>❯</button>
        
        </motion.div>
}
