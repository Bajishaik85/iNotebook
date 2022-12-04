const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.DATABASE


const connectToMongo = () => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("DB Connected")).catch((error)=>console.log(error.message));
}


module.exports = connectToMongo;