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
      maxAge: 1000 * 60 * 60
    }
  })
);

//endpoints


// --------------- Media endpoints -----------------//



// app.get('/api/search', mediaCtrl.search) This endpoint does a call to the third party api and gets everything based on a title search.

// app.get('/api/playlist', mediaCtrl.getPlaylist) This endpoint will query my database and get everything on a playlist by user id.

// app.post('/api/playlist', mediaCtrl.addToPlaylist) This endpoint will allow you to add a new media item to the user's playlist. 
// It will check to see if the entry already exists in the media table, if it does it does nothing, 
// if it doesn't it adds it to the media table. Another query will access the playlist table and get the media info from the media table.

// app.put('/api/playlist/:id', mediaCtrl.editRating) This endpoint allows a user to change their rating for a media item. 0-5

// app.delete('/api/playlist/:id', mediaCtrl.deleteFromPlaylist) This endpoint allows a user to delete a media item from their playlist.



//------------ Auth endpoints ------------//



// app.post('/auth/login', authCtrl.login) Allows user to login.

// app.delete('/auth/logout', authCtrl.logout) Allows user to logout.



//

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Connected to the database, and");
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}!`);
  });
});
