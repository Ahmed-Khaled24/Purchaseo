import mysql from 'mysql2/promise';

let dbConnection: mysql.Connection;
let connectionData = {
	host: process.env.DB_HOST_NAME,
	user: process.env.DB_USERNAME,
	password: process.env.DB_USER_PASSWORD,
	database: process.env.DB_NAME,
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
