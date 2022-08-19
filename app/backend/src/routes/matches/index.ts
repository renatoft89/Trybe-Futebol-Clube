import { Router } from 'express';
import MatchesController from '../../controllers/matche.controller';
import MatchMiddleware from '../../middlewares/matche.middleware';

const matchesRouter = Router();

const matchesController = new MatchesController();
const matcheMiddleware = new MatchMiddleware();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.post(
  '/',
  matcheMiddleware.tokenValidate,
  matcheMiddleware.notEqualTeams,
  matchesController.create,
);
matchesRouter.patch('/:id/finish', matchesController.finish);

export default matchesRouter;
