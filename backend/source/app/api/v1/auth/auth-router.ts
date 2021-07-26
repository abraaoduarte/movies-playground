import { Router } from 'express';
import * as controller from './auth-controller';

const base = Router();
const router = Router();

router.post('/login', controller.login);
router.post('/refresh', controller.refresh);

base.use('/auth', router);

export { base as router };
