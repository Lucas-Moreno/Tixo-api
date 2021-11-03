const mongoose = require("mongoose")
const Schema = mongoose.Schema

let ArtistSchema = new Schema({
  name: { type: String }
})


ArtistSchema.virtual('albums', {
  ref: 'album',
  localField: '_id',
  foreignField: 'artist',
})

mongoose.model("artist", ArtistSchema)
