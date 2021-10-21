const mongoose = require("mongoose")
const User = mongoose.model("user")
const Artist = mongoose.model("artist")

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("_id pseudo mail")
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getUser = async (req, res) => {
  let { id } = req.params
  try {
    const user = await User.findOne({ _id: id })
    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
}

// bcrypt password
const updateUser = async (req, res) => {
  let { id } = req.params
  let { pseudo, mail, password } = req.body
  try {
    await User.findByIdAndUpdate({ _id: id }, { pseudo: pseudo, mail: mail, password: password })
    return res.status(200).json({ message: "user update" })
  } catch (e) {
    return res.status(500).json(e)
  }
}

const deleteUser = async (req, res) => {
  let { id } = req.params
  try {
    await User.remove({ _id: id })
    return res.status(200).json({ message: "user delete" })
  } catch (e) {
    return res.status(500).json(e)
  }
}

const addArtistForUser = async (req, res) => {
  let { idUser, idArtist } = req.params

  try {
    const artist = await Artist.findOne({ _id: idArtist })
    if (artist) {
      await User.findOneAndUpdate({ _id: idUser }, { $push: { artistsFollow: artist } })
    } else {
      return res.status(400).json({ message: "artist not defined" })
    }
    return res.status(200).json({ message: "artist add for user" })
  } catch (e) {
    return res.status(500).json(e)
  }
}

const getAllArtistForUser = async (req, res) => {
  let { id } = req.params

  try {
    const user = await User.findById(id).populate("artistsFollow")
    if (user) {
      let artistFollow = {
        artistFollow: user.artistsFollow,
      }
      return res.status(200).json(artistFollow)
    } else {
      return res.status(400).json({ message: "user not defined" })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json(e)
  }
}

module.exports = { getAllUser, getUser, updateUser, deleteUser, addArtistForUser, getAllArtistForUser }
