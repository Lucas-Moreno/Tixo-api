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

const searchArtist = async (req, res) => {
  const { name } = req.query

  const filter = {}

  if (name) {
    filter.name = { $regex: `${name}`, $options: "i" }
  }

  try {
    const artist = await Artist.find(filter)
    return res.status(200).json(artist)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

module.exports = { createArtist, searchArtist }
