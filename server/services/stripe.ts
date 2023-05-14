import Stripe from 'stripe';

export default new Stripe(process.env.STRIPE_KEY as string, {
	apiVersion: '2022-11-15',
});
