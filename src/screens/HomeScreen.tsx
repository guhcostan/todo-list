import styled from 'styled-components'
import TodoServices from '../services/TodoServices'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo } from '../models/Todo'

const Container = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Header = styled.div`
    margin-bottom: 120px;
`

const Footer = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
`

const HomeScreen = () => {
    const navigate = useNavigate()
    const [tableName, setTableName] = useState('')
    const [accessTableName, setAccessTableName] = useState('')
    const [tableId, setTableId] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])

    const updateTodos = () => {
        TodoServices.getTodos().then((result) => setTodos(result))
    }

    useEffect(() => {
        updateTodos()
    }, [])

    return (
        <Container>
            <Header>
                <h1>Bem vindo ao ToDo List</h1>
                <h4>
                    Crie sua tabela e compartilhe com seus companheiros de
                    equipe
                </h4>

                <input
                    type={'number'}
                    placeholder={'Id da tabela'}
                    onChange={(event) => setTableId(event.target.value)}
                />
                <input
                    placeholder={'Codigo da tabela'}
                    onChange={(event) => setTableName(event.target.value)}
                />
                <button
                    onClick={async () => {
                        await TodoServices.createTodo(
                            parseInt(tableId),
                            tableName
                        )
                        await updateTodos()
                    }}
                >
                    Criar nova tabela
                </button>
            </Header>
            <Footer>
                <h6>Já possui tabela? Digite o codigo dela e acesse</h6>
                <input
                    placeholder={'Codigo da tabela'}
                    onChange={(event) => setAccessTableName(event.target.value)}
                />
                <button
                    onClick={() => {
                        navigate('/list/' + accessTableName)
                    }}
                >
                    Acessar
                </button>
                <h6 style={{ color: 'red' }}>
                    Deseja excluir uma tabela já existente? Acesse ela e
                    confirme a exclusão
                </h6>
            </Footer>
            <Footer>
                <h6>Suas Tabelas</h6>
                {todos?.length > 0 && (
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                            {todos.map((todo) => (
                                <tr>
                                    <th>{todo.id}</th>
                                    <th>{todo.name}</th>
                                    <th>
                                        <button
                                            onClick={() => {
                                                navigate('/list/' + todo.name)
                                            }}
                                        >
                                            Acessar
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Footer>
        </Container>
    )
}

export default HomeScreen
