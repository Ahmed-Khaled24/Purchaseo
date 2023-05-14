import { Router } from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import authRouter from './auth.router';
import categoryRouter from './categories.router';
import reviewRouter from './review.router';
import ordersRouter from './orders.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/categories', categoryRouter);
globalRouter.use('/review', reviewRouter);
globalRouter.use('/orders', ordersRouter);

export default globalRouter;
