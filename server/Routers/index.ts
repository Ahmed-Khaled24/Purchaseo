import {Router} from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import authRouter from './auth.router';
import imageRouter from './image.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter)
globalRouter.use('/auth', authRouter)
globalRouter.use('/image', imageRouter)

export default globalRouter;