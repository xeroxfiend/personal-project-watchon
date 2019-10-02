const axios = require("axios");

module.exports = {
  search: (req, res) => {
    const {term} = req.query;

    axios
      .get(
        `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=us`,
        {
          headers: {
            "x-rapidapi-host":
              "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "c185859443mshac99814a7788f52p15acc8jsn3e0881fef8db"
          }
        }
      )
      .then(result => {
        res.status(200).send(result.data);
      });
  },

  getPlaylist: (req, res) => {
    const db = req.app.get("db");
    const {user_id} = req.params;

    db.get_playlist(user_id).then(result => {
      res.status(200).send(result);
    });
  },

  addToPlaylist: async req => {
    const db = req.app.get("db");
    const {userId, mediaId, data, api_id} = req.body;

    const foundPlaylistEntry = await db.find_playlist_entry({userId, mediaId});

    if (foundPlaylistEntry)
      return res.status(200).send({message: "Item already exists in playlist"});

    const foundMediaEntry = await db.find_media(mediaId);

    if (foundMediaEntry) {
      db.add_to_playlist({userId, mediaId});
      return res.status(200).send({message: "item added to playlist"});
    } else {
      const newMediaId = await db.add_to_media({data, api_id});
      db.add_to_playlist(userId, newMediaId);
      return res.status(200).send({message: "item added to playlist"});
    }
  },

  findMediaId: (req, res) => {
      const db = req.app.get('db')
      const {api_id} = req.params 

      db.find_media(api_id).then(result => {
          res.status(200).send(JSON.stringify(result[0].media_id))
      })
  }
};
