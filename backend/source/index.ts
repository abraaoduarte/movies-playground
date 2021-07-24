import server from 'infra/server';
import listen from 'infra/listen';
import logger from 'utils/logger';

listen(server)
	.then(async () => {
		logger.info('SERVER STARTED');
	})
	.catch((error) => {
		logger.error(error);
	});
