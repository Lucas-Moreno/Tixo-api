const mongoose = require("mongoose")
const User = mongoose.model("User")
var bcrypt = require("bcrypt")

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

const register = async (req, res) => {
  let pseudo = req.body.pseudo
  let mail = req.body.mail
  let password = req.body.password

  if (!pseudo || !mail || !password) {
    return res.status(400).json({ error: "missing parameters" })
  }

  bcrypt.hash(password, 3, function (err, hash) {
    let user = new User({
      pseudo: pseudo,
      mail: mail,
      password: hash,
    })

    try {
      user.save((err, doc) => {
        if (!err) {
          return res.status(201).json({ message: "create" })
        }
        return res.status(400).json({ message: "error create new record" })
      })
    } catch (e) {
      return res.status(500).json(e)
    }
  })
}

const login = async (req, res) => {
  let mail = req.body.mail
  let password = req.body.password

  if (!password || !mail) {
    return res.status(400).json({ error: "missing parameters" })
  }

  User.findOne({ mail: mail })
    .then((userFound) => {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
          if (resBycrypt) {
            return res.status(200).json({
              mail: mail,
              password: password,
            })
          }
        })
      } else {
        return res.status(500).json({ error: "invalid password or email" })
      }
    })
    .catch(() => {
      return res.status(500).json({ error: "unable to verify user" })
    })
}

module.exports = { getAllUser, getUser, register, login }
