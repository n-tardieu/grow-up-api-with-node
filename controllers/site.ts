import { Request, Response } from 'express';
import Site from '../models/site.js'

const siteController = {
  test: (req, res) => {
    res.json("Service site works")
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const sites = await Site.find();
      res.json({ success: true, data: sites });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const siteId = req.params.id;
      const site = await Site.findById(siteId);
      if (!site) {
        return res.status(404).json({ success: false, error: 'Site not found' });
      }
      res.json({ success: true, data: site });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  postSite: async (req: Request, res: Response) => {
    try {

      const {
        name,
        isInHome,
        light,
        humidity,
        temperature
      } = req.body;

      const site = new Site({
        name,
        isInHome,
        light,
        humidity,
        temperature
      });

      await site.save();
      res.json({ success: true, data: site });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  updateSite: async (req: Request, res: Response) => {
    try {
      const siteId = req.params.id;
      const {
        name,
        isInHome,
        light,
        humidity,
        temperature
      } = req.body;
      const site = await Site.findByIdAndUpdate(
        siteId,
        {
          name,
          isInHome,
          light,
          humidity,
          temperature
        },
        { new: true }
      );
      if (!site) {
        return res.status(404).json({ success: false, error: 'Site not found' });
      }
      res.json({ success: true, data: site });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const siteId = req.params.id;
      const site = await Site.findByIdAndDelete(siteId);
      if (!site) {
        return res.status(404).json({ success: false, error: 'Site not found' });
      }
      res.json({ success: true, message: 'Site deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default siteController;
