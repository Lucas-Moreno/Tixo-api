const mongoose = require("mongoose")
const Album = mongoose.model("album")

const createAlbum = async (req, res) => {
  let { title, content, style } = req.body

  let album = new Album({
    title,
    content,
    style,
  })

  try {
    await album.save()
    return res.status(201).json({ message: "create artist" })
  } catch (e) {
    return res.status(400).json({ message: "error create artist" })
  }
}

module.exports = { createAlbum }
