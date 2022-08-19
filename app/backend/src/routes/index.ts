import { Router } from 'express';
import loginRouter from './login';
import matchesRouter from './matches';
import teamsRouter from './teams';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
