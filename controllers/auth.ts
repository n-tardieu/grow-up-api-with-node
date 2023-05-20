const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');


module.exports = {

  test(req, res){
    res.json("Service Auth works")
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async postLogin(req, res, next){
    User.findOne({
      email: req.body.email,
    }, (err, user) => {
      if (err) throw err;
      if (!user) {
        return next({
          status: 400,
          message: 'Authentication failed. User not found.',
        });
      }
  
      // check if password matches
      return bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (result && !error) {
          // if user is found and password is right create a token
          const dataUser = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
          };
  
          const token = jwt.sign({
            user: dataUser,
          }, secret, {
            // expiresIn: '3h',
            expiresIn: '7d',
          });
  
          // return the information including token as JSON
          return res.json({
            success: true,
            access_token: token,
            user: {
              _id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role,
            },
          });
        }
  
        return next({
          status: 401,
          message: 'Authentication failed. Wrong password.',
        });
      });
    });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async postRegister(req, res, next){
    const passwordHash = bcrypt.hashSync(req.body.password);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordHash,
      role: req.body.role
    });

    User.countDocuments({ email: req.body.email }, (err, count) => {
      if (count !== 0) {
        return next({
          status: 401,
          message: 'Email is already taken by another user.',
        });
      }

      return user.save((saveErr) => {
        if (saveErr) {
          console.log(saveErr);
          // return next({
          //   status: 500,
          //   message: 'Database error',
          //   error: saveErr,
          // });
        }
        return res.status(201).json({ success: true, message: 'Success' });
      });
    });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async postRestPassword(req, res){
    res.json("email was send")
  },

  
}
