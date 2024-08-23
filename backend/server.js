const express = require('express')

const app = express()
const PORT = process.env.PORT || 4000;

// ! START the SERVER
app.listen(PORT,() => {
    console.log(`SERVER LISTENING ON PORT: ${PORT}.......`)
})