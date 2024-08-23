const mongoose = require("mongoose");

const TrainSchema = new mongoose.Schema({
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Traintype"
    },
    classes: [
        {
            classname: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Classtype"
            },
        
        }
    ],
    createby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }

}, { timestamps: true })

const Train = mongoose.model("Train", TrainSchema);
module.exports = Train;