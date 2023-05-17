import { Request, Response } from "express";
import { addNewOrder, getOrder, removeOrder } from "../model/orders.model";
import { dbConnection } from "../services/mysql";
import keys from "../config/keys";

async function addNewOrderC(req: Request, res: Response) {
	let order = req.body;
	if (req.method === "GET") {
		order = JSON.parse(req.query.orderDetails as string);
	}
	order.customer_id = req.user?.user_id;
	try {
		await dbConnection.beginTransaction();
		let stat = await addNewOrder(order);
		if (stat === false) {
			await dbConnection.rollback();
			return res.redirect(`${keys.FRONT_URL}/orders/redirect/failure`);
		}
		await dbConnection.commit();
		return res.redirect(`${keys.FRONT_URL}/orders/redirect/success`);
	} catch (error) {
		await dbConnection.rollback();
		return res.redirect(`${keys.FRONT_URL}/orders/redirect/failure`);
	}
}

//The function return the response takin from database
async function getOrderC(req: Request, res: Response) {
	let id = req.params["id"];
	try {
		let order = await getOrder(id);
		if (order == null) return res.status(404).json({ status: "failure", data: "No order found" });
		return res.status(200).json({ status: "success", data: order });
	} catch (error) {
		return res.status(500).json({ status: "failure", data: (error as Error).message });
	}
}

async function removeOrderC(req: Request, res: Response) {
	let id = req.params["id"];
	try {
		await dbConnection.beginTransaction(); // Start a transaction
		await removeOrder(id); // Remove the order
		await dbConnection.commit(); // Commit the transaction
		return res.status(200).json({ status: "success", data: "Order deleted successfully!" });
	} catch (error) {
		console.log(`Order deletion error: ${error}`);
		await dbConnection.rollback(); // Roll back the transaction
		return res.status(500).json({
			status: "failure",
			data: "Order deletion failed, try again",
		});
	}
}

export { addNewOrderC, getOrderC, removeOrderC };
