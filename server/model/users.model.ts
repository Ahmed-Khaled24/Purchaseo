import { OkPacket, RowDataPacket } from "mysql2";
import { dbConnection } from "../services/mysql";
import { User } from "../types/User";
import { encryptPassword } from "../util/bcrypt";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { constructQueryFromObject } from "../util/DB/query.constructor";

//TODO: return the users as objects of type User

//----------------------GET----------------------//
export async function dbGetAllUsers(): Promise<User[]> {
    const [rows] = await dbConnection.execute("SELECT * FROM user");
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("Users not found", 404);
    }
    return rows as User[];
}
export async function dbGetUser(filter: Partial<User>) {
    const query = constructQueryFromObject("user", "select", {}, filter);
    const [rows] = await dbConnection.execute(query.query, query.queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as User[];
}

export async function dbGetUserById(id: string): Promise<User> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE user_id = ?",
        [id]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}

export async function dbGetUserByEmail(email: string): Promise<User> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE email = ?",
        [email]
    );
    console.log("***************************");
    console.log("dbGetUserByEmail");
    console.table(rows);
    console.log("***************************");

    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}

export async function dbGetUsersByName(name: string): Promise<User[]> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE name = ?",
        [name]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as User[];
}

export async function dbGetUserBySocialId(socialId: string): Promise<User> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE social_id = ?",
        [socialId]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}
//-----------------------------------------------------------ADD--------------------------------------------------------------------------//
// Change user type when we establish the user model
export async function dbAddUserEncrypted(user: Partial<User>): Promise<User> {
    //hash password
    if (user.password) {
        const encryptedPassword = await encryptPassword(user.password);
        user.password = encryptedPassword;
    }
    let { query, queryValues } = constructQueryFromObject(
        "user",
        "insert",
        user,
        {}
    );
    console.log({ query, queryValues });
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User couldn't be inserted", 500);
    }
    return (rows as User[])[0];
}

//-----------------------------------------------------------UPDATE--------------------------------------------------------------------------//

// TODO: waiting for the user model to know what to update
export async function dbUpdateUser({
    filter,
    update
}: {
    filter: Partial<User>;
    update: Partial<User>;
}): Promise<User> {
    if(update.password){
        const encryptedPassword = await encryptPassword(update.password);
        update.password = encryptedPassword;
    }
    const { query, queryValues } = constructQueryFromObject(
        "user",
        "update",
        update,
        filter
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}

export async function dbUpdateUserByEmail(email:string, update: Partial<User>){
    if(update.password){
        const encryptedPassword = await encryptPassword(update.password);
        update.password = encryptedPassword;
    }
    const {query, queryValues} = constructQueryFromObject("user", "update",update, {email}); 
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}

export async function dbUpdateUserById(id: number, update: Partial<User>) {
    if(update.password){
        const encryptedPassword = await encryptPassword(update.password);
        update.password = encryptedPassword;
    }
    const { query, queryValues } = constructQueryFromObject(
        "user",
        "update",
        update,
        { user_id: id }
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as User[])[0];
}
//-----------------------------------------------------------DELETE--------------------------------------------------------------------------//
export async function dbDeleteAllUsers(): Promise<string> {
    const query = "DELETE FROM user";
    const [rows] = await dbConnection.execute(query);
    // if ((rows as OkPacket).affectedRows === 0) {
    //     throw new ErrorWithStatusCode("table empty", 404);
    // }
    return `${(rows as OkPacket).affectedRows} rows deleted from user table` ;
}
export async function dbDeleteUserById(id: number): Promise<string> {
    const [rows] = await dbConnection.execute(
        "DELETE FROM user WHERE user_id = ?",
        [id]
    );
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return `user ${id} deleted from user table` ;
}

export async function dbDeleteUserByEmail(email: string): Promise<string> {
    const [rows] = await dbConnection.execute(
        "DELETE FROM user WHERE email = ?",
        [email]
    );
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return `user ${email} deleted from user table` ;
}
