import { RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";

async function getUserById(id: string) : Promise<RowDataPacket> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM user WHERE user_id = ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
};

async function getUserByEmail(email: string) : Promise<RowDataPacket> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM user WHERE email = ?", [email]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows[0];
}

async function getUsersByName(name: string) : Promise<RowDataPacket[]> {
    const [rows, fields] = await dbConnection.execute("SELECT * FROM user WHERE name = ?", [name]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows;
}

// Change user type when we establish the user model
async function addUser( {name, email, password}:{name: string, email: string, password: string}) : Promise<boolean> {
    const [rows, fields] = await dbConnection.execute("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}

// waiting for the user model to know what to update
async function updateUserByEmail({email, update}:{email: string ,update: any}) : Promise<boolean> {
    let updateParams = Object.keys(update).map((key) => {
        return `${key} = ?`
    });
    let query = `UPDATE user SET ${updateParams.join(", ")} WHERE email = ?` ;
    console.log([...Object.values(update),email])
    const [rows, fields] = await dbConnection.execute(query, [...Object.values(update),email]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}

async function deleteUserById(id: number) : Promise<boolean> {
    const [rows, fields] = await dbConnection.execute("DELETE FROM user WHERE id = ?", [id]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}

async function deleteUserByEmail(email: string) : Promise<boolean> {
    const [rows, fields] = await dbConnection.execute("DELETE FROM user WHERE email = ?", [email]);
    const ResultRows = rows as RowDataPacket[];
    return ResultRows? true : false;
}

export { getUserById,
         getUserByEmail,
         getUsersByName,
         addUser,
         deleteUserById,
         deleteUserByEmail,
         updateUserByEmail 
        };