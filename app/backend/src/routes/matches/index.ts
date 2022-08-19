import { Router } from 'express';
import MatchesController from '../../controllers/matche.controller';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.post('/', matchesController.create);

export default matchesRouter;
