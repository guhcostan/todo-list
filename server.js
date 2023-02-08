const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/tmp/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/todo', (req, res) => {
    const db = router.db.getState().todo
    const newTodo = {
        id: req.body.id,
        name: req.body.name,
        itens: [],
        permaLink: 'link/' + req.body.name,
    }
    const newState = [...db, newTodo]
    res.jsonp(newTodo)
    router.db.setState({ todo: newState })
    router.db.write()
})

server.get('/todo/itens/:id', (req, res) => {
    const db = router.db.getState()
    res.jsonp(db.todo.find((t) => t.id.toString() === req.params.id).itens)
})

server.post('/todo/itens/:id', (req, res) => {
    const db = router.db.getState()
    let newState = db.todo
    let index = db.todo.findIndex((t) => t.id.toString() === req.params.id)
    newState[index].itens.push(req.body)
    res.jsonp(newState)
    router.db.setState({ todo: newState })
    router.db.write()
})

server.put('/todo/itens/:id/:idItem', (req, res) => {
    const db = router.db.getState()
    let newState = db.todo
    let todoIndex = newState.findIndex((t) => t.id.toString() === req.params.id)
    let index = newState[todoIndex].itens.findIndex(
        (i) => i.id.toString() === req.params.idItem
    )
    newState[todoIndex].itens[index] = req.body
    res.jsonp(newState)
    router.db.setState({ todo: newState })
    router.db.write()
})

server.delete('/todo/itens/:id/:idItem', (req, res) => {
    const db = router.db.getState()
    let newState = db.todo
    let todoIndex = newState.findIndex((t) => t.id.toString() === req.params.id)
    let index = newState[todoIndex].itens.findIndex(
        (i) => i.id.toString() === req.params.idItem
    )
    newState[todoIndex].itens[index] = null
    newState[todoIndex].itens = newState[todoIndex].itens.filter((i) => i)
    res.jsonp(newState)
    router.db.setState({ todo: newState })
    router.db.write()
})

server.use(router)
server.listen(4000, () => {
    console.log('JSON Server is running')
})
