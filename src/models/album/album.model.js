const mongoose = require("mongoose")
const Schema = mongoose.Schema

let AlbumSchema = new Schema({
  title: { type: String },
  content: { type: String },
  artist: { type: Schema.Types.ObjectId, ref: "artist", required: true },
  style: { type: String },
})

mongoose.model("album", AlbumSchema)
