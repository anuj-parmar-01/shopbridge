import React from 'react'
import styles from './SingleItem.module.css'

export default function SingleItem(props) {
    let { item, index } = props;

    return (
        <>
            <div className={styles.card_container}>
                <div>Name : {item.name}</div>
                <div> description: {item.description}</div>
                <div>Price: {item.price}</div>
                <button className={styles.btn} onClick={() => props.editItem(index)}>edit</button>
                <button className={styles.btn} onClick={() => props.deleteitem(index)}>delete</button>
            </div>
        </>
    )
}