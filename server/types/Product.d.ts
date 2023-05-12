type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export interface Product {
	product_id?: number;
	sold_quantity?: number;
	approved_by?: number;
	description?: string;
	rating?: number;
	approval_status?: ApprovalStatus;
	discount?: number;
	brand?: string;
	approve_date?: string;
	added_by: number;
	product_name: string;
	inventory: number;
	price: number;
}

export interface ProductImage {
	image_id: number;
	product_id: number;
	file_path: string;
	name: string
}