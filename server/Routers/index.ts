import { Router } from 'express';
import userRouter from './user.router';
import productRouter from './products.router';
import authRouter from './auth.router';
import categoryRouter from './categories.router';
import reviewRouter from './review.router';
import ordersRouter from './orders.router';
import imageRouter from './image.router';
import { mwCheckLoginStatus } from '../middlewares/auth/user.middleware';
import paymentRouter from './payment.router';

const globalRouter = Router();

globalRouter.use('/user', userRouter);
globalRouter.use('/product', productRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/categories', categoryRouter);
globalRouter.use('/review', reviewRouter);
globalRouter.use('/orders', ordersRouter);
globalRouter.use('/payment', paymentRouter);
globalRouter.use('/image', mwCheckLoginStatus('loggedIn'), imageRouter);
// TODO: React build file
globalRouter.get('/*', (req, res) => {
	res.status(404).json({ status: 'failure', data: 'path not found' });
});

export default globalRouter;
