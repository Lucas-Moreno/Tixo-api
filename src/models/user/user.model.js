const mongoose = require("mongoose")

let UserSchema = new mongoose.Schema({
  pseudo: {type: String},
  mail: {type: String, unique: true},
  password: {type: String},
})

mongoose.model("user", UserSchema)
