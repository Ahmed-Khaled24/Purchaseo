import {Router} from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import authRouter from './auth.router';
import imageRouter from './image.router';
import { mwCheckLoginStatus } from '../middlewares/auth/user.middleware';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter)
globalRouter.use('/auth', authRouter)
globalRouter.use('/image',mwCheckLoginStatus("LoggedIn"), imageRouter)
// TODO: make this in front end cuz we put react here
globalRouter.get('/*', (req, res) => {
    res.status(404).json({status: 'failure', data: 'path not found'})
})

export default globalRouter;