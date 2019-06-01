var db = require("../models");
var passport = require("../config/passport");

// var pals = require("../public/js/pals")
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(req.session.passport.user.id);

    // passport.authenticate("local")
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
  });
  app.post("/api/quiz", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/quiz");
  });

  app.post("/api/db/quiz", function (req, res) {
    var query = req.query;
    var id = req.session.passport.user.id
    db.Quizzes.create({
      user_id: id,
      gender: (query.question0) ? query.question0 : 'a',
      age_range: (query.question1) ? query.question0 : 'a',
      type: (query.question2) ? query.question0 : 'a',
      miles: (query.question3) ? query.question0 : 'a',
      group_size: (query.question4) ? query.question0 : 'a',
      competitive: (query.question5) ? query.question0 : 'a',
      electric: (query.question6) ? query.question0 : 'a',
      matching: (query.question7) ? query.question0 : 'a',
      shopping: (query.question8) ? query.question0 : 'a',
      weather: (query.question9) ? query.question0 : 'a',
    }).then(function (results) {
      console.log(results);
      res.redirect(307, "/profile");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/quiz");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  //
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // app.get('/api/pals', function (req, res) {
  //   res.json(pals);
  // });

  // // Add new friend entry
  // app.post('/api/pals', function (req, res) {
  //   // Capture the user input object
  //   var userInput = req.body;

  //   for (var i = 0; i < userInput.scores.length; i++) {
  //     userInput.scores[i] = parseInt(userInput.scores[i]);
  //   }

  //   // Compute best friend match
  //   var palsIndex = 0;
  //   var minimumDifference = 50 // Make the initial value big for comparison

  //   // Examine all existing friends in the list
  //   for (var i = 0; i < pals.length; i++) {

  //     // Compute differenes for each question
  //     for (var i = 0; i < pals.length; i++) {
  //       var totalDifference = 0;
  //       for (var j = 0; j < pals[i].scores.length; j++) {
  //         var difference = Math.abs(userInput.scores[j] - pals[i].scores[j]);
  //         totalDifference += difference;
  //       };

  //       if (totalDifference < minimumDifference) {
  //         palsIndex = i;
  //         minimumDifference = totalDifference;
  //       };
  //     };

  //     // Add new user
  //     pals.push(userInput);

  //     // Send appropriate response
  //     res.json(pals[palsIndex]);
  //   };
  // });



};