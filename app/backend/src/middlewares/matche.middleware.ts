import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../jwt/jwt.token';
import TeamModel from '../database/models/MatcheModel';

export default class MatchMiddleware {
  tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      validateToken(authorization as string);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };

  notEqualTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    try {
      if (homeTeam === awayTeam) {
        return res.status(401).send({
          message: 'It is not possible to create a match with two equal teams' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  validateTeamExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam } = req.body;

      const teamHome = await TeamModel.findByPk(homeTeam);
      const teamAway = await TeamModel.findByPk(awayTeam);

      if (!teamHome || !teamAway) {
        return res.status(404).send({ message: 'There is no team with such id!' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
