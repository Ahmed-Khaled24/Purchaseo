import mysql from 'mysql2/promise';
import keys from '../config/keys'

let dbConnection: mysql.Connection;
let connectionData = {
	host: keys.DB_HOST_NAME,
	user: keys.DB_USERNAME,
	password: keys.DB_USER_PASSWORD,
	database: keys.DB_NAME,
};

async function connectMySQL(): Promise<mysql.Connection> {
    try {
        dbConnection = await mysql.createConnection(connectionData);
    }
    catch (error) {
        console.log(error);
    }
	return dbConnection;
}

async function disconnectMySQL() {
    try {
        await dbConnection.end();
    } catch (error) {
        console.log(error);
    }
}

export { connectMySQL, disconnectMySQL, dbConnection};
