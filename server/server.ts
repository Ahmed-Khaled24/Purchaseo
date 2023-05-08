import https from "https";
import fs from "fs";
import { connectRedis } from "./services/redis";
import api from "./api";
import keys from "./config/keys";
import { connectMySQL } from "./services/mysql";

(async () => {
    const server = https.createServer({
        cert: fs.readFileSync(keys.SSL_CERT),
        key: fs.readFileSync(keys.SSL_KEY),
    },api);
	// await connectRedis();
	await connectMySQL();
    server.listen(process.env.PORT, () => {
        console.log(`Server is listening on port {${process.env.PORT}}`);
    });
})();
