import { Request, Response } from 'express';
import {addNewOrder, getOrder, removeOrder, updateOrder} from '../model/orders.model';


async function addNewOrderC(req: Request, res: Response){
    let order = req.body;
    // We should validate the user data here but we still don't know what to validate yet
    try {
        await addNewOrder(order);
        return res.status(200).json({message: 'New order added successfully'});

    } catch (error) {
        console.log(`Order adding error: ${error}`);
        return res.status(500).json({message: "Can't add new order now"});
    }
};

//The function return the response takin from database
async function getOrderC (req: Request, res: Response) {
    let id = req.params['id'];
    try {
        let order = await getOrder(id);
        return res.status(200).json({message: 'Order is found', order});

    } catch (error) {
        console.log(`Order finding error: ${error}`);
        return res.status(500).json({message: 'Order finding failed'});
    }
};

//Will be changed accourding to database
async function removeOrderC (req: Request, res: Response) {
    let id = req.params['id'];
    try {
        await removeOrder(id);
        return res.status(200).json({message: 'Order deleted successfully!'});

    } catch (error) {
        console.log(`Order deletion error: ${error}`);
        return res.status(500).json({message: 'Order deletion failed, try again'});
    }
};


async function updateOrderC (req: Request, res: Response) {
    let {id, update} = req.body;
    update = JSON.parse(update);
    try {
        await updateOrder({id, update});
        return res.status(200).json({message: 'Details of order updated successfully'});

    } catch (error) {
        console.log(`orders updating error: ${error}`);
        return res.status(500).json({message: "Can't update order now"});
    }
};



export {addNewOrderC, getOrderC, removeOrderC, updateOrderC}
