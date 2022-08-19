import { Request, Response, NextFunction } from 'express';
import MatcheService from '../services/matche.service';

export default class MatchesController {
  private service = new MatcheService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.getAll();

      return res.status(200).send(matches);
    } catch (error) {
      next(error);
    }
  };
}
