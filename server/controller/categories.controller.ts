import { Request, Response } from "express";
import {
	dbGetProductsByCategory,
	dbGetProductsByName,
	dbAddCategory,
} from "../model/categories.model";
import {
	dbGetImagesOfProducts,
	dbGetMultipleProductsByIds,
} from "../model/products.model";
import { Product } from "../types/Product";
import { RowDataPacket } from "mysql2";

export const getProductsWithCategory = async function (
	req: Request,
	res: Response
) {
	try {
		const categories = req.query.category;

		let productsIds = await dbGetProductsByCategory(categories);
		productsIds = productsIds.map((product: Product) => product.product_id);
		const products = await dbGetMultipleProductsByIds(productsIds);
		const productsImages = await dbGetImagesOfProducts(productsIds);
		const productsWithImages = (products as Product[]).map((product) => {
			return {
				...product,
				images: (productsImages as RowDataPacket[])
					.filter((image) => image.product_id === product.product_id)
					.map((image) => image.file_path),
			};
		});

		res.status(200).json({ status: "success", data: productsWithImages });
	} catch (err) {
		res.status(500).json({
			status: "failure",
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
		res.status(200).json({ status: "success", data: products });
	} catch (err) {
		res.status(500).json({
			status: "failure",
			message: (err as Error).message,
		});
	}
};

export const addCategory = async function (req: Request, res: Response) {
	let name = req.body.name;
	try {
		await dbAddCategory(name);
		return res.status(200).json({
			status: "success",
			data: "New category added successfully",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: "failure", message: "New category adding failed" });
	}
};
