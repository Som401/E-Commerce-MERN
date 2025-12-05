const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`MongoDB Atlas Database connected with HOST: ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
};

module.exports = connectDatabase;
