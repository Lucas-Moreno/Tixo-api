const mongoose = require("mongoose")
const User = mongoose.model("user")
var bcrypt = require("bcrypt")
var jwtUtils = require("../../utils/jwt.utils.js")

const register = async (req, res) => {
  let { pseudo, mail, password } = req.body

  if (!pseudo || !mail || !password) {
    return res.status(400).json({ message: "missing pseudo, mail or password" })
  }

  bcrypt.hash(password, 3, async (err, hash) => {
    let user = new User({
      pseudo: pseudo,
      mail: mail,
      password: hash,
    })

    try {
      await user.save()
      return res.status(201).json({ message: "create" })
    } catch (e) {
      if (err.message.indexOf("11000") != -1) {
        return res.status(400).json({ message: "error mail already exists" })
      } else {
        return res.status(400).json({ message: "error create new account" })
      }
    }

    // user.save().then(() => {
    //   return res.status(201).json({ message: "create" })
    // }).catch((err) => {
    //   if (err.message.indexOf("11000") != -1) {
    //     return res.status(400).json({ message: "error mail already exists" })
    //   } else {
    //     return res.status(400).json({ message: "error create new account" })
    //   }
  })
}

const login = async (req, res) => {
  let { mail, password } = req.body

  if (!password || !mail) {
    return res.status(400).json({ error: "missing parameters" })
  }
  try {
    const data = User.findOne({ mail: mail })
    if (data) {
      bcrypt.compare(password, data.password, async (resBycrypt) => {
        if (resBycrypt) {
          try {
            let token = jwtUtils.generateTokenForUser(data)
            return res.status(200).json({
              token: token,
            })
          } catch (e) {
            return res.status(200).json("Oups ! error T_T")
          }
        }
      })
    } else {
      return res.status(500).json({ error: "invalid password or email" })
    }
  } catch (e) {
    return res.status(500).json({ error: "unable to verify user" })
  }
}

module.exports = { register, login }
