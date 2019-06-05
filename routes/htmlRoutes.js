// var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

var path = require("path");

module.exports = function (app) {

  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/profile");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/account", function (req, res) {
    if (req.user) {
      res.redirect("/profile");
    }
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });


  app.get("/profile", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.get("/quiz", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/quiz.html"));
  });
}