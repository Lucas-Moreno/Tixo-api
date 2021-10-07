const mongoose = require("mongoose")


let userSchema = new mongoose.Schema({
  pseudo: {
    type: String
  },
  mail: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
})


mongoose.model('User', userSchema)
