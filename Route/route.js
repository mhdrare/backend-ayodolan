"use strict";

module.exports = function(apps) {
  const controller = require("../Controller/controller");
  apps.get("/", controller.hello);

  //image
  const multer = require("multer");

  const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });

  let upload = multer({ storage: storage });
  //~image

  const users = require("../Controller/UserController");
  apps.get("/users", users.showAll);
  apps.post("/users", upload.single("image"), users.register);
  apps.get("/users/:id", users.showById);
  apps.patch("/users/:id", users.update);
  apps.delete("/users/:id", users.delete);
};
