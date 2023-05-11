import { RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";


async function addNewOrder_customer( order : any ){
    const {order_id, COD, customer_id, done_by_card, total_price} = order;
    const [rows, fields] = await dbConnection.execute("INSERT INTO `customer_order` (`order_id`, `COD`, `customer_id`, `done_by_card`, `total_price`) VALUES (?,?,?,?,?)", [order_id, COD, customer_id, done_by_card, total_price]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};

async function addNewOrder_company( order : any ){
    const {order_id, consumer_id, product_id, contract_id, time, quantity} = order;
    const [rows, fields] = await dbConnection.execute("INSERT INTO `company_order` (`order_id`, `consumer_id`, `product_id`, `contract_id`, `time`, `quantity`) VALUES (?,?,?,?,?,?)", [order_id, consumer_id, product_id, contract_id, time, quantity]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};


async function getOrder_customer(id:any) : Promise<RowDataPacket> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM order_products WHERE order_id= ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
};

async function getOrder_company(id:any) : Promise<RowDataPacket> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM order_products WHERE order_id= ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
};

//Who insers in order_products?

async function updateOrder_customer({id, update}:{id: any ,update: any}){
    let parameter = Object.keys(update).map((key) => {
        return `${key} = ?`
    });
    let query = `UPDATE customer_order SET ${parameter.join(", ")} WHERE order_id = ?` ;

    const [rows, fields] = await dbConnection.execute(query, [...Object.values(update),id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};
// database design will change it
async function updateOrder_company({id, update}:{id:any ,update: any}){
    let parameter = Object.keys(update).map((key) => {
        return `${key} = ?`
    });
    let query = `UPDATE company_order SET ${parameter.join(", ")} WHERE order_id = ?` ;

    const [rows, fields] = await dbConnection.execute(query, [...Object.values(update),id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};



async function removeOrder_customer(id: any) {

    const [rows, fields] = await dbConnection.execute("DELETE FROM customer_order WHERE order_id = ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};
async function removeOrder_company(id: any){

    const [rows, fields] = await dbConnection.execute("DELETE FROM company_order WHERE order_id= ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
};


export { addNewOrder_customer, getOrder_customer, removeOrder_customer, updateOrder_customer, addNewOrder_company, getOrder_company, removeOrder_company, updateOrder_company};
