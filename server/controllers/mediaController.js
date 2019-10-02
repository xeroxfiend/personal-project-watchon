const axios = require('axios')

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
      const db = req.app.get('db')
      const {userId} = req.params

      db.get_playlist(userId).then(result => {
          res.status(200).send(result)
      })
  }
};
