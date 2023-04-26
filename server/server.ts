import http from 'http';

import api from './api';
import { connectMySQL } from './service/mysql';

(async () => {
	const server = http.createServer(api);
	// await connectMySQL();
	server.listen(process.env.PORT, () => {
		console.log('Server is listening on port 8000');
	});
})();