import { Request, Response } from 'express';

import {
	dbAddNewProduct,
	dbDeleteProductById,
	dbGetProductById,
	dbUpdateProductById,
} from '../model/products.model';

export async function getProduct(req: Request, res: Response) {
	const id = req.params.id;
	try {
		const product = await dbGetProductById(id);
		res.status(200).json({ status: 'success', data: product });
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function addNewProduct(req: Request, res: Response) {
	const product = req.body;
	try {
		const dbResponse = await dbAddNewProduct(product);
		res.status(200).json({ status: 'success', data: dbResponse });
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	const { id } = req.body;
	try {
		const deletedProduct = await dbDeleteProductById(id);
		res.status(200).json({
			status: 'success',
			data: deletedProduct,
		});
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	const id = req.body.id;
	const newProduct = req.body.product;
	try {
		const updatedProduct = await dbUpdateProductById(id, newProduct);
		res.status(200).json({
			status: 'success',
			data: updatedProduct,
		});
	} catch (err: any) {
		res.status(err.statusCode || 500).json({
			status: 'failure',
			message: err.message,
		});
	}
}
