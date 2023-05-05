import React from "react";
import { Link } from "react-router-dom";
import styles from '../homepage.module.css';
import electronics from '../../../Assets/electronics.jpg';
import furniture from '../../../Assets/furniture.jpg';
import speaker from '../../../Assets/speaker.jpg';
import wallet from '../../../Assets/wallet.jpg';
import watch from '../../../Assets/watch.jpg';
import beauty from '../../../Assets/beauty.jpg';
import fashion from '../../../Assets/fashion.jpg';
import space from '../../../Assets/space.jpg';
import { useSpringCarousel } from 'react-spring-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const bannerItems = [
    {id: 1, img: electronics, firstHeader: "Electronics Appliance", secondHeader: "Wide range of electronics appliance"},
    {id: 2, img: furniture, firstHeader: "Modern Funrniture", secondHeader: "Make your home sweet home"},
    {id: 3, img: speaker, firstHeader: "Enjoy the Beats", secondHeader: "Take the music with you"},
    {id: 4, img: wallet, firstHeader: "Money matters", secondHeader: "A wallet that describe you"},
    {id: 5, img: watch, firstHeader: "Time is money", secondHeader: "Have you all the time"},
    {id: 6, img: beauty, firstHeader: "Health and Beauty", secondHeader: "Present yourself how you want"},
    {id: 7, img: space, firstHeader: "Space Saver", secondHeader: "Make the most of your home"},
    {id: 8, img: beauty, firstHeader: "Fashion is Art", secondHeader: "Be yourself"},
]

const Banner = (img) => {

    const { carouselFragment, slideToNextItem, slideToPrevItem } = useSpringCarousel({
        items: [
            {
                id: 1,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[0].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[0].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[0].secondHeader}</p>
                        {/* <Link to="/products/latest" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 2,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[1].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[1].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[1].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 3,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[2].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[2].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[2].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 4,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[3].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[3].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[3].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 5,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[4].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[4].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[4].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 6,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[5].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[5].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[5].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 7,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[6].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[6].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[6].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            },
            {
                id: 8,
                renderItem: <div className={styles.bannerMain}>
                    <div className={styles.bannerBg}>
                        <img src={bannerItems[7].img} alt="Bechakena" className={styles.bannerBgImg}/>
                    </div>
                
                    <div className={styles.bannerHeading}>
                        <h2 className={styles.bannerH2}>{bannerItems[7].firstHeader}</h2>
                        <p className={styles.bannerP}>{bannerItems[7].secondHeader}</p>
                        {/* <Link to="" className={styles.shoppingLink}>Shop Now</Link> */}
                    </div>
                </div>
            }
        ]
    })

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.bannerItem}>{carouselFragment}</div>
            
            <div className={styles.arrowContainer}>
                <FontAwesomeIcon icon={faAngleLeft} className={styles.arrow} onClick={slideToPrevItem} />
                <FontAwesomeIcon icon={faAngleRight} className={styles.arrow} onClick={slideToNextItem} />
            </div>
        </div>
    )
}

export default Banner;
