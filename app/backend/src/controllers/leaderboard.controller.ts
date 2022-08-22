import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public service = new LeaderboardService();

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamsHome = await this.service.getHome();
      return res.status(200).json(teamsHome);
    } catch (error) {
      next(error);
    }
  };
}
