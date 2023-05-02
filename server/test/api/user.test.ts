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

describe("POST /user endpoint", () => {
    test("Add new user with valid username, email and password", async () => {
        const response = await supertest(api).post("/user").send({
            name: "testtest",
            email: "testuser@gmail.com",
            password: "Testpassword@1234",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.data).toEqual("New user added successfully");
    });

    test("Add new user with invalid password", async () => {
        const response = await supertest(api).post("/user").send({
            name: "testtest",
            email: "testuser@gmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toEqual("failure");
        expect(response.body.data).toEqual("Invalid user data");
    });
    test("Add new user with invalid email", async () => {
        const response = await supertest(api).post("/user").send({
            name: "testtest",
            email: "testuserhotmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toEqual("failure");
        expect(response.body.data).toEqual("Invalid user data");
    });
    test("Add new user with invalid username", async () => {
        const response = await supertest(api).post("/user").send({
            name: "test@test",
            email: "testuser@hotmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.status).toEqual("failure");
        expect(response.body.data).toEqual("Invalid user data");
    });

    afterAll(async () => {
        dbDeleteUserByEmail("testuser@gmail.com");
    });
});
describe("DELETE /user endpoint", () => {
    beforeAll(async () => {
        await dbAddUser({
            id: 33,
            name: "test-user",
            email: "testuser@gmail.com",
            password: "test-password",
        });
    });

    test("delete existing user", async () => {
        const response = await supertest(api).delete("/user").send({
            email: "testuser@gmail.com",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.data).toEqual("User deleted successfully");
    });

    test("delete non-existing user", async () => {
        const response = await supertest(api).delete("/user").send({
            email: "nonexistentuser@gmail.com",
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toEqual("failure");
        expect(response.body.data).toEqual("User not found");
    });
});

afterAll(async () => {
    await disconnectMySQL();
});
