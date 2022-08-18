import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import bcrypt = require('bcryptjs');
import LoginService from '../services/login.service';

const USER = Joi.object({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).required(),
});

export default class LoginMiddleware {
  private service = new LoginService();

  validateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = USER.validate(req.body);
    // console.log(error);

    const user = await this.service.checkUser(req.body.email);
    // console.log(user);
    if (error?.details[0].message.includes('"email"')) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (error?.details[0].message.includes('"password"')) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) return res.status(401).json({ message: 'Incorrect email or password' });
    next();
  };
}
