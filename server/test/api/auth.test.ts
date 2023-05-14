import supertest from "supertest";
import api from "../../api";
import { dbAddUserEncrypted, dbDeleteAllUsers } from "../../model/users.model";
import { connectMySQL, disconnectMySQL } from "../../services/mysql";

beforeAll(async () => {
    await connectMySQL();
    await dbAddUserEncrypted({
        user_id: 33,
        Fname: "testAdmin",
        Lname: "testAdmin",
        email: "testAdmin1234@gmail.com",
        password: "test@Password123",
        role: "Admin",
    });
});
afterAll(async () => {
    await dbDeleteAllUsers();
    await disconnectMySQL();
});

describe("POST /signup endpoint", () => {
    test("Add new user with valid username, email, password and role", async () => {
        const response = await supertest(api).post("/auth/signup").send({
            Fname: "testtest",
            Lname: "testtest",
            email: "testuser122@gmail.com",
            password: "test@Password123",
            role: "Customer",
        });
        expect(response.statusCode).toBe(200);
    });

    test("Add new user with invalid username", async () => {
        const response = await supertest(api).post("/auth/signup").send({
            Fname: "testtest@2",
            Lname: "testtest",
            email: "testuser123@gmail.com",
            password: "test@Password123",
            role: "Customer",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid email", async () => {
        const response = await supertest(api).post("/auth/signup").send({
            Fname: "testtest@2",
            Lname: "testtest",
            email: "testuser121.com",
            password: "test@Password123",
            role: "Customer",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid password", async () => {
        const response = await supertest(api).post("/auth/signup").send({
            Fname: "testtest@2",
            Lname: "testtest",
            email: "testuser123@gmail.com",
            password: "test123",
            role: "Customer",
        });
        expect(response.statusCode).toBe(400);
    });
    test("Add new user with invalid role", async () => {
        const response = await supertest(api).post("/auth/signup").send({
            Fname: "testtest@2",
            Lname: "testtest",
            email: "testuser123@gmail.com",
            password: "test@Password123",
            role: "teacher",
        });
        expect(response.statusCode).toBe(400);
    });
});
describe("POST /local endpoint", () => {
    test("login with valid email and password", async () => {
        const response = await supertest(api).post("/auth/local").send({
            email: "testAdmin1234@gmail.com",
            password: "test@Password123",
        })
        .redirects(1);
        expect(response.statusCode).toBe(200);
    });
    test("login with invalid email", async () => {
        const response = await supertest(api).post("/auth/local").send({
            email: "testuser121.com",
            password: "test@Password123",
        })
        .redirects(1);
        expect(response.statusCode).toBe(401);
    });
    test("login with invalid password", async () => {
        const response = await supertest(api).post("/auth/local").send({
            email: "testuser121@gmail.com",
            password: "test123",
        })
        .redirects(1);
        expect(response.statusCode).toBe(401);
    });
});
