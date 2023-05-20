import { Request, Response } from 'express';
import PlantVariety from '../models/plant-variety.js'

const plantVarietyController = {
  test: (req, res) => {
    res.json("Service plantVariety works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const plantVarietys = await PlantVariety.find();
      res.json({ success: true, data: plantVarietys });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const plantVarietyId = req.params.id;
      const plantVariety = await PlantVariety.findById(plantVarietyId);
      if (!plantVariety) {
        return res.status(404).json({ success: false, error: 'PlantVariety not found' });
      }
      res.json({ success: true, data: plantVariety });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postPlantVariety: async (req: Request, res: Response) => {
    try {
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const plantVariety = new PlantVariety({ name, recommendedWateringFrequency, lastWateringDate });
      await plantVariety.save();
      res.json({ success: true, data: plantVariety });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updatePlantVariety: async (req: Request, res: Response) => {
    try {
      const plantVarietyId = req.params.id;
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const plantVariety = await PlantVariety.findByIdAndUpdate(
        plantVarietyId,
        { name, recommendedWateringFrequency, lastWateringDate },
        { new: true }
      );
      if (!plantVariety) {
        return res.status(404).json({ success: false, error: 'PlantVariety not found' });
      }
      res.json({ success: true, data: plantVariety });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const plantVarietyId = req.params.id;
      const plantVariety = await PlantVariety.findByIdAndDelete(plantVarietyId);
      if (!plantVariety) {
        return res.status(404).json({ success: false, error: 'PlantVariety not found' });
      }
      res.json({ success: true, message: 'PlantVariety deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default plantVarietyController;
