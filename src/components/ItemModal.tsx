import {useState} from "react";

const ItemModal = ({onAddPress, item}: {onAddPress: (itemName: string) => void, item?: string}) => {
    const [itemName, setItemName] = useState('')
    return <div>
        <input defaultValue={item} onChange={event => setItemName(event.target.value)}/>
        <button onClick={() => onAddPress(itemName)}>{(item ? 'Editar' : 'Adicionar' )+ ' Item'}</button>
    </div>
}

export default ItemModal
