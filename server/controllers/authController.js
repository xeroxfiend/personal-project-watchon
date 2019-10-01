const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const {email, password} = req.body;

    const existingUserArray = await db.find_user(email);

    if (existingUserArray[0]) {
      return res.sendStatus(404);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUserId = await db
      .new_user({
        email,
        hash
      })
      .catch(err => res.sendStatus(503));

    req.session.user = {
      email,
      userId: newUserId
    };

    res.status(200).send({
      message: "Successfully registered!",
      user: req.session.user,
      loggedIn: true
    });
  },

  login: async (req, res) => {
    const db = req.app.get("db");
    const {email, password} = req.body;

    const existingUserArray = await db.find_user(email);

    if (!existingUserArray[0]) return res.sendStatus(404);

    const result = bcrypt.compareSync(password, existingUserArray[0].hash);

    if (!result) return res.sendStatus(403);

    req.session.user = {
      email,
      userId: existingUserArray[0].user_id
    };

    res.status(200).send({
      message: "Successfully logged in!",
      user: req.session.user,
      loggedIn: true
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send("successfully logged out");
  }
};
