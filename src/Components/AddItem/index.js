import React, { useState } from 'react'
import styles from './AddItem.module.css'

export default function AddItem(props) {
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionErr, setDescriptionErr] = useState('')
    const [price, setPrice] = useState('')
    const [priceErr, setPriceErr] = useState(null)

    const handleChange = (e, type) => {
        switch (type) {
            case 'name':
                setName(e.target.value)
                if (nameErr) setNameErr('')
                break;
            case 'description':
                setDescription(e.target.value)
                if (descriptionErr) setDescriptionErr('')
                break;
            case 'price':
                setPrice(e.target.value)
                if (priceErr) setPriceErr(null)
                break;

        }
    }

    const handleAdd = () => {
        let number =/^[0-9]*[.]?[0-9]+$/
        if (!name) {
            setNameErr('Enter the name')
            return
        }
        if (!description) {
            setDescriptionErr('Enter the description')
            return
        }
        console.log(typeof parseInt(price), 'price')
        if ( !number.test(price) || price < 0 ) {
            setPriceErr('Enter a correct price')
            return
        }
        let item = {
            name: name,
            description: description,
            price: price
        }

        props.addItem(item)
        setName('')
        setDescription('')
        setPrice('')
    }

    return (
        <>
            <div className={styles.flex}>
                <div>
                    {nameErr && <div className={styles.err}>{nameErr}</div>}
                    <input value={name} placeholder='Name of Item' onChange={(e) => handleChange(e, 'name')} />
                </div>
                <div>
                    {descriptionErr && <div className={styles.err}>{descriptionErr}</div>}
                    <input value={description} placeholder='Description' onChange={(e) => handleChange(e, 'description')} />
                </div>
                <div>
                    {priceErr && <div className={styles.err}>{priceErr}</div>}
                    <input value={price} placeholder='Price' onChange={(e) => handleChange(e, 'price')} />
                </div>
                <button className={styles.btn} onClick={handleAdd}>+</button>
            </div>
        </>

    )
}