import dev from './dev';
import prod from './prod';

const env = process.env.NODE_ENV.trim();
let keys: any;

if (env === 'development') {
	keys = dev;
} else if (env === 'production') {
	keys = prod;
}

export default keys;
