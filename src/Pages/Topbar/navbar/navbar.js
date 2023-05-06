import React from 'react';
import logo from '../../../Assets/logo.png';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStore, faGem, faRss, faHeart, faDesktop } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';
import electronics from '../../../Assets/electronics.jpg';
import fashion from '../../../Assets/fashion.jpg';
import furniture from '../../../Assets/furniture.jpg';
import space from '../../../Assets/space.jpg';
import speaker from '../../../Assets/speaker.jpg';
import wallet from '../../../Assets/wallet.jpg';
import watch from '../../../Assets/watch.jpg';
import beauty from '../../../Assets/beauty.jpg';


const Navbar = () => {

    const location = useLocation().pathname;

    const splitLocation = location.split('/');

    return (
        <div className={styles.navBarMain}>
            <div className={styles.navElements}>
                <ul className={styles.navElement}>
                    <li className={styles.navList}>
                        <a href="/" className={location === '/' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faHouse} className={styles.navIcon} />
                            <span className={styles.navP}>Home</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/products/latestItem" className={location === '/products/latestItem' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faStore} className={styles.navIcon} />
                            <span className={styles.navP}>Latest</span>
                        </a>
                    </li>
                    <li className={styles.navList} id={styles.parentNavItem}>
                        <div className={styles.navItem}>
                            <FontAwesomeIcon icon={faGem} className={styles.navIcon} />
                            <span className={splitLocation[1] === 'products' && splitLocation[2] !== 'latestItem' && splitLocation[2] !== 'featuredItem' ? `${styles.navP} ${styles.navActive}` : styles.navP}>Products</span>
                        </div>
                        <ul className={styles.childNavElement}>
                            <li className={styles.childNavList}>
                                <a href='/products/spaceSaverItem' className={splitLocation[2] ? splitLocation[2] === 'spaceSaverItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={space} alt="space saver" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Space Saver</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/bluetoothHeadphoneItem' className={splitLocation[2] ? splitLocation[2] === 'bluetoothHeadphoneItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={speaker} alt="bluetooth headphone" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Bluetooth Headphone</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/fashionWalletItem' className={splitLocation[2] ? splitLocation[2] === 'fashioWalletItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={wallet} alt="wallet" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Fashion Wallet</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/smartWatchItem' className={splitLocation[2] ? splitLocation[2] === 'smartWatchItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={watch} alt="smart watch" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Smart Watch</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/homeAndLivingItem' className={splitLocation[2] ? splitLocation[2] === 'homeAndLivingItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={furniture} alt="home and living" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Home and Living</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/electronicsItem' className={splitLocation[2] ? splitLocation[2] === 'electronicsItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={electronics} alt="electronics" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Electronics</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/healthAndBeautyItem' className={splitLocation[2] ? splitLocation[2] === 'healthAndBeautyItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={beauty} alt="other" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Health and Beauty</p>
                                </a>
                            </li>
                            <li className={styles.childNavList}>
                                <a href='/products/fashionItem' className={splitLocation[2] ? splitLocation[2] === 'fashionItem' ? `${styles.childNavItem} ${styles.childActive}` : styles.childNavItem : styles.childNavItem}>
                                    <img src={fashion} alt="fashion" className={styles.childNavImg}/>
                                    <p className={styles.childNavP}>Fashion</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <a href='/' className={styles.navElements}>
                <div className={styles.navElements} id={styles.logoEl}>
                    <img src={logo} className={styles.logo}/>
                </div>
            </a>
            <div className={styles.navElements}>
                <ul className={styles.navElement} id={styles.rightElements}>
                    <li className={styles.navList}>
                        <a href="/products/featuredItem" className={location === '/products/featuredItem' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faHeart} className={styles.navIcon} />
                            <span className={styles.navP}>Featured</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/blog" className={location === '/blog' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faRss} className={styles.navIcon} />
                            <span className={styles.navP}>Blog</span>
                        </a>
                    </li>
                    <li className={styles.navList}>
                        <a href="/about-us" className={location === '/about-us' ? `${styles.navItem} ${styles.navActive}` : styles.navItem}>
                            <FontAwesomeIcon icon={faDesktop} className={styles.navIcon} />
                            <span className={styles.navP}>About Us</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
