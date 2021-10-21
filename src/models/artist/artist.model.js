const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ArtistSchema = new Schema({
  name: { type: String },
  style: { type: String },
})


ArtistSchema.virtual('albums', {
  ref: 'album',
  localField: '_id',
  foreignField: 'album.artist',
})

mongoose.model("artist", ArtistSchema)
