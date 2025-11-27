const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// Set strictQuery to false to suppress warning
mongoose.set('strictQuery', false);

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Mongoose Connected to: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;
