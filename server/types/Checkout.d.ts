export default interface CheckoutData {
	products: CheckoutProduct[];
	currency?: string; // default to usd
}

type CheckoutProduct = {
	product_id: number | string;
	name: string;
	pricePerUnit: number;
	quantity: number;
	images: string[]; // URLs to images photos 8 at most
};
