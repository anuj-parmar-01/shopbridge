import React ,{useState} from 'react'
import styles from './EditBox.module.css'

export default function EditBoxPopUp(props){
    const [name, setName] = useState(props.item.name)
    const [description, setDescription] = useState(props.item.description)
    const [price, setPrice] = useState(props.item.price)
    
const handleSubmit = () => {
    let obj ={
        name:name,
        description: description,
        price: price
    }
    props.handleEdit(obj)
}

    const handleChange = (e,type) => {
        switch (type) {
            case 'name':
                 setName(e.target.value)
               
                break;
            case 'description':
                setDescription(e.target.value)
               
                break;
            case 'price':
                setPrice(e.target.value)
              
                break;

        }
    }

    return(
        <>
        <div className={styles.outer_container}>
        <div className={styles.Popup_container}>
        <h1>Edit PopUp</h1>
        <button className={styles.close} onClick={()=> props.setedit(false)}>Close</button>
        <div className={styles.flex}>
          Name <input value={name} onChange={(e)=> handleChange(e,'name')} />
          Description
        <input value={description} onChange={(e)=> handleChange(e,'description')}/>
        Price
        <input value={price} onChange={(e)=> handleChange(e,'price')}/>
        <button onClick={handleSubmit}>submit</button>
        </div>
        
        </div>
        </div>
      
       
        </>
    )

}