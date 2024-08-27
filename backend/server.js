const express = require('express');
const cookieParser = require('cookie-parser')
const usersRouter = require('./routes/usersRouter');
const connectDB = require('./utils/connectDB');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express()
require("dotenv").config()

const PORT = process.env.PORT || 3000;

// ! MIDDLEWARES
app.use(express.json()) // PASS INCOMING DATA
app.use(cookieParser()) // PASS THE COOKIE AUTOMATICALLY

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