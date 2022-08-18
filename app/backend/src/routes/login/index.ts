import { Router } from 'express';
import LoginController from '../../controllers/login.controller';
import LoginMiddleware from '../../middlewares/login.middleware';

const loginRouter = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

loginRouter.post('/', loginMiddleware.validateUser, loginController.login);

export default loginRouter;
