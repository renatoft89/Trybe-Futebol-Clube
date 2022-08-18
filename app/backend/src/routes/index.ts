import { Router } from 'express';
import loginRouter from './login';
import teamsRouter from './teams';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
