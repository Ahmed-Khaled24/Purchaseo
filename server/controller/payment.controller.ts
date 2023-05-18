import { Request, Response } from "express";
import stripe from "../services/stripe";
import CheckoutData from "../types/Checkout";
import Stripe from "stripe";
import keys from "../config/keys";
import axios from "axios";

export async function generatePaymentSession(req: Request, res: Response) {
	let { products, currency }: CheckoutData = req.body;
	let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((item) => {
		return {
			quantity: item.quantity,
			price_data: {
				unit_amount: 100 * Number(item.pricePerUnit),
				currency: currency || "usd",
				product_data: {
					name: item.name,
					images: item.images,
				},
			},
		};
	});
	try {
		const paymentSession = await stripe.checkout.sessions.create({
			customer_creation: "always",
			customer_email: req.user?.email,
			invoice_creation: {
				enabled: true,
				invoice_data: { description: JSON.stringify(products) },
			},
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.SERVER_BASE_URL}/payment/redirect?success=true&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.SERVER_BASE_URL}/payment/redirect?cancel=true`,
		});
		return res.status(200).json({ status: "success", data: paymentSession.url });
	} catch (error) {
		return res.status(500).json({ status: "failure", data: (error as Error).message });
	}
}

export async function handlePaymentResult(req: Request, res: Response) {
	const { success, cancel, session_id } = req.query;
	if (success) {
		const paymentSession: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.retrieve(
			session_id as string
		);
		let products = JSON.parse(paymentSession.invoice_creation?.invoice_data.description as string).map(
			(item: any) => {
				return {
					[String(item.product_id)]: String(item.quantity),
				};
			}
		);
		products = products.reduce((acc: any, current: any) => {
			return {
				...acc,
				...current,
			};
		}, {});
		const orderDetails = {
			COD: "0",
			done_by_card: "1",
			total_price: String((paymentSession.amount_total as number) / 100),
			products: products,
		};
		res.redirect(`/orders/addOrder?orderDetails=${JSON.stringify(orderDetails)}`);
	}
	if (cancel) {
		const url = `${keys.FRONT_URL}/cart`;
		return res.redirect(url);
	}
}
