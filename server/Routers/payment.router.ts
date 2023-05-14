import { Router } from 'express';

import {
	generatePaymentSession,
	handlePaymentResult,
} from '../controller/payment.controller';
import { mwValidatePaymentRequest } from '../middlewares/validation/paymentSession.middleware';

const paymentRouter = Router();

paymentRouter.post('/', mwValidatePaymentRequest, generatePaymentSession);
paymentRouter.get('/redirect', handlePaymentResult);
export default paymentRouter;
