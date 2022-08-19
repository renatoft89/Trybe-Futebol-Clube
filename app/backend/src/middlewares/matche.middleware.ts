import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../jwt/jwt.token';

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
}
