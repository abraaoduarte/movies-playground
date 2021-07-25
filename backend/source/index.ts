import server from './infra/server';
import listen from './infra/listen';
import logger from './utils/logger';
import connection from './infra/connection';

listen(server)
	.then(async () => {
		logger.info('SERVER STARTED');
		await connection
			.then(() => {
				logger.info('Mongo Connected');
			})
			.catch(() => {
				throw new Error('Error to connect database');
			});
	})
	.catch((error) => {
		logger.error(error);
	});
