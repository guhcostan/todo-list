import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Item, Todo} from "../models/Todo";
import TodoServices from "../services/TodoServices";
import Modal from 'react-modal';
import ItemModal from "../components/ItemModal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const TableScreen = () => {
    const params = useParams()
    console.log(params)
    const [currentTable, setTable] = useState<Todo | undefined>()
    const [modalOpen, setModalOpen] = useState(false)
    const [editItem, setEditItem] = useState<Item | undefined>()

    const colors = ['red', 'green', 'blue']

    const updateTable = async () => {
        if (params.tableName) {
            const response = await TodoServices.getTodoByName(params.tableName)
            if (response) {
                setTable(response)
            } else {
                await TodoServices.createTodo(Math.random(), params.tableName)
                await updateTable()
            }
        }
    }

    useEffect(() => {
        if (params.tableName) {
            updateTable()
        }
    }, [])

    const renderItem = (item: Item, index: number) => {
        return <tbody>
        <tr>
            <th>
                {item.order}
            </th>
            <th>
                {item.item ? item.item : renderSubItens(item, item.itens, index + 1)}
            </th>
            <th>
                {!item?.itens?.length && <button onClick={async () => {
                    if (currentTable) {
                        await TodoServices.transformItemToSubItem(currentTable.id, item)
                        await updateTable()
                    }
                }
                }>Transform in subitem</button>}
                <button onClick={() => {
                    setEditItem(item)
                    setModalOpen(true)
                }
                }>Edit
                </button>
                <button onClick={async () => {
                    if (currentTable) {
                        await TodoServices.deleteItem(currentTable.id, item.id)
                        await updateTable()
                    }
                }
                }>Delete
                </button>
            </th>
        </tr>
        </tbody>
    }

    const renderSubItem = (item: Item, index: number, itemTop: Item,) => {
        return <tbody>
        <tr>
            <th>
                {item.order}
            </th>
            <th>
                {item.item ? item.item : renderSubItens(item, item.itens, index + 1)}
            </th>
            <th>
                <button onClick={async () => {
                    if (currentTable) {
                        await TodoServices.moveToTop(currentTable.id, item, itemTop)
                        await updateTable()
                    }
                }}>Move Top
                </button>
            </th>
        </tr>
        </tbody>
    }

    const renderTableHeader = () => <tbody>
    <tr>
        <th>
            Order
        </th>
        <th>
            Item/Itens
        </th>
        <th>
            Actions
        </th>
    </tr>
    </tbody>
    const renderTableItens = (item: Item | Todo, itens: Item[], index: number) => {
        console.log("FOI", item.itens)
        return <table style={{background: colors[index], marginLeft: index * 32}}>
            {renderTableHeader()}
            {itens.map(item => renderItem(item, index + 1))}
        </table>
    }
    const renderSubItens = (item: Item, itens: Item[], index: number) => {
        return <table style={{background: colors[index], marginLeft: index * 32}}>
            {renderTableHeader()}
            {itens.map(itemChildren => renderSubItem(itemChildren, index + 1, item))}
        </table>
    }

    return currentTable ? <div>
        <div>Código da tabela: #{currentTable.name}</div>

        <button onClick={() => {
            setModalOpen(true)
        }
        }>Add Item
        </button>
        {currentTable?.itens && renderTableItens(currentTable, currentTable?.itens, 0)}
        <button onClick={() =>
            TodoServices.deleteTodo(currentTable.id)}>Deletar tabela
        </button>
        <Modal
            onRequestClose={() => setModalOpen(false)} style={customStyles} isOpen={modalOpen}>
            <ItemModal item={editItem?.item} onAddPress={async (itemName) => {
                if (currentTable) {
                    if (editItem) {
                        await TodoServices.editItem(currentTable.id, editItem, itemName)
                        setEditItem(undefined)
                    } else {
                        await TodoServices.createItem(currentTable.id, currentTable, itemName)
                    }
                    await updateTable()
                    setModalOpen(false)
                }
            }
            }/></Modal>
    </div> : <div></div>
}

export default TableScreen
