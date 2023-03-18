import express from 'express';
const api = express();
api.get('/home', (req, res) => {
    res.send('Hello from Express!');
});

export default api;