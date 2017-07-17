const UserModel = require('./user.model');

class UserController {

  static async getList (req, res, next) {
    let {limit, skip} = req.query;
    limit = +limit || 10; //parse limit to number if exists otherwise make it default to 10 
    skip  = +skip || 0; //parse skip to number if exists otherwise make it default to 0

    try {
      let total = await UserModel.count({});
      let users = await UserModel
        .find({})
        .skip(skip)
        .limit(limit)
        .exec();

      let headers = {
        amount: users.length,
        total
      };

      res
        .set(headers)
        .status(200)
        .json(users);
    }
    catch (error) {
      next(error);
        }
  }

  static create (req, res) {
    // TODO: Write implementation here
  }

}

module.exports = UserController;
