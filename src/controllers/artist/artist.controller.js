const mongoose = require("mongoose")
const Artist = mongoose.model("artist")

const createArtist = async (req, res) => {
  let { name, style } = req.body

  let artist = new Artist({
    name: name,
    style: style,
  })

  try {
    await artist.save()
    return res.status(201).json({ message: "create artist" })
  } catch (e) {
    return res.status(400).json({ message: "error create artist" })
  }
}

module.exports = { createArtist }
