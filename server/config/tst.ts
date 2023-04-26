import dotenv from 'dotenv';

dotenv.config();

const keys = {
	PORT: process.env.PORT,
	DB_HOST_NAME: process.env.TEST_DB_HOST_NAME,
	DB_USERNAME: process.env.TEST_DB_USERNAME,
	DB_USER_PASSWORD: process.env.TEST_DB_USER_PASSWORD,
	DB_NAME: process.env.TEST_DB_NAME,
};

export default keys;