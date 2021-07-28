import { Router } from 'express';
import { auth } from '../../../middlewares';
import * as controller from './movie-controller';

const base = Router();
const router = Router();

router.get('/search', auth(), controller.search);
router.get('/bookmarkeds', auth(), controller.list);
router.post('/bookmarked', auth(), controller.bookmarked);
base.use('/movies', router);

export { base as router };
