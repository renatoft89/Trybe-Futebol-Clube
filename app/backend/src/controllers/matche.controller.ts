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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatche = req.body;

      const matches = await this.service.create(newMatche);
      return res.status(201).send(matches);
    } catch (error) {
      next(error);
    }
  };

  finish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let verifyProgress = 1;
      const { id } = req.params;
      const { inProgress } = req.body;

      if (!inProgress) {
        verifyProgress = 0;
      }

      await this.service.finish(verifyProgress, +id);
      return res.status(200).send({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}
