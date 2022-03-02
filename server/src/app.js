require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const { Server } = require('socket.io')
const { handleMessageReceived } = require('./socket/socket')

const {
  bodyParserHandler,
  genericErrorHandler,
  notFoundHandler,
} = require('./middlewares/errorHandlers')

const json = require('./middlewares/json')

const apiRoute = require('./routes')
const { chatValidator } = require('./middlewares/validators/chat')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Start the express app
const app = express()

// Handle cors error
app.use(cors())

// Create http server
const server = http.createServer(app)

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

sequenceNumberByClient = new Map()

// Listen for chat messages from socket.io
io.on('connection', (socket) => {
  console.log('a user connected', socket.handshake.auth.userId)

  sequenceNumberByClient.set(socket.handshake.auth.userId, socket)

  socket.on('disconnect', () => console.log('user disconnected'))

  socket.on('message', (data, callBack) => {
    chatValidator(
      {
        sender_id: data.sender.id,
        receiver_id: data.receiver.id,
        message: data.message,
      },
      () =>
        handleMessageReceived(
          socket,
          io,
          {
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
          },
          callBack
        ),
      callBack
    )
  })
})

// Parse json bodies (as sent by API clients)
app.use(express.json())

// Handle json errors
app.use(bodyParserHandler)
app.use(json)

// Set up api for use
app.use('/api', apiRoute)

// Error middlewares to handle errors
app.use(genericErrorHandler)
app.use(notFoundHandler)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  // Start listening on the port specified in the .env file
  server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
  })
})
