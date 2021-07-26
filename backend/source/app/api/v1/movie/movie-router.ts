import { Router } from 'express';
import { auth } from '../../../middlewares';
import * as controller from './movie-controller';

const base = Router();
const router = Router();

router.get('/search', auth(), controller.search);
router.post('/bookmarked/:id', auth(), controller.bookmarked);
base.use('/movies', router);

export { base as router };
