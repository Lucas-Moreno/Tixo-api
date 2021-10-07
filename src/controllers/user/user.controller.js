const mongoose = require("mongoose")
const User = mongoose.model("User")

const getAllUser = async (req, res) => {
  User.find((err, doc) => {
    if (!err) return res.status(200).json(doc)
    else {
      return res.status(500).json(err)
    }
  })
}
const getUser = async (req, res) => {
  User.findOne({ _id: req.params.id }, (err, doc) => {
    if (!err) return res.status(200).json(doc)
    else {
      return res.status(500).json(err)
    }
  })
}

module.exports = { getAllUser, getUser }
