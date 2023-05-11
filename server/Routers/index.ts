import {Router} from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import authRouter from './auth.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter)
globalRouter.use('/auth', authRouter)

export default globalRouter;