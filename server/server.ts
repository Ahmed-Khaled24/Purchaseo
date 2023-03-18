import http from 'http';

import api from './api';

const server = http.createServer(api);
server.listen(8000, () => {
	console.log('Server is listening on port 8000');
});