import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar, faAngleDown, faAngleUp, faEye, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './productsDetails.module.css';
import AdditionalDetails from "./AdditionalDetails/additionalDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextApi } from "../../../App";
import { addToCart, matchRoute } from "../../Others/HelperFunction/helperFunction";

const ProductsDetails = () => {

    const context = useContext(ContextApi);

    const relatedItemRef = useRef(null);

    const otherItemRef = useRef(null);

    const { productId, productDetails } = useParams();

    const [item, setItem] = useState([]);

    const [addImg, setAddImg] = useState(0);

    const [relatedItem, setRelatedItem] = useState([]);

    const [otherItem, setOtherItem] = useState([]);

    const [quantity, setQuantity] = useState(0);

    const cartItemStorage = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : null;

    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};

    useEffect(() => {
        if (context.data){
            //getting all product name
            const mainData = Object.keys(context.data);
            //separting the array where main item resides
            const displayData = context.data[productId];
            //finding the index of the main item to display
            const mainDataIndex = mainData.indexOf(productId);
            //removing the product name from the array so we can use rest of the products as other items
            if (mainDataIndex > -1) {
                mainData.splice(mainDataIndex, 1);
            }
            //separating the main product and related products
            const relatedItem = [];
            displayData.forEach(element => {
                if (element.name === productDetails){
                    setItem(element)
                }
                else {
                    relatedItem.push(element);
                }
            });
            //setting the other products
            const otherItem = mainData.map(item => {
                return context.data[item][0];
            })
            setRelatedItem(relatedItem);
            setOtherItem(otherItem.flat());
        }
    }, [context.data]);

    let displayProduct = <div className={styles.defaultProductContainer}>
        <div className={styles.defaultImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
        </div>

        <div className={styles.defaultSidePanel}>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.sidePanelItem}></div>
            <div className={styles.cart}></div>
            <div className={styles.details}></div>
        </div>
    </div>

    if (Object.keys(item).length){
        displayProduct = <div className={styles.displayProductContainer}>
        <div className={styles.displayProductImgsContainer}>
            <div className={styles.displayProductImgContainer}>
                <img src={item.img[addImg]} alt={item.name} className={styles.displayProductImg}/>
            </div>
            <div className={styles.additionalImgsContainer}>
                {item.img.map((img, index) => <div key={index}
                                                      className={ addImg === index ? `${styles.additionalImgContainer} ${styles.addImgActive}` : styles.additionalImgContainer}
                                                      onClick={() => setAddImg(index)}>
                    <img src={img} alt={item.name} className={styles.additionalImg}/>
                </div>)}
            </div>
        </div>

        <div className={styles.sidePanelContainer}>
            <div className={styles.productsDetails} style={{fontSize: '20px'}}>{item.name}</div>
            <div className={styles.ratingContainer}>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
                <FontAwesomeIcon icon={faStar} className={styles.star}/>
            </div>

            <div className={styles.watchListContainer}>
                <FontAwesomeIcon icon={faEye} className={styles.watchListIcon}/>
                <p className={styles.watchListP}>10 customers are watching this products</p>
            </div>

            <p className={styles.productsDetails}>&#2547;{item.price}</p>
            <div className={styles.availablity}>Item Available: {item.quantity ? item.quantity : 1}</div>
            <div className={styles.productDetailsContainer}>
                <h2 className={styles.productHeader}>Details</h2>
                <p className={styles.productDetailsP}>{item.details ? item.details : "Elevate your fashion game with our men's kurta collection. Made from premium quality fabrics, our kurtas are designed to provide maximum comfort and durability. With a wide range of colors, patterns, and designs to choose from, Experience the perfect blend of traditional elegance and modern style."}</p>
            </div>

            <div className={styles.quantityContainer}>
                <p className={styles.quantityLabel}>Quantity</p>
                <div className={styles.quantity}>
                    <button disabled={!quantity} className={styles.quantityBtn} onClick={() => setQuantity(quantity - 1)}>
                        <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleDown} className={styles.angle}/></span>
                    </button>
                    <div className={styles.quantityAmount}>{quantity}</div>
                    <button disabled={item.quantity ? quantity >= item.quantity : false} className={styles.quantityBtn} onClick={() => setQuantity(quantity + 1)}>
                        <span className={styles.iconContainer}><FontAwesomeIcon icon={faAngleUp} className={styles.angle}/></span>
                    </button>
                </div>
            </div>
            <div className={styles.productDetailsBtnGroup}>
                <button disabled={!quantity}
                        className={styles.productDetailsBtn}
                        id={styles.cartBtn}
                        onClick={(e) => addToCart(e, context, cartItemStorage, item, quantity) }
                        >Add to Cart</button>
                <button className={styles.productDetailsBtn}>+ Wishlist</button>
            </div>
        </div>
    </div>
    }

    let relatedProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
    </div>

    let otherProducts = <div className={styles.relatedProductsContainer}>
        <h2 className={styles.defaultHeadings}>No Products Found</h2>
        </div>

    if (relatedItem.length){
        relatedProducts = relatedItem.map(products => {
            return <div key={products._id} className={styles.relatedProduct}>
                <a href={`/products/${matchRoute(products.category)}/${products.name}`} className={styles.relatedProductLink}>
                    <div className={styles.relatedProductImgContainer}>
                        <img src={products.img[0]} alt={products.name} className={styles.relatedProductImg}/>
                    </div>
                    <div className={styles.relatedProductDetailsContainer}>
                        <h3 className={styles.relatedProductDetailsHeader}>{products.name}</h3>
                        <p className={styles.relatedProductDetailsP}>&#2547;{products.price}</p>
                    </div>
                </a>
            </div>
        })

        otherProducts = otherItem.map(products => {
            return <div key={products._id} className={styles.relatedProduct}>
                <a href={`/products/${matchRoute(products.category)}/${products.name}`} className={styles.relatedProductLink}>
                    <div className={styles.relatedProductImgContainer}>
                        <img src={products.img[0]} alt={products.name} className={styles.relatedProductImg}/>
                    </div>
                    <div className={styles.relatedProductDetailsContainer}>
                        <h3 className={styles.relatedProductDetailsHeader}>{products.name}</h3>
                        <p className={styles.relatedProductDetailsP}>&#2547;{products.price}</p>
                    </div>
                </a>
            </div>
        })
    }

    return (
        <>
        <ToastContainer autoClose={1000}
                        limit={5}/>
        <div className={styles.productsDetailsMain}>
            <section className={styles.productsDetailsContainer}>
                {displayProduct}
            </section>
            <AdditionalDetails />

            <section className={styles.relatedProductsMain}>
                <h2 className={styles.relatedProductsHeader}>Related Products</h2>
                <div className={styles.relatedItemsItemContainer} ref={relatedItemRef}>
                    {relatedProducts}
                </div>
                <div className={styles.pagintaionContainer}>
                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => relatedItemRef.current.scrollBy(-270, 0)}>
                        <FontAwesomeIcon icon={faAngleLeft} className={styles.angleIcon}/>
                    </button>

                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => relatedItemRef.current.scrollBy(270, 0)}>
                        <FontAwesomeIcon icon={faAngleRight} className={styles.angleIcon}/>
                    </button>
                </div>
            </section>

            <section className={styles.relatedProductsMain}>
                <h2 className={styles.relatedProductsHeader}>Customers Also Viewed</h2>
                <div className={styles.relatedItemsItemContainer} ref={otherItemRef}>
                    {otherProducts}
                </div>
                <div className={styles.pagintaionContainer}>
                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => otherItemRef.current.scrollBy(-270, 0)}>
                        <FontAwesomeIcon icon={faAngleLeft} className={styles.angleIcon}/>
                    </button>

                    <button disabled={!relatedItem.length} className={styles.angleIconContainer} onClick={() => otherItemRef.current.scrollBy(270, 0)}>
                        <FontAwesomeIcon icon={faAngleRight} className={styles.angleIcon}/>
                    </button>
                </div>
            </section>
        </div>
        </>
    )
}

export default ProductsDetails;
