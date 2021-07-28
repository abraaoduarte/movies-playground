import server from './infra/server';
import listen from './infra/listen';
import logger from './utils/logger';
import connection from './infra/connection';

listen(server)
	.then(async () => {
		await connection
		.then(() => {
				logger.info('SERVER STARTED');
				logger.info('Mongo Connected');
			})
			.catch(() => {
				throw new Error('Error to connect database');
			});
	})
	.catch((error) => {
		logger.error(error);
	});
