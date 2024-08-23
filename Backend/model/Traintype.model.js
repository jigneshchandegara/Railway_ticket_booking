let mongoose = require("mongoose")

const TraintypeSchema = new mongoose.Schema({
    trainnumber: {
        type: String,
        required: true
    },
    traintypename: {
        type: String,
        required: true
    },
    createby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    }
},
    {
        timestamps: true
    }
)

const Traintype = mongoose.model("Traintype", TraintypeSchema);
module.exports = Traintype;