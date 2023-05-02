import { OkPacket, RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";

async function dbGetUserById(id: string): Promise<RowDataPacket> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE user_id = ?",
        [id]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as RowDataPacket[])[0];
}

async function dbGetUserByEmail(email: string): Promise<RowDataPacket> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE email = ?",
        [email]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return (rows as RowDataPacket[])[0];
}

async function dbGetUsersByName(name: string): Promise<RowDataPacket[]> {
    const [rows] = await dbConnection.execute(
        "SELECT * FROM user WHERE name = ?",
        [name]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as RowDataPacket[];
}

// Change user type when we establish the user model
async function dbAddUser({ id, name, email, password }: any): Promise<boolean> {
    let query;
    let queryValues;
    if (!id) {
        query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
        queryValues = [name, email, password];
    } else {
        query =
            "INSERT INTO user (user_id, name, email, password) VALUES (?, ?, ?, ?)";
        queryValues = [id, name, email, password];
    }

    const [rows] = await dbConnection.execute(query, queryValues);

    return (rows as RowDataPacket[]) ? true : false;
}

// waiting for the user model to know what to update
async function dbUpdateUserByEmail({
    email,
    update,
}: {
    email: string;
    update: any;
}): Promise<RowDataPacket[]> {
    /* HELPER FUNCTION FOR UDPATE */
    let updateParams = Object.keys(update).map((key) => {
        return `${key} = ?`;
    });
    let query = `UPDATE user SET ${updateParams.join(", ")} WHERE email = ?`;

    const [rows] = await dbConnection.execute(query, [
        ...Object.values(update),
        email,
    ]);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as RowDataPacket[];
}

async function dbDeleteUserById(id: number): Promise<RowDataPacket[]> {
    const [rows] = await dbConnection.execute(
        "DELETE FROM user WHERE user_id = ?",
        [id]
    );
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as RowDataPacket[];
}

async function dbDeleteUserByEmail(email: string): Promise<RowDataPacket[]> {
    const [rows] = await dbConnection.execute(
        "DELETE FROM user WHERE email = ?",
        [email]
    );
    if ((rows as OkPacket).affectedRows === 0) {
        throw new ErrorWithStatusCode("User not found", 404);
    }
    return rows as RowDataPacket[];
}

export {
    dbGetUserById,
    dbGetUserByEmail,
    dbGetUsersByName,
    dbAddUser,
    dbDeleteUserById,
    dbDeleteUserByEmail,
    dbUpdateUserByEmail,
};
