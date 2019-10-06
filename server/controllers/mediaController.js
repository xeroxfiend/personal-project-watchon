require("dotenv").config();
const {UTELLY_URL, IMDB_URL, API_KEY} = process.env;
const axios = require("axios");

module.exports = {
  search: (req, res) => {
    const {term} = req.query;

    axios
      .get(`https://imdb8.p.rapidapi.com/title/find?q=${term}`, {
        headers: {
          "x-rapidapi-host": IMDB_URL,
          "x-rapidapi-key": API_KEY
        }
      })
      .then(result => {
        res.status(200).send(result.data.results);
      });

    // axios
    //   .get(
    //     `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=us`,
    //     {
    //       headers: {
    //         "x-rapidapi-host": UTELLY_URL,
    //         "x-rapidapi-key": API_KEY
    //       }
    //     }
    //   )
    //   .then(result => {
    //     res.status(200).send(result.data);
    //   });
  },

  getPlaylist: (req, res) => {
    const db = req.app.get("db");
    const {user_id} = req.params;

    db.get_playlist(user_id).then(result => {
      res.status(200).send(result);
    });
  },

  addToPlaylist: async (req, res) => {
    const db = req.app.get("db");
    const {userId, data, api_id} = req.body;

    const foundMediaId = await db.find_media(api_id);

    let foundPlaylistEntry = [];
    let newMediaId = [];

    if (foundMediaId[0]) {
      foundPlaylistEntry = await db.find_playlist_entry({
        userId: +userId,
        foundMediaId: +foundMediaId[0].media_id
      });
    } else {
      newMediaId = await db.add_to_media({data, api_id});
    }

    if (!foundPlaylistEntry[0] && foundMediaId[0]) {
      db.add_to_playlist([+userId, +foundMediaId[0].media_id]);
      return res.status(200).send({message: "Item added to playlist"});
    } else if (!foundPlaylistEntry[0] && newMediaId[0]) {
      db.add_to_playlist([+userId, +newMediaId[0].media_id]);
      return res.status(200).send({message: "Item added to playlist"});
    } else {
      return res
        .status(200)
        .send({message: "Item already exists in the playlist"});
    }
  },

  deleteFromPlaylist: async (req, res) => {
    const db = req.app.get("db");
    const {userId, api_id} = req.query;

    const mediaId = await db.find_media(api_id);

    db.delete_from_playlist([userId, mediaId[0].media_id]).then(() => {
      res.status(200).send({message: "Item removed from playlist"});
    });
  },

  updatePlaylistRating: async (req, res) => {
    const db = req.app.get("db");
    const {userId, api_id, rating} = req.body;

    const mediaIdArr = await db.find_media(api_id);
    const mediaId = mediaIdArr[0].media_id;

    db.update_playlist_rating({rating, userId, mediaId}).then(() => {
      res.sendStatus(200);
    });
  }
};
