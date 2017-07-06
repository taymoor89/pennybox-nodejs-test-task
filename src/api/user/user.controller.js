const UserModel = require('./user.model');

class UserController {

  static getList (req, res) {
    // TODO: TDD me & Refactor me
    UserModel
      .find({}, (err, users) => {
        if (err) {
          return console.error(err);
        }
        res.json(users)
      })
  }

  static create (req, res) {
    // TODO: Write implementation here
  }

}

module.exports = UserController;
