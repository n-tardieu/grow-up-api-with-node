import { Request, Response } from 'express';
import User from '../models/user.js'

const userController = {
  test: (req, res) => {
    res.json("Service user works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const plants = await User.find();
      res.json({ success: true, data: plants });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postUser: async (req: Request, res: Response) => {
    try {
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const user = new User({ name, recommendedWateringFrequency, lastWateringDate });
      await user.save();
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { name, recommendedWateringFrequency, lastWateringDate },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default userController;
