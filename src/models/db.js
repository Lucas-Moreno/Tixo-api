const mongoose = require("mongoose")
const process = require("process")

const uri = `mongodb+srv://${process.env.NAME_DB}:${process.env.PASSWORD_DB}@cluster0.bqizz.mongodb.net/tixo-db?retryWrites=true&w=majority`

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded")
    } else {
      console.log("Error in db connection :" + err)
    }
  }
)

require("./user/user.model.js")
require("./artist/artist.model.js")
require("./album/album.model.js")
