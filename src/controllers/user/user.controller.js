const mongoose = require("mongoose")
const User = mongoose.model("user")

const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json(err)
  }
}
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    return res.status(200).json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
}

module.exports = { getAllUser, getUser }
