import { Request, Response } from 'express';
import {
	dbAddNewProduct,
	dbDeleteProductById,
	dbGetProductById,
	dbUpdateProductById,
} from '../model/products.model';

export async function getProduct(req: Request, res: Response) {
	const productId = req.params.productId;
	try {
		const product = await dbGetProductById(productId);
		res.status(200).json({ status: 'success', data: product });
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function addNewProduct(req: Request, res: Response) {
	const product = req.body.product;
	try {
		const newProduct = await dbAddNewProduct(product);
		res.status(200).json({ status: 'success', data: newProduct });
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function deleteProduct(req: Request, res: Response) {
	const productId = req.params.productId;
	try {
		const deletedProduct = await dbDeleteProductById(
			(productId)
		);
		res.status(200).json({
			status: 'success',
			data: deletedProduct,
		});
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: err.message,
		});
	}
}

export async function updateProduct(req: Request, res: Response) {
	const productId = req.params.productId;
	const newProduct = req.body.product;
	try {
		const updatedProduct = await dbUpdateProductById(
			productId,
			newProduct
		);
		res.status(200).json({
			status: 'success',
			data: updatedProduct,
		});
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: err.message,
		});
	}
}
