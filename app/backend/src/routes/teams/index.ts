import { Router } from 'express';
import TeamController from '../../controllers/team.controller';

const teamsRouter = Router();

const teamController = new TeamController();

teamsRouter.get('/', teamController.getAll);
teamsRouter.get('/:id', teamController.getById);

export default teamsRouter;
