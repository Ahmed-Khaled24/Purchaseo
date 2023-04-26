import { RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";

//All functions here will be changed accourding to the database design
async function addNewOrder( {}:{} }) : Promise<boolean> {
    const [rows, fields] = await dbConnection.execute("INSERT INTO Orders () VALUES (?)", []);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}
//function will take order id or combination of information to know which order exactly
async function getOrder(id:int) : Promise<RowDataPacket> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM Orders WHERE id= ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
};


// database design will change it
async function updateOrder({id, update}:{id: import {  } from "module"; ,update: any}) : Promise<boolean> {
    let parameter = Object.keys(update).map((key) => {
        return `${key} = ?`
    });
    let query = `UPDATE user SET ${parameter.join(", ")} WHERE id = ?` ;

    const [rows, fields] = await dbConnection.execute(query, [...Object.values(update),id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}


async function removeOrder(id: number) : Promise<boolean> {
    const [rows, fields] = await dbConnection.execute("DELETE FROM Orders WHERE id = ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}


export { addNewOrder, getOrder, removeOrder, updateOrder};
