import supertest from "supertest";
import api from "../../api";
import { connectMySQL, disconnectMySQL } from "../../service/mysql";
import {
    dbAddUser,
    dbDeleteUserByEmail,
    dbDeleteUserById,
    dbGetUserById,
} from "../../model/users.model";

beforeAll(async () => {
    await connectMySQL();
});

describe("GET /user endpoint", () => {
    beforeAll(async () => {
        await dbAddUser({
            id: 33,
            name: "test-user",
            email: "testuser@gmail.com",
            password: "test-password",
        });
    });

    test("get existing user by id", async () => {
        const response = await supertest(api).get("/user/id/33");
        const expected = {
            user_id: 33,
            name: "test-user",
            email: "testuser@gmail.com",
            password: "test-password",
        };
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual(expected);
    });

    test("get non-existing user by id", async () => {
        const response = await supertest(api).get("/user/id/555");
        expect(response.statusCode).toBe(404);
        expect(response.body.data).toBe("User not found");
    });

    test("get existing user by email", async () => {
        const response = await supertest(api).get(
            "/user/email/testuser@gmail.com"
        );
        const expected = {
            user_id: 33,
            name: "test-user",
            email: "testuser@gmail.com",
            password: "test-password",
        };
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual(expected);
    });

    test("get non-existing user by email", async () => {
        const response = await supertest(api).get(
            "/user/email/testuser222@gmail.com"
        );
        expect(response.statusCode).toBe(404);
        expect(response.body.data).toBe("User not found");
    });

    afterAll(async () => {
        dbDeleteUserByEmail("testuser@gmail.com");
    });
});

afterAll(async () => {
    await disconnectMySQL();
});
