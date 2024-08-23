let mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
    classname: {
        type: String,
        required: true
    },
    setnumber: {
        type: String,
        required: true
    },
    createby:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    }
},
    {
        timestamps: true
    }
)


let Classtype = mongoose.model("Classtype",ClassSchema);
module.exports = Classtype; 