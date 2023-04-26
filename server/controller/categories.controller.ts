import { Request, Response } from 'express';
import {
    dbGetProductsByCateogry,
    dbGetProductsWithTypeTool

} from '../model/categories.model';



const getClothes = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('clothes');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}

const getClothesMen = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('clothesMen');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const getClothesWomen = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('clothesWomen');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}

const getClothesKids = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('clothesKids');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const getHomeAppliance = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('homeAppkiance');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const getElectronics = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('electronics');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const getElectronicPhones = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('electronicsPhones');
        res.status(200).json({ status: 'success', data: products });
    } catch (err) {
        res.status(500).json({
            status: 'failure',
            message: err.message,
        });
    }
}
const getElectronicComputers = async function (req: Request, res: Response) {
    try {
        const products = await dbGetProductsByCateogry('electronicsComputers');
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
    getClothes,
    getClothesMen,
    getClothesWomen,
    getClothesKids,
    getHomeAppliance,
    getElectronics,
    getElectronicPhones,
    getElectronicComputers,
    getProductsWithTypeTool,

}