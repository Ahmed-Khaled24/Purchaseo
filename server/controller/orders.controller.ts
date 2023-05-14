import { Request, Response } from 'express';
import { addNewOrder, getOrder, removeOrder } from '../model/orders.model';
import { dbConnection } from '../services/mysql';

async function addNewOrderC(req: Request, res: Response) {
	let order = req.body;
	try {
		await dbConnection.beginTransaction(); // Start a transaction
		let stat = await addNewOrder(order); // Insert the order
		if (stat === false) {
			await dbConnection.rollback();
			return res.status(500).json({ message: "Can't add new order now" });
		}
		await dbConnection.commit(); // Commit the transaction
		return res
			.status(200)
			.json({ message: 'New order added successfully' });
	} catch (error) {
		console.log(`Order adding error: ${error}`);
		await dbConnection.rollback(); // Roll back the transaction
		return res.status(500).json({ message: "Can't add new order now" });
	}
}

//The function return the response takin from database
async function getOrderC(req: Request, res: Response) {
	let id = req.params['id'];
	try {
		let order = await getOrder(id);
		if (order == null)
			return res.status(404).json({ message: 'No order with id=' + id });
		return res.status(200).json({ message: 'Order is found' });
	} catch (error) {
		console.log(`Order finding error: ${error}`);
		return res.status(500).json({ message: 'Order finding failed', id });
	}
}

async function removeOrderC(req: Request, res: Response) {
	let id = req.params['id'];
	try {
		await dbConnection.beginTransaction(); // Start a transaction
		await removeOrder(id); // Remove the order
		await dbConnection.commit(); // Commit the transaction
		return res.status(200).json({ message: 'Order deleted successfully!' });
	} catch (error) {
		console.log(`Order deletion error: ${error}`);
		await dbConnection.rollback(); // Roll back the transaction
		return res
			.status(500)
			.json({ message: 'Order deletion failed, try again' });
	}
}

export { addNewOrderC, getOrderC, removeOrderC };
