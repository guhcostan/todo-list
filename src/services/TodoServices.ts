import axios from "axios";
import {Item, Todo} from "../models/Todo";

const getTodos = async () => {
    const todosData = await axios.get(process.env.REACT_APP_API_URL + "/todo")
    return todosData.data
}
const getTodoByName = async (tableName: string) => {
    const todosData = await axios.get(process.env.REACT_APP_API_URL + "/todo/?name=" + tableName)
    return todosData.data[0]
}
const getTodo = async (id: number) => {
    return await axios.get(process.env.REACT_APP_API_URL + "/todo/" + id)
}

const deleteTodo = (tableId: number) => {
    return axios.delete(process.env.REACT_APP_API_URL + "/todo/" + tableId)
}

const createTodo = (tableId: number, tableName: string) => {
    return axios.post(process.env.REACT_APP_API_URL + "/todo/", {
        name: tableName,
        id: tableId
    })
}

const createItem = (tableId: number, todo: Todo, newItem: string) => {
    return axios.post(process.env.REACT_APP_API_URL + "/todo/itens/" + tableId, {id: Math.random(), item: newItem})
}

const transformItemToSubItem = (tableId: number, item: Item) => {
    return axios.put(process.env.REACT_APP_API_URL + "/todo/itens/" + tableId + "/" + item.id, {
        ...item,
        itens: [
            item
        ],
        item: null
    })
}

const moveToTop = (tableId: number, item: Item, itemTop: Item) => {
    return axios.put(process.env.REACT_APP_API_URL + "/todo/itens/" + tableId + "/" + itemTop.id, {
        ...itemTop,
        item: item.item,
        itens: null
    })
}

const editItem = (tableId: number, item: Item, newItemName: string) => {
    return axios.put(process.env.REACT_APP_API_URL + "/todo/itens/" + tableId + "/" + item.id, {
        ...item,
        item: newItemName
    })
}

const deleteItem = (tableId: number, itemId: number) => {
    return axios.delete(process.env.REACT_APP_API_URL + "/todo/itens/"+ tableId + "/" + itemId)
}

const TodoServices = {
    getTodos,
    getTodo,
    getTodoByName,
    createTodo,
    deleteTodo,
    deleteItem,
    editItem,
    moveToTop,
    transformItemToSubItem,
    createItem
}

export default TodoServices
