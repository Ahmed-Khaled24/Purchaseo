import {Router} from 'express';
import userRouter from './user.router';
import productRouter from './products.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter)

export default globalRouter;