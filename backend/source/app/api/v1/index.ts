import { Router } from 'express';
import { router as movieRouter } from './movie/movie-router';
import { router as userRouter } from './user/user-router';

const router = Router();

router.use('/v1', movieRouter);
router.use('/v1', userRouter);

export { router as v1 };
