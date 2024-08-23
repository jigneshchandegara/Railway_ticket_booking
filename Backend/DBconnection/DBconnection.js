let mongoose = require("mongoose");

const DBconnection = () =>{
    mongoose.connect(process.env.DB_URL).then(() =>{
        console.log("DB Connected successfully");
    }).catch((Error) =>{
        console.log("DB Connection Failed",Error);
    })
}

module.exports = DBconnection