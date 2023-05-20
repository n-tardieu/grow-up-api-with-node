import User from '../models/user.js';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

const AuthController = {
  test(req, res) {
    res.json("Service Auth works");
  },

  async postLogin(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next({
          status: 400,
          message: 'Authentication failed. User not found.',
        });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return next({
          status: 401,
          message: 'Authentication failed. Wrong password.',
        });
      }

      const dataUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign({ user: dataUser }, secret, {
        expiresIn: '7d',
      });

      return res.json({
        success: true,
        access_token: token,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return next({
        status: 500,
        message: 'Database error',
        error,
      });
    }
  },

  async postRegister(req, res, next) {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return next({
          status: 401,
          message: 'Email is already taken by another user.',
        });
      }

      const passwordHash = bcrypt.hashSync(req.body.password);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        role: req.body.role,
      });

      await user.save();

      return res.status(201).json({ success: true, message: 'Success' });
    } catch (error) {
      return next({
        status: 500,
        message: 'Database error',
        error,
      });
    }
  },

  postRestPassword(req, res) {
    res.json("email was sent");
  },
};

export default AuthController;
