import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import LoginService from '../services/login.service';

const USER = Joi.object({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).required(),
});

export default class LoginMiddleware {
  private service = new LoginService();

  validateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = USER.validate(req.body);
    console.log(error);

    if (error?.details[0].message.includes('"email"')) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
