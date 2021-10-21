const mongoose = require("mongoose")
const Schema = mongoose.Schema

let UserSchema = new Schema({
  pseudo: { type: String },
  mail: { type: String, unique: true, required: [true, "L'email est requis"] },
  password: { type: String },
  artistsFollow: [
    {
      type: Schema.Types.ObjectId,
      ref: "artist",
    },
  ],
})

mongoose.model("user", UserSchema)
