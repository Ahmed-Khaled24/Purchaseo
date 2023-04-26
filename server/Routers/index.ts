import {Router} from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import ordersRouter from './orders.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter)
globalRouter.use('/orders', ordersRouter)
export default globalRouter;
