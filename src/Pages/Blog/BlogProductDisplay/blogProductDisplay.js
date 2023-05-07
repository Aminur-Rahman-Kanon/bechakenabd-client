import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './blogProductDisplay.module.css';
import { ContextApi } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function BlogProductDisplay () {

    const blog = useContext(ContextApi);

    const blogId = useParams().blogId;

    const [blogProduct, setBlogProduct] = useState([]);

    const [picIndex, setPicIndex] = useState(0);

    useEffect(() => {
        if (blog.data !== undefined){
            if (blog.data.hasOwnProperty('blogItem')){
                const product = blog.data['blogItem'].filter(i => i._id === blogId);
                setBlogProduct(product);
            }
        }
    }, [blog.data])

    let displayBlog = <div className={styles.displayBlogItem}>
        <div className={styles.defaultBlogImgContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
        </div>

        <div className={styles.defaultBlogDetailsContainer}>
            <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.spinner} />
        </div>
    </div>

    if (blogProduct.length) {
        displayBlog = <div className={styles.displayBlogItem}>
            <div className={styles.displayBlogImgContainer}>
                <img src={blogProduct[0].img[picIndex]} alt={blogProduct[0].title} className={styles.displayBlogImg} />
                <div className={styles.imgCollectionContainer}>
                    {blogProduct[0].img.map((pic, idx) => {
                        return <div key={idx} className={picIndex === idx ? `${styles.imgCollections} ${styles.imgActive}` : styles.imgCollections} onClick={() => setPicIndex(idx)}>
                            <img src={pic} alt={blogProduct[0].title} className={styles.imgCollection}/>
                        </div>
                    })}
                </div>
            </div>

            <div className={styles.displayBlogDetailsContainer}>
                <h3 className={styles.displayBlogH3}>{blogProduct[0].title}</h3>
                <p className={styles.displayBlogP}>Date: {blogProduct[0].date}</p>
                <div className={styles.detailsContainer}>
                    <p className={styles.displayBlogP}>{blogProduct[0].details}</p>
                </div>
                <Link to="" className={styles.blogLink}>Check Out</Link>
            </div>
        </div>
    }
    return (
        <div className={styles.blogProductDisplayContainer}>
            {displayBlog}
        </div>
    )
}

export default BlogProductDisplay
