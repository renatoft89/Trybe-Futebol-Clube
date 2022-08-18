import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../jwt/jwt.token';
import LoginService from '../services/login.service';

export default class LoginController {
  public service = new LoginService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const checkUser = await this.service.checkUser(email);

      const token = generateToken(checkUser);

      return res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  };
}
