export interface Review {
	product_id: number | string;
	customer_id: number | string;
	rate: number;
	date?: string;
	body: string;
}
