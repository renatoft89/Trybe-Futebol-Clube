import { Router } from 'express';
import TeamController from '../../controllers/team.controller';

const teamsRouter = Router();

const teamController = new TeamController();

teamsRouter.get('/', teamController.getAll);

export default teamsRouter;
