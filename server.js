const express = require("express");

require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const userInViews = require("./lib/middleware/userInViews");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dashboardRouter = require("./routes/dashboard");
const cardgameRouter = require("./routes/cardgame-route");

const apiTeamMember = require("./routes/api-team_member");
const apiTeam = require("./routes/api-team_name");
const apiAnswer = require("./routes/api-answer");
const apiQuestion = require("./routes/api-question");



const PORT = process.env.PORT || 3000;

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();

// Requiring our models for syncing
const db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const sess = {
  secret: "Voorp voorp voorp",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  app.set("trust proxy", 1);
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

// Import routes and give the server access to them.
// const routes = require("./routes/seq-test-routes.js");

// app.use(routes);
app.use(userInViews());
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", dashboardRouter);
app.use("/", cardgameRouter);

app.use("/", apiTeamMember);
app.use("/", apiTeam);
app.use("/", apiAnswer);
app.use("/", apiQuestion);
// app.use("/cardgame", cardgameRouter);



// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
