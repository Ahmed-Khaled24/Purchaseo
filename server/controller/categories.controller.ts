import { Request, Response } from 'express';
import {
    dbGetProductsByCateogry,
    dbGetProductsWithTypeTool

} from '../model/categories.model';


const getProductsWithCategory = async function (req: Request, res: Response) {
    try {
        const categories = req.query.category;
        console.log(categories);

        const products = await dbGetProductsByCateogry(categories);

        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}


const getProductsWithTypeTool = async function (req: Request, res: Response) {
    try {
        const toolType = 't';
        const products = await dbGetProductsWithTypeTool(toolType);
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}

module.exports = {
    getProductsWithCategory,
    getProductsWithTypeTool,

}