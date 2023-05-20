import { Request, Response } from 'express';
import Location from '../models/location.js'

const locationController = {
  test: (req, res) => {
    res.json("Service location works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const locations = await Location.find();
      res.json({ success: true, data: locations });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const locationId = req.params.id;
      const location = await Location.findById(locationId);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, data: location });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postLocation: async (req: Request, res: Response) => {
    try {

      const {
        name,
        isInHome,
        light,
        humidity,
        temperature
      } = req.body;

      const location = new Location({
        name,
        isInHome,
        light,
        humidity,
        temperature
      });

      await location.save();
      res.json({ success: true, data: location });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updateLocation: async (req: Request, res: Response) => {
    try {
      const locationId = req.params.id;
      const {
        name,
        isInHome,
        light,
        humidity,
        temperature
      } = req.body;
      const location = await Location.findByIdAndUpdate(
        locationId,
        {
          name,
          isInHome,
          light,
          humidity,
          temperature
        },
        { new: true }
      );
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, data: location });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const locationId = req.params.id;
      const location = await Location.findByIdAndDelete(locationId);
      if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
      }
      res.json({ success: true, message: 'Location deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default locationController;
