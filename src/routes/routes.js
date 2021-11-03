module.exports = (app) => {
  const { verifyToken } = require("../controllers/token/verifyToken.controller.js")

  const authController = require("../controllers/auth/auth.controller.js")
  const userController = require("../controllers/user/user.controller.js")
  const artistController = require("../controllers/artist/artist.controller.js")
  const albumController = require("../controllers/album/album.controller.js")
  /**
   * TEST API
   */
  app.get("/", (req, res) => {
    res.send("Welcome to the jungle of the Tixo API.")
  })

  /**
   * API VERIFY REQUETE
   */
  /* checks if the API is well secured by a bearer Token */
  app.use("/api/", verifyToken)

  /**
   * AUTH
   */
  app.post("/auth/register", authController.register)
  app.post("/auth/login", authController.login)

  /**
   * USER
   */
  app.get("/api/user", userController.getAllUser)
  app.get("/api/user/:id", userController.getUser)
  app.put("/api/user/:id", userController.updateUser)
  app.delete("/api/user/:id", userController.deleteUser)
  app.post("/api/user/:id/artist/:idArtist", userController.addArtistForUser)
  app.get("/api/user/artistFollow/:id", userController.getAllArtistForUser)

  /**
   * ARTIST
   */
  app.get("/api/artist", artistController.searchArtist)
  app.post("/api/artist", artistController.createArtist)

  /**
   * ALBUM
   */
  app.post("/api/album", albumController.createAlbum)

  /**
   * 404 NOT FOUND
   */

  /* Error case of a false route */
  app.use((req, res) => {
    res.status(404).json({
      URL_ERROR: req.originalUrl,
      STATUS_ERROR: "404",
      ERROR: "NOT FOUND",
    })
  })
}
