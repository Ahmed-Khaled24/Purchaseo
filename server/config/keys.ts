import dotenv from 'dotenv';
dotenv.config();
import dev from './dev';
import prod from './prod';
import test from './tst';

const env = process.env.NODE_ENV?.trim();
let keys: any;

if (env === 'development') {
	keys = dev;
} else if (env === 'production') {
	keys = prod;
} else if (env === 'test') {
	keys = test;
}
console.log('env: ', env);
console.log('keys: ', keys);

export default keys;
