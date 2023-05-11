import supertest from "supertest";
import api from "../../api";
import { connectMySQL, disconnectMySQL } from "../../services/mysql";
import {
    dbAddUserEncrypted,
    dbDeleteAllUsers,
    dbDeleteUserByEmail,
    dbDeleteUserById,
    dbGetUserById,
} from "../../model/users.model";

beforeAll(async () => {
    await connectMySQL();
});

describe("GET /user endpoint", () => {
    beforeAll(async () => {
        await dbAddUserEncrypted({
            user_id: 33,
            Fname: "testuser",
            Lname: "testuser",
            email: "testuser@gmail.com",
            password: "test@Password123",
        });
    });

    test("get existing user by id", async () => {
        const response = await supertest(api).get("/user/id/33");
        expect(response.statusCode).toBe(200);
    });

    test("get non-existing user by id", async () => {
        const response = await supertest(api).get("/user/id/555");
        expect(response.statusCode).toBe(404);
    });

    test("get existing user by email", async () => {
        const response = await supertest(api).get(
            "/user/email/testuser@gmail.com"
        );
        expect(response.statusCode).toBe(200);
    });

    test("get non-existing user by email", async () => {
        const response = await supertest(api).get(
            "/user/email/testuser222@gmail.com"
        );
        expect(response.statusCode).toBe(404);
    });

    afterAll(async () => {
        dbDeleteUserByEmail("testuser@gmail.com");
    });
});

describe("POST /user endpoint", () => {
    test("Add new user with valid username, email, password and role", async () => {
        const response = await supertest(api).post("/user/add").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuser@gmail.com",
            password: "Testpassword@1234",
            role: "Customer",
        });
        expect(response.statusCode).toBe(200);
    });

    test("Add new user with invalid password", async () => {
        const response = await supertest(api).post("/user/add").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuser@gmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid email", async () => {
        const response = await supertest(api).post("/user/add").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuserhotmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid username", async () => {
        const response = await supertest(api).post("/user/add").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuser@hotmail.com",
            password: "Testpassword1234",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid role", async () => {
        const response = await supertest(api).post("/user/add").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuser@gmail.com",
            password: "Testpassword@1234",
            role: "student",
        });
        expect(response.statusCode).toBe(400);
    });
    afterAll(async () => {
        dbDeleteUserByEmail("testuser@gmail.com");
    });
});

describe("DELETE /user endpoint", () => {
    beforeAll(async () => {
        await dbAddUserEncrypted({
            user_id: 33,
            Fname: "testuser",
            email: "testuser@gmail.com",
            password: "test@123Password",
        });
    });

    test("delete existing user", async () => {
        const response = await supertest(api).delete("/user/delete").send({
            email: "testuser@gmail.com",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.data).toEqual("User deleted successfully");
    });

    test("delete non-existing user", async () => {
        const response = await supertest(api).delete("/user/delete").send({
            email: "nonexistentuser@gmail.com",
        });
        expect(response.statusCode).toBe(404);
        expect(response.body.status).toEqual("failure");
        expect(response.body.data).toEqual("User not found");
    });
});

describe("PATCH /user/ endpoint", () => {
    beforeAll(async () => {
        await dbAddUserEncrypted({
            user_id: 52,
            Fname: "testuser",
            Lname: "testuser",
            email: "testuser1@gmail.com",
            password: "test@Password123",
        });
    });

    test("update existing user", async () => {
        let update = {
            Fname:"testinguser2",
            password: "test@123Password123",
        };
        const response = await supertest(api)
            .patch("/user/update")
            .send({ email: "testuser1@gmail.com", update: update });
        expect(response.statusCode).toBe(200);
    });
    test("update non-existing user", async () => {
        let update = {
            email: "testuser2@gmail.com",
            password: "test@123Password123",
        };
        const response = await supertest(api)
            .patch("/user/update")
            .send({ email: "testuser55@gmail.com", update: update });

        expect(response.statusCode).toBe(404);
    });

    test("partially update existing user with invalid fields", async () => {
        let update = {
            email: "testuser2@gmail.com",
            SSN: 102,
        };
        const response = await supertest(api)
            .patch("/user/update")
            .send({ email: "testuser1@gmail.com", update: update });
            
        expect(response.statusCode).toBe(500);
    });

    test("partially update existing user with valid fields and invalid data", async () => {
        let update = {
            email: "testuser2@gmail.com",
            password: "testPassword",
        };

        const response = await supertest(api)
            .patch("/user/update")
            .send({ email: "testuser1@gmail.com", update: update });
            

        expect(response.statusCode).toBe(400);
    });

    afterAll(async () => {
        await dbDeleteUserById(52);
    });

});

afterAll(async () => {
    await dbDeleteAllUsers();
    await disconnectMySQL();
});
