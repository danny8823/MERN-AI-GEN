const express = require('express');
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 3000;
// ! MIDDLEWARES
app.use(express.json()) // PASS INCOMING DATA

// ! DATABASE CONNECT
connectDB()

// ! ROUTES
app.use('/api/v1/users', usersRouter)

// ! ERROR HANDLER MIDDLEWARE
app.use(errorHandler)
// ! START the SERVER
app.listen(PORT,() => {
    console.log(`SERVER LISTENING ON PORT: ${PORT}.......`)
})