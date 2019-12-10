const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http)
let users = []
let message = []
let index = 0

io.on('connection', socket => {

    socket.emit('loggedIn', ()=> {
        users: users.map(s => s.username)
        messages: messages
    })
    // new user
    socket.on('newuser', () => {
        console.log(`${username} has arrived at the party.`)
        socket.username = username
        users.push(socket)

        io.emit('userOnline', socket.username)
    })

    socket.on('msg', () => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg
        }

        messages.push(message)

        io.emit('msg', message)

        index++
    })

    // disconnect
    socket.emit('disconnect', () => {
        console.log(`${socket.username} has left the party.`)
        io.emit('userLeft', socket.username)
        users.splice(users.indexOf(socket), 1)
    })
})

http.listen(process.env.PORT || 3000, () => { // invece di process.env.PORT || 3000 andrebbe bene anche solo 3000
    console.log('Listening on port', process.env.PORT || 3000)
})