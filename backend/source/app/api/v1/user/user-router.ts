import { Router } from 'express';

import * as controller from './user-controller';

const base = Router();
const router = Router();

router.post('/register', controller.register);
base.use('/users', router);

export { base as router };
