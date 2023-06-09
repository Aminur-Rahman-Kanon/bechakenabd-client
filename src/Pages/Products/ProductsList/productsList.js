import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from './productsList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Backdrop from "../../Others/Backdrop/backdrop";
import Modal from '../../Others/Modal/modal';
import ReactPaginate from 'react-paginate';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import { disableScroll } from "../../Others/HelperFunction/helperFunction";
import './slider.css';
import { ContextApi } from "../../../App";

const ProductsList = () => {

    const product = useContext(ContextApi);

    const params = useParams();

    const [sidebar, setSidebar] = useState(false);

    const [backdrop, setBackdrop] = useState(false);

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [error, setError] = useState(false);

    const [status, setStatus] = useState('');

    const [modal, setModal] = useState(false);

    const [priceFrom, setPriceFrom] = useState(0);

    const [priceTo, setPriceTo] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);

    const [itemNotFound, setItemNotFound] = useState(false);

    const itemPerPage = 9;

    const endOffset = itemOffset + itemPerPage;

    let pageCount = 0;

    if (filteredProducts.length){
        pageCount = Math.ceil(filteredProducts.length / itemPerPage);
    }

    else {
        pageCount = Math.ceil(products.length / itemPerPage);
    }

    const handlePageClick = (event) => {
        if (filteredProducts.length){
            const newOffset = (event.selected * itemPerPage) % filteredProducts.length;
            setItemOffset(newOffset);
        }
        else {
            const newOffset = (event.selected * itemPerPage) % products.length;
            setItemOffset(newOffset);
        }
    }

    useEffect(() => {
        if (product.data){
            setProducts(product.data[params.productId]);
        }
    }, [product.data])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [itemOffset, filteredProducts.length])

    useEffect(() => {
        if (backdrop){
            disableScroll()
        }
        else {
            window.onscroll = () => {
                
            }
        }
    }, [backdrop])

    let defaultView = Array.from(Array(12).keys()).map(item => {
            return <div key={item} className={styles.defaultItemContainer} id={styles.loader}>
            <div className={styles.defaultItemImgContainer}>
                <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinnerPulse} />
            </div>
            <div className={styles.loadingName}></div>
            <div className={styles.loadingLink}></div>
        </div>
    });

    if (products.length){
        //showing filtered items
        if (!itemNotFound && filteredProducts.length){
            defaultView = filteredProducts.slice(itemOffset, endOffset).map(item => {
            return <div key={item._id} className={styles.productsContainer} id={styles.loader}>
                    <a href={`/products/${params.productId}/${item.name}`} className={styles.productsLink}>
                        <div className={styles.productsImgContainer}>
                            <img src={item.img[0]} className={styles.productsImg}/>
                        </div>
                        <div className={styles.productsName}>{item.name}</div>
                        <div className={styles.productsPrice}>&#2547;{item.price}</div>
                    </a>
                </div>
            });
        }
        else if (itemNotFound && !filteredProducts.length) {
            defaultView = <div className={styles.notFoundContainer}>
                <h2 className={styles.notFoundHeader}>Nothing found based on your range</h2>
            </div>
        }
        //showing all items
        else {
            defaultView = products.slice(itemOffset, endOffset).map(item => {
            return <div key={item._id} className={styles.productsContainer} id={styles.loader}>
                    <a href={`/products/${params.productId}/${item.name}`} className={styles.productsLink}>
                        <div className={styles.productsImgContainer}>
                            <img src={item.img[0]} className={styles.productsImg}/>
                        </div>
                        <div className={styles.productsName}>{item.name}</div>
                        <div className={styles.productsPrice}>&#2547;{item.price}</div>
                    </a>
                </div>
            });
        }
    }

    else if(status === 'not found') {
        console.log(status);
        defaultView = <div className={styles.fallbackContainer}>
            <h2 className={styles.fallbackHeader}>Nothing found</h2>
        </div>
    }

    const filterItem = () => {
        if (priceFrom && priceTo) {
            const filteredData = products.filter(item => Number(item.price) >= priceFrom && Number(item.price) <= priceTo);
            if (filteredData.length){
                setItemNotFound(false)
                setFilteredProducts(filteredData);
                setSidebar(false);
                setBackdrop(false);
            }
            else {
                setItemNotFound(true);
                setItemOffset(0);
                setSidebar(false);
                setBackdrop(false);
            }
        }
    }

    const resetFilter = () => {
        setPriceFrom(0);
        setPriceTo(0);
        setItemNotFound(false)
        setFilteredProducts([]);
    }

    const openSidebar = () => {
        if (!sidebar){
            setSidebar(true);
            setBackdrop(true);
        }
    }

    const closeSidebar = () => {
        if (sidebar){
            setSidebar(false);
            setBackdrop(false)
        }
        else {
            setBackdrop(false);
        }
    }

    let displayStatus = <div className={styles.statusMsgContainer}>
        <h2 className={styles.statusMsgHeader}>Something went wrong</h2>
        <p className={styles.statusMsgP}>Please try again</p>
        <button className={styles.statusMsgBtn} onClick={() => {
            setModal(false);
        }}>Ok</button>
    </div>

    if (status === 'database error'){
        displayStatus = <div className={styles.statusMsgContainer}>
            <h2 className={styles.statusMsgHeader}>Database error</h2>
            <p className={styles.statusMsgP}>Please try again or contact the admin</p>
            <button className={styles.statusMsgBtn} onClick={() => {
            setError(false);
            setStatus('');
            setModal(false);
        }}>Ok</button>
        </div>
    }

    return (
        <>
        <Backdrop backdrop={ backdrop } toggleBackdrop={ closeSidebar }/>
        <Modal modal={modal}>
            {displayStatus}
        </Modal>
        <div className={styles.productsListMain}>
            <div className={styles.productsListContainer}>
                <div className={styles.sidebarSwitcher} onClick={ openSidebar }>
                    <p className={styles.sidebarSwitcherP}>Show Sidebar</p>
                </div>
                <div className={ sidebar ? `${styles.sidebarContainer} ${styles.on}` : styles.sidebarContainer}>
                    <div className={styles.categoryType}>
                        <h2 className={styles.categoryH2}>Categories</h2>
                        <ul className={styles.sidebarLists}>
                            <a href="/products/spaceSaverItem" className={styles.sidebarLink}><li className={params.productId === 'spaceSaverItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Space Saver</li></a>
                            <a href="/products/bluetoothHeadphoneItem" className={styles.sidebarLink}><li className={params.productId === 'bluetoothHeadphoneItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Bluetooth Headphone</li></a>
                            <a href="/products/fashionWalletItem" className={styles.sidebarLink}><li className={params.productId === 'fashionWalletItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Fashion Wallet</li></a>
                            <a href="/products/smartWatchItem" className={styles.sidebarLink}><li className={params.productId === 'smartWatchItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Smart Watch</li></a>
                            <a href="/products/homeAndLivingItem" className={styles.sidebarLink}><li className={params.productId === 'homeAndLivingItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Home and Living</li></a>
                            <a href="/products/electronicsItem" className={styles.sidebarLink}><li className={params.productId === 'electronicsItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Electronics</li></a>
                            <a href="/products/healthAndBeautyItem" className={styles.sidebarLink}><li className={params.productId === 'healthAndBeautyItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Health and Beauty</li></a>
                            <a href="/products/fashionItem" className={styles.sidebarLink}><li className={params.productId === 'fashionItem' ? `${styles.sidebarList} ${styles.active}` : styles.sidebarList}>Fashion</li></a>
                        </ul>
                    </div>

                    <div className={styles.categoryType} id={styles.categoryType2}>
                        <h2 className={styles.categoryH2}>Price Range</h2>
                        <p className={styles.rangeLabel}>From: {priceFrom}</p>
                        <Slider value={priceFrom}
                                min={0}
                                max={5000}
                                className="slider"
                                onChange={(value) => setPriceFrom(value)}/>
                        <p className={styles.rangeLabel}>To: {priceTo}</p>
                        <Slider value={priceTo}
                                min={0}
                                max={5000}
                                className="slider"
                                onChange={(value) => setPriceTo(value)}/>
                        <button disabled={!priceFrom || !priceTo}
                                className={styles.filterBtn}
                                onClick={ resetFilter }>Reset</button>
                        <button disabled={(!priceFrom || !priceTo) || (priceFrom >= priceTo)}
                                className={styles.filterBtn}
                                onClick={filterItem}>Apply</button>
                    </div>
                </div>

                <div className={styles.ProductsLists}>
                    <h2 className={styles.productHeader}>{products.length ? products[0].category : null}</h2>
                    <div className={styles.productsDisplayContainer}>
                        {defaultView}
                    </div>
                </div>
            </div>

            <ReactPaginate breakLabel="..."
                           nextLabel=">"
                           className={styles.paginationContainer}
                           pageClassName={styles.paginationItem}
                           previousClassName={styles.previousItem}
                           nextClassName={styles.nextItem}
                           activeClassName={styles.paginationActive}
                           disabledClassName={styles.paginationDisabled}
                           onPageChange={handlePageClick}
                           pageRangeDisplayed={5}
                           pageCount={itemNotFound ? 0 : pageCount}
                           previousLabel="<"
                           renderOnZeroPageCount={null}/>
        </div>
        </>
    )
}

export default ProductsList;
