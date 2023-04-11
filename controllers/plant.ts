import { Request, Response } from 'express';
import Plant from '../models/plant.js'

const plantController = {
  test: (req, res) => {
    res.json("Service plant works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const plants = await Plant.find();
      res.json({ success: true, data: plants });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const plantId = req.params.id;
      const plant = await Plant.findById(plantId);
      if (!plant) {
        return res.status(404).json({ success: false, error: 'Plant not found' });
      }
      res.json({ success: true, data: plant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postPlant: async (req: Request, res: Response) => {
    try {
      const { name, wateringFrequency, lastWateringDate } = req.body;
      const plant = new Plant({ name, wateringFrequency, lastWateringDate });
      await plant.save();
      res.json({ success: true, data: plant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updatePlant: async (req: Request, res: Response) => {
    try {
      const plantId = req.params.id;
      const { name, wateringFrequency, lastWateringDate } = req.body;
      const plant = await Plant.findByIdAndUpdate(
        plantId,
        { name, wateringFrequency, lastWateringDate },
        { new: true }
      );
      if (!plant) {
        return res.status(404).json({ success: false, error: 'Plant not found' });
      }
      res.json({ success: true, data: plant });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const plantId = req.params.id;
      const plant = await Plant.findByIdAndDelete(plantId);
      if (!plant) {
        return res.status(404).json({ success: false, error: 'Plant not found' });
      }
      res.json({ success: true, message: 'Plant deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default plantController;
