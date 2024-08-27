const mongoose = require('mongoose');
const URL = 'mongodb+srv://dannyyoo714:Jesuschrist8823!@mern-ai.84gan.mongodb.net/MERN-AI?retryWrites=true&w=majority&appName=MERN-AI'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URL)
        console.log(`Mongoose DB connected...${conn.connection.host}`)
    } catch(error) {
        console.error('Error connection to mongoDB....', error.message)
        process.exit(1)
    }
}

module.exports = connectDB