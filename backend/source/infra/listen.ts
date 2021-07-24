import * as http from 'http';
import { Express } from 'express';

function listen(handler: Express, { port = 3001 } = {}): Promise<void> {
	return new Promise((resolve, reject) => {
		http.createServer(handler).listen(port).once('listening', resolve).once('error', reject);
	});
}

export default listen;

