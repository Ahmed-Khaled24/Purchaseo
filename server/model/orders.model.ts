import { RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";
//Page with specified functions on each role
import {addNewOrder_customer, getOrder_customer, removeOrder_customer, updateOrder_customer, addNewOrder_company, getOrder_company, removeOrder_company, updateOrder_company} from '../model/Spec.orders.model';


async function addNewOrder(order: any){
  const {order_id, consumer_id, product_id, contract_id, time, quantity} = order;
  const userRole = await getUserRole_consumer(consumer_id);
  if (userRole === "customer") {
    return await addNewOrder_customer(order);
  } else if (userRole === "company") {
    return await addNewOrder_company(order);
  } else {
    throw new Error("Invalid user role");
  }
};

async function getOrder(id:any){
  const userRole = await getUserRole(id);
  if (userRole === "customer") {
    return await getOrder_customer(id);
  } else if (userRole === "company") {
    return await getOrder_company(id);
  } else {
    throw new Error("Invalid user role");
  }
};

async function updateOrder({id, update}:{id: any ,update: JSON}){
  const userRole = await getUserRole(id);
  if (userRole === "customer") {
    return await updateOrder_customer({id, update});
  } else if (userRole === "company") {
    return await updateOrder_company({id, update});
  } else {
    throw new Error("Invalid user role");
  }
};

async function removeOrder(id: any){
  const userRole = await getUserRole(id);
  if (userRole === "customer") {
    return await removeOrder_customer(id);
  } else if (userRole === "company") {
    return await removeOrder_company(id);
  } else {
    throw new Error("Invalid user role");
  }
};

//get role using user details
async function getUserRole_consumer(consumer_id:any) {
  const [rows, fields] = await dbConnection.execute("SELECT role FROM `user` WHERE user_id= ?", [consumer_id]);
  const ResultRows = rows as RowDataPacket[];
  return ResultRows[0].toString();
}

async function getUserRole(order_id:any) {
  try {
    const [rows1, fields1] = await dbConnection.execute("SELECT * FROM customer_order WHERE order_id = ?", [order_id]);
    const [rows2, fields2] = await dbConnection.execute("SELECT * FROM company_order WHERE order_id = ?", [order_id]);

    if ((rows1 as RowDataPacket[]).length > 0 ) {
      return "customer";
    } else if ((rows2 as RowDataPacket[]).length > 0) {
      return "company";
    } else {
      return "none";
    }
  } catch (error: any) {
    throw new Error(`Error searching for ID: ${(error as Error).message}`);
  }
};

export { addNewOrder, getOrder, removeOrder, updateOrder};
