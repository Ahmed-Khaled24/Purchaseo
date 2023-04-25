import dev from './dev';
// import prod from './prod';
const env = process.env.NODE_ENV || 'development';
let envVars: any  ;
if (env === 'development') {
    envVars = dev;
}else if (env === 'production') {
    envVars = dev;
}

export {envVars};

