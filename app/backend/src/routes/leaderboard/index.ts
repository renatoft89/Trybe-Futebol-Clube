import { Router } from 'express';

import LeaderboardController from '../../controllers/leaderboard.controller';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', leaderboardController.getAll);
leaderboardRouter.get('/home', leaderboardController.getHome);
leaderboardRouter.get('/away', leaderboardController.getAway);

export default leaderboardRouter;
