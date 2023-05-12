import { Request, Response } from 'express';
import {
    dbGetProductsByCateogry,
    dbGetProductsByName,
    dbAddCategory

} from '../model/categories.model';


const getProductsWithCategory = async function (req: Request, res: Response) {
    try {
        const categories = req.query.category;

        const products = await dbGetProductsByCateogry(categories);

        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}

const getProductsWithName = async function (req: Request, res: Response) {
    try {
        const name = req.params.name;

        const products = await dbGetProductsByName(name);

        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const addCategory = async function (req: Request, res: Response) {
    let name = req.body.name;
    try {
        await dbAddCategory(name);
        return res.status(200).json({ message: 'New category added successfully' });

    } catch (error) {
        console.log(`category adding error: ${error}`);
        return res.status(500).json({ message: 'New category adding failed' });
    }
}


module.exports = {
    getProductsWithCategory,
    getProductsWithName,
    addCategory
}