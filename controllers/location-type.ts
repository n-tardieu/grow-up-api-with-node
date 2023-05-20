import { Request, Response } from 'express';
import LocationType from '../models/location-type.js'

const locationTypeController = {
  test: (req, res) => {
    res.json("Service locationType works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const locationType = await LocationType.find();
      res.json({ success: true, data: locationType });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const locationTypeId = req.params.id;
      const locationType = await LocationType.findById(locationTypeId);
      if (!locationType) {
        return res.status(404).json({ success: false, error: 'LocationType not found' });
      }
      res.json({ success: true, data: locationType });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postLocationType: async (req: Request, res: Response) => {
    try {
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const locationType = new LocationType({ name, recommendedWateringFrequency, lastWateringDate });
      await locationType.save();
      res.json({ success: true, data: locationType });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updateLocationType: async (req: Request, res: Response) => {
    try {
      const locationTypeId = req.params.id;
      const { name, recommendedWateringFrequency, lastWateringDate } = req.body;
      const locationType = await LocationType.findByIdAndUpdate(
        locationTypeId,
        { name, recommendedWateringFrequency, lastWateringDate },
        { new: true }
      );
      if (!locationType) {
        return res.status(404).json({ success: false, error: 'LocationType not found' });
      }
      res.json({ success: true, data: locationType });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const locationTypeId = req.params.id;
      const locationType = await LocationType.findByIdAndDelete(locationTypeId);
      if (!locationType) {
        return res.status(404).json({ success: false, error: 'LocationType not found' });
      }
      res.json({ success: true, message: 'LocationType deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default locationTypeController;
