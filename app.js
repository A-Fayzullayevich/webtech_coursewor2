const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const path = require('path');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(require('express-session'));
const app = express();
const User  = require('./models/userModel')

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/adminRoutes')
const publicRoutes = require('./routes/publicRoutes')


app.use(
    expressSession({
      secret: 'westminster_student_00011640',
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: "mongodb+srv://00011640:wiutstudent00011640@cluster0.x97by.mongodb.net/webtech",
        collection: 'authentification'
    })
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        throw new Error(err);
      });
  });


  app.use((req, res, next) => {
    res.locals.hasAccess = req.session.user_entered;
    next();
  });

app.use(adminRoutes)
app.use(publicRoutes)



mongoose
  .connect("mongodb+srv://00011640:wiutstudent00011640@cluster0.x97by.mongodb.net/webtech")
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
});

