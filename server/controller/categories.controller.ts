import { Request, Response } from 'express';
import {
	dbGetProductsByCategory,
	dbGetProductsByName,
	dbAddCategory,
} from '../model/categories.model';

export const getProductsWithCategory = async function (
	req: Request,
	res: Response
) {
	try {
		const categories = req.query.category;

		const products = await dbGetProductsByCategory(categories);

		res.status(200).json({ status: 'success', data: products });
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: (err as Error).message,
		});
	}
};

export const getProductsWithName = async function (
	req: Request,
	res: Response
) {
	try {
		const name = req.query.name as string;
		const products = await dbGetProductsByName(name);
		res.status(200).json({ status: 'success', data: products });
	} catch (err) {
		res.status(500).json({
			status: 'failure',
			message: (err as Error).message,
		});
	}
};

export const addCategory = async function (req: Request, res: Response) {
	let name = req.body.name;
	try {
		await dbAddCategory(name);
		return res.status(200).json({
			status: 'success',
			data: 'New category added successfully',
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: 'failure', message: 'New category adding failed' });
	}
};
