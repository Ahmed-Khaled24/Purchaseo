import { Request, Response } from 'express';
import stripe from '../services/stripe';
import CheckoutData from '../types/Checkout';
import Stripe from 'stripe';

export async function generatePaymentSession(req: Request, res: Response) {
	let { products, currency }: CheckoutData = req.body;
	let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
		products.map((item) => {
			return {
				quantity: item.quantity,
				price_data: {
					unit_amount: 100 * Number(item.pricePerUnit),
					currency: currency || 'usd',
					product_data: {
						name: item.name,
						images: item.images,
					},
				},
			};
		});
	try {
		const paymentSession = await stripe.checkout.sessions.create({
			customer_creation: 'always',
			customer_email: req.user?.email,
			invoice_creation: {
				enabled: true,
				invoice_data: { description: JSON.stringify(products) },
			},
			line_items: lineItems,
			mode: 'payment',
			success_url: `${process.env.SERVER_BASE_URL}payment/redirect?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.SERVER_BASE_URL}payment/redirect?cancel=true`,
		});
		return res
			.status(200)
			.json({ status: 'success', data: paymentSession.url });
	} catch (error) {
		return res
			.status(500)
			.json({ status: 'failure', data: (error as Error).message });
	}
}

export async function handlePaymentResult(req: Request, res: Response) {
	const { success, cancel, session_id } = req.query;
	const paymentSession = await stripe.checkout.sessions.retrieve(
		session_id as string
	);
	if (success) {
		return res.status(200).json({
			status: 'success',
			data: 'Purchased successfully',
			orderDetails: JSON.parse(
				paymentSession.invoice_creation?.invoice_data
					.description as string
			),
			customerEmail: paymentSession.customer_details?.email,
		});
	}
	if (cancel) {
		// TODO: redirect to cart page
		return res.status(500).json({
			status: 'failure',
			data: 'Payment canceled',
		});
	}
}
