const express = require('express')
const { faker } = require('@faker-js/faker');

const app = express()
const port = 3000

app.use(express.json())

let users = []

function init() {
    for (let i = 0; i<15; i++) {
        users.push({
            id: faker.number.int({ min: 0, max: 200 }),
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            avatarUrl: faker.image.avatar(),
            active: true
        })
    }
}

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (request, response) => {
    console.log(`usuario: ${request.params.id}`)

    let result = users.filter(user => user.id === parseInt(request.params.id))

    if (result.length === 1) {
        response.send(result[0])
    } else {
        response.sendStatus(404)
    }
})

app.put('/users/:id', (request, response) => {
    console.log(`usuario: ${request.params.id}`)

    let result = users.filter(user => user.id === parseInt(request.params.id))

    if (result.length === 1) {
        // response.send(result[0])
        // result = request.body
        result[0].name = request.body.name
        result[0].surname = request.body.surname
        result[0].avatarUrl = request.body.avatarUrl
        result[0].active = request.body.active
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
})

app.post('/users', (req, res) => {
    let user = req.body
    console.log(`usuario ${JSON.stringify(user)}`)
    users.push(user)
    res.sendStatus(201)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    init()
    console.log(`Example app listening on port ${port}`)
})