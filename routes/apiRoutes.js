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
    var id = (req.session.passport.user.id) ? req.session.passport.user.id : null;
    if (id) {
      db.Quizzes.upsert({
        user_id: id,
        gender: (query.question0) ? query.question0 : 'a',
        age_range: (query.question1) ? query.question1 : 'a',
        type: (query.question2) ? query.question2 : 'a',
        miles: (query.question3) ? query.question3 : 'a',
        group_size: (query.question4) ? query.question4 : 'a',
        competitive: (query.question5) ? query.question5 : 'a',
        electric: (query.question6) ? query.question6 : 'a',
        matching: (query.question7) ? query.question7 : 'a',
        shopping: (query.question8) ? query.question8 : 'a',
        weather: (query.question9) ? query.question9 : 'a',
      }).then(function (results) {
        console.log(results);
        res.status(200).json("/profile");
      }).catch(function (err) {
        console.log(err);
        res.status(400).json(err);
        // res.status(422).json(err.errors[0].message);
      });
    } else {
      res.status(400).json('no id');
    }
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

  app.get("/api/db/quiz", function (req, res, next) {
    let user_id = 7;
    let myQuizResults;
    let matchQuizResults = []

    if (user_id) {
      getMyQuiz();
    } else {
      res.status(400).json('No User Id');
    }
    //get my quizes
    function getMyQuiz() {
      db.Quizzes.findAll({
        limit: 1,
        where: {
          user_id: user_id
        }
      }).then(function (results) {
        if (results.length) {
          console.log(results[0].dataValues)
          myQuizResults = results[0].dataValues;
          getMatchedQuizes();
        } else {
          res.status(400).json('No Results');
        }

      }).catch(function (err) {
        console.log(err);
        res.status(400).json('No Results');
      });
    }

    //get all quizes that match
    function getMatchedQuizes() {
      db.Quizzes.findAll({
        where: {
          $or: [{
            gender: myQuizResults.gender,
          }, {
            age_range: myQuizResults.age_range
          }, {
            type: myQuizResults.type
          }, {
            miles: myQuizResults.miles
          }, {
            group_size: myQuizResults.group_size
          }, {
            competitive: myQuizResults.competitive
          }, {
            electric: myQuizResults.electric
          }, {
            matching: myQuizResults.matching
          }, {
            shopping: myQuizResults.shopping
          }, {
            weather: myQuizResults.weather
          }],
        }
      }).then(function (results) {
        if (results.length) {
          console.log(results)
          //return list of matched pals
          res.status(200).json(results);
        } else {
          res.status(400).json('No Results');
        }

      }).catch(function (err) {
        console.log(err);
        res.status(400).json('No Results');
      });
    }

  });


};