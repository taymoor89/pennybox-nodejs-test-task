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

  static async create (req, res, next) {
    let {name, role} = req.body;
    
    if(!name) return next(new Error('Name not provided'));
    if(!role) return next(new Error('Role not provided'));

    try {
      let doc   = {name, role};
      let user  = await UserModel.create(doc);

      res
        .status(201)
        .json(user);
    }
    catch (error){
      next(error);
    }
  }

}

module.exports = UserController;
