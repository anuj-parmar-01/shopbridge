import React, { useEffect, useState } from 'react'
import SingleItem from '../SingleItem'
import AddItem from '../AddItem'
import styles from './ItemsList.module.css'
import EditBoxPopUp from '../EditBox'
import ReactDOM from 'react-dom'

export default function ItemsList() {
    const [inventory, setInventory] = useState([
        { name: '1', description: 'item 1', price: 100 },
        { name: '2', description: 'item 2', price: 200 },
        { name: '3', description: 'item 3', price: 300 },
        { name: '4', description: 'item 4', price: 400 },
        { name: '5', description: 'item 5', price: 500 }
    ])

    const [edit, setEdit] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    //this function is working as an interface for POST request 
    const postRequestAddItem = (item) => {
        let newInventory = [item, ...inventory]
        localStorage.setItem('inventory', JSON.stringify(newInventory))
    }

    //this function is working as an interface for DELETE request 
    const deleteRequestRemoveItem = (i) => {
        let newInventory = [...inventory];
        newInventory.splice(i, 1)
        localStorage.setItem('inventory', JSON.stringify(newInventory))
    }

    //this function is working as an interface for GET request
    const getRequestRetrieveInventory = () => {
        let Inventory = localStorage.getItem('inventory');
        return Inventory
    }

    //this function is working as an interface for PUT request
    const putRequestEditInventory = (obj) => {
        let newInventory = inventory.map((item, i) => {
            if (selectedItem === i) {
                return { ...item, ...obj }
            } else return item
        })
        localStorage.setItem('inventory', JSON.stringify(newInventory))
    }

    const getInventory = () => {
        //get list of inventory from backend
        let inventory = getRequestRetrieveInventory()
        setInventory(JSON.parse(inventory))
    }

    const deleteItem = (i) => {
        //send delete request to backend
        deleteRequestRemoveItem(i)
        getInventory()
    }

    const addItem = async (item) => {
        //send a post request to add new item in the inventory
        postRequestAddItem(item)
        getInventory()
    }

    const editableItem = (i) => {
        setEdit(true)
        setSelectedItem(i)
    }

    const handleEdit = (obj) => {
        //send PUT request to backend
        putRequestEditInventory(obj)
        setEdit(false)
        getInventory()
    }

    useEffect(() => {
        //after refresh , data will be fetched from backend
        let newInventory = localStorage.getItem('inventory')
        if (JSON.parse(newInventory)) {
            setInventory(JSON.parse(newInventory))
        }
    }, [])

    return (
        <>
            <AddItem addItem={addItem} />
            {edit && ReactDOM.createPortal(
                <EditBoxPopUp
                    item={inventory[selectedItem]}
                    handleEdit={handleEdit}
                    setedit={setEdit}
                />, document.getElementById('root'))}

            {inventory.length > 0 &&
                <div className={styles.flex}>
                    {inventory.map((item, i) => {
                        return <SingleItem
                            editItem={editableItem}
                            key={i}
                            deleteitem={deleteItem}
                            item={item}
                            index={i} />
                    })}
                </div>
            }
        </>
    )
}