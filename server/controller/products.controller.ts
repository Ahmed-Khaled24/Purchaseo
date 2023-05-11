import { Request, Response } from 'express';

import {
	dbAddCategoriesToProduct,
	dbAddImagesToAProduct,
	dbAddNewProduct,
	dbDeleteProductById,
	dbGetProductById,
	dbUpdateProduct,
} from '../model/products.model';
import { RowDataPacket } from 'mysql2';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import { Product } from '../types/Product';

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

export async function addNewProduct(req: Request, res: Response) {
	const { product, images, categories } = req.body;
	try {
		// TODO: add a new function to the model doing these three steps using database transaction to ensure atomicity
		let dbAddProductResponse = await dbAddNewProduct(product);
		dbAddProductResponse = dbAddProductResponse as RowDataPacket[];
		const addedProductID = dbAddProductResponse[0].product_id;
		await dbAddImagesToAProduct(addedProductID, images);
		await dbAddCategoriesToProduct(addedProductID, categories);
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
