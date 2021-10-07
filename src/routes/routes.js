module.exports = (app) => {
  const authController = require("../controllers/auth/auth.controller.js")
  const userController = require("../controllers/user/user.controller.js")
  /**
   * TEST API
   */
  app.get("/", (req, res) => {
    res.send("Welcome to the jungle of the Tixo API.")
  })

  /**
   * AUTH
   */
  app.post("/auth/register", authController.register)
  app.post("/auth/login", authController.login)

  /**
   * USER
   */
  app.get("/user", userController.getAllUser)
  app.get("/user/:id", userController.getUser)

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
