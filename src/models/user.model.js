const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String
    },
    age:{
        type: String
    },
    gender:{
        type: String,
        validate(value){ // Will run on creating new document only, yu need to enable it to make it run on update too - runValidators()
            if(!["male", "female", "others"]){
                throw new Error("Gender data is not valid")
            }
        }
    }
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User