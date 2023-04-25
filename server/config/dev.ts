const dotenv = require('dotenv');

    dotenv.config();
    const dev = {
        PORT: process.env.DEV_PORT,
    }

export default dev;