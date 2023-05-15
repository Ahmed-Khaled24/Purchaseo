import { Request, Response } from 'express';

import {
	dbAddCategoriesToProduct,
	dbAddImagesToAProduct,
	dbAddNewProduct,
	dbDeleteProductById,
	dbGetCategoriesOfProducts,
	dbGetImagesOfProducts,
	dbGetProductById,
	dbGetProductsByOrderId,
	dbGetProductsBySellerId,
	dbUpdateProduct,
} from '../model/products.model';
import { RowDataPacket } from 'mysql2';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import { Product } from '../types/Product';
import { dbGetOrdersByCustomerId } from '../model/orders.model';

export async function getProductById(req: Request, res: Response) {
	let { id } = req.params;
	try {
		const product = await dbGetProductById(Number(id));
		res.status(200).json({
			status: 'success',
			data: product,
		});
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			data: err.message,
		});
	}
}

export async function getProductsBySellerId(req: Request, res: Response) {
	let { id } = req.params;
	try {
		const products = await dbGetProductsBySellerId(Number(id));
		const productsIDs = (products as Product[]).map(
			(product) => product.product_id
		);

		const images = await dbGetImagesOfProducts(productsIDs as number[]);
		const productsWithImages = (products as Product[]).map((product) => {
			return {
				...product,
				images: (images as RowDataPacket[])
					.filter((image) => image.product_id === product.product_id)
					.map((image) => image.file_path),
			};
		});

		const categories = await dbGetCategoriesOfProducts(
			productsIDs as number[]
		);
		const productsWithImagesAndCategories = productsWithImages.map(
			(product) => {
				return {
					...product,
					categories: (categories as RowDataPacket[])
						.filter(
							(category) =>
								category.product_id ==
								(product as RowDataPacket).product_id
						)
						.map((category) => category.category_name),
				};
			}
		);

		res.status(200).json({
			status: 'success',
			data: productsWithImagesAndCategories,
		});
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			data: err.message,
		});
	}
}

export async function getProductsByOrderedByCustomer(
	req: Request,
	res: Response
) {
	let { id } = req.params;
	try {
		const orders = await dbGetOrdersByCustomerId(Number(id));
		const ordersIds = (orders as RowDataPacket[]).map(
			(order) => order.order_id
		);
		if (ordersIds.length === 0) {
			throw new ErrorWithStatusCode(
				'This user has no previous orders',
				404
			);
		}
		const products = await dbGetProductsByOrderId(ordersIds);
		const productsIDs = (products as Product[]).map(
			(product) => product.product_id
		);
		const images = await dbGetImagesOfProducts(productsIDs as number[]);
		const productsWithImages = (products as Product[]).map((product) => {
			return {
				...product,
				images: (images as RowDataPacket[])
					.filter((image) => image.product_id === product.product_id)
					.map((image) => image.file_path),
			};
		});
		const categories = await dbGetCategoriesOfProducts(
			productsIDs as number[]
		);
		const productsWithImagesAndCategories = productsWithImages.map(
			(product) => {
				return {
					...product,
					categories: (categories as RowDataPacket[])
						.filter(
							(category) =>
								category.product_id ==
								(product as RowDataPacket).product_id
						)
						.map((category) => category.category_name),
				};
			}
		);
		res.status(200).json({
			status: 'success',
			data: productsWithImagesAndCategories,
		});
	} catch (err) {
		res.status((err as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (err as Error).message,
		});
	}
}

export async function addNewProduct(req: Request, res: Response) {
	const { product, images, categories } = req.body;
	try {
		// TODO: add a new function to the model doing these three steps using database transaction to ensure atomicity
		let dbAddProductResponse = await dbAddNewProduct(product);
		dbAddProductResponse = dbAddProductResponse as RowDataPacket[];
		const addedProductID = dbAddProductResponse[0].product_id;
		if (images) {
			await dbAddImagesToAProduct(addedProductID, images);
		}
		if (categories) {
			await dbAddCategoriesToProduct(addedProductID, categories);
		}
		res.status(201).json({ status: 'success', data: dbAddProductResponse });
	} catch (err: unknown) {
		res.status((err as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (err as Error).message,
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	let id = req.body.id;
	let updatedFields = req.body.product;
	updatedFields = updatedFields as Partial<Product>;
	try {
		const updatedProduct = await dbUpdateProduct(id, updatedFields);
		res.status(200).json({
			status: 'success',
			data: updatedProduct,
		});
	} catch (err: unknown) {
		res.status((err as ErrorWithStatusCode).statusCode || 500).json({
			status: 'failure',
			data: (err as Error).message,
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	let { id } = req.params;
	try {
		const deletedProduct = await dbDeleteProductById(Number(id));
		res.status(200).json({
			status: 'success',
			data: deletedProduct,
		});
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			data: err.message,
		});
	}
}
