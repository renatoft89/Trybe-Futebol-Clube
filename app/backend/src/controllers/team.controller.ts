import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  private service = new TeamService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const team = await this.service.getById(id);

      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}
