require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const mediaCtrl = require('./controllers/mediaController')
const authCtrl = require('./controllers/authController')

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }
  })
);

//endpoints


// --------------- Media endpoints -----------------//



app.get('/api/search', mediaCtrl.search)

app.get('/api/playlist/:user_id', mediaCtrl.getPlaylist)

app.post('/api/playlist', mediaCtrl.addToPlaylist)

app.delete('/api/playlist', mediaCtrl.deleteFromPlaylist)

// app.put('/api/playlist/:id', mediaCtrl.editRating) This endpoint allows a user to change their rating for a media item. 0-5

// optional get that will help me to sort my playlist (get by title)



//------------ Auth endpoints ------------//


app.post('/auth/login', authCtrl.login)

app.post('/auth/register', authCtrl.register)

app.delete('/auth/logout', authCtrl.logout)

app.get('/auth/user', authCtrl.getUserData)


//----------------------------------------//


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Connected to the database, and");
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}!`);
  });
});
