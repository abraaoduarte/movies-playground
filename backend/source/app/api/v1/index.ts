import { Router } from 'express';
import { router as movieRouter } from './movie/movie-router';
import { router as userRouter } from './user/user-router';
import { router as authRouter } from './auth/auth-router';

const router = Router();

router.use('/v1', movieRouter);
router.use('/v1', userRouter);
router.use('/v1', authRouter);

export { router as v1 };
