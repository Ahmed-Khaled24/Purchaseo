import { RowDataPacket } from "mysql2";
import { OkPacket } from 'mysql2';
import { dbConnection } from "../service/mysql";

type QueryResponse = // alias for return value from execute()
	| RowDataPacket[]
	| RowDataPacket[][]
	| never;

//DONE
async function addNewOrder_customer( order : any ) {
	//Products--> a nested JSON with all products in the order
	const { order_id, COD, customer_id, done_by_card, total_price, products } = order;
  const productsArr = [];
  for (const [product_id, quantity] of Object.entries(products)) {
    productsArr.push({ product_id, quantity });
   }

	  console.log(productsArr);
     const [rows, fields] = await dbConnection.execute("INSERT INTO `customer_order` (`order_id`, `COD`, `customer_id`, `done_by_card`, `total_price`) VALUES (?,?,?,?,?)", [order_id, COD, customer_id, done_by_card, total_price]);
		 const ResultRows = rows as OkPacket[];

		 // Retrieve order ID
 const [selectResult, selectFields] = await dbConnection.execute(
	 "SELECT LAST_INSERT_ID()"
 );
		 const orderId = Object.values((selectResult as OkPacket[])[0])[0];
		 console.log(orderId);

		try {
  for (const { product_id, quantity } of productsArr) {
    const [result] = await dbConnection.execute("INSERT INTO `order_products` (`order_id`, `product_id`, `quantity`) VALUES (?,?,?)", [orderId, product_id, quantity]);
    const okPacket = result as OkPacket;
		//Update sold quantity in product table
	  try{
			let increment = await increment_quantity(product_id, quantity);
		}
		catch(error){
			console.error("Error incrementing the quantity:", error);
			return false;
		}
    if (okPacket.affectedRows !== 1) {
      console.error("Failed to insert order product");
			return false;
    }
  }
} catch (error) {
  console.error("Error inserting order products:", error);
	return false;
}
    return ResultRows? true : false;
};

//increment the sold quantity in products table
async function increment_quantity(product_id: any, quantity: any) {
	let query = `UPDATE product SET sold_quantity = sold_quantity + ? WHERE product_id = ?` ;
	const [rows, fields] = await dbConnection.execute(query, [quantity,product_id]);
	const ResultRows = rows as RowDataPacket[];
	return ResultRows? true : false;
}
//Decrement the sold quantity when removing an order
async function decrement_quantity(product_id: any, quantity: any) {
	let query = `UPDATE product SET sold_quantity = sold_quantity - ? WHERE product_id = ?` ;
	const [rows, fields] = await dbConnection.execute(query, [quantity,product_id]);
	const ResultRows = rows as RowDataPacket[];
	return ResultRows? true : false;
}

//Still don't get it!
async function addNewOrder_company( order : any ) {
    const {order_id, consumer_id, product_id, contract_id, time, quantity} = order;
    const [rows, fields] = await dbConnection.execute("INSERT INTO `company_order` (`order_id`, `consumer_id`, `product_id`, `contract_id`, `time`, `quantity`) VALUES (?,?,?,?,?,?)", [order_id, consumer_id, product_id, contract_id, time, quantity]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};

async function getOrder_customer(id:any){
	console.log(id);
    const [rows, fields] = await dbConnection.execute("SELECT * FROM order_products WHERE order_id= ?", [id]);
		if ((rows as RowDataPacket[]).length === 0) {return null;}
    const ResultRows = rows as RowDataPacket[];
    console.log("ResultRows");
    return ResultRows[0];
};

async function getOrder_company(id:any) {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM order_products WHERE order_id= ?", [id]);
		if ((rows as RowDataPacket[]).length === 0) {return null;}
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
};


async function removeOrder_customer(id: any) {
	 console.log(id);
    const [rows] = await dbConnection.execute("DELETE FROM customer_order WHERE order_id = ?", [id]);
		const [rows2] = await dbConnection.execute("DELETE FROM order_products WHERE order_id = ?", [id]);
    return  rows&&rows2
};
async function removeOrder_company(id: any){

    const [rows, fields] = await dbConnection.execute("DELETE FROM company_order WHERE order_id= ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};


export { addNewOrder_customer, getOrder_customer, removeOrder_customer, addNewOrder_company, getOrder_company, removeOrder_company};
