import { User } from "../../types/User";
import { constructQueryFromObject } from "../../util/query.constructor";

describe("test insert query constructor", () => {
    // test("test invalid query type", async () => {
    //     let userObj = {
    //         name: "test-user-2",
    //         email: "testuser55@gmail.com",
    //     }
    //     expect( () => {constructQueryFromObject('user', 'upsert' ,userObj, null);} ).toThrow(Error);
    // });
    test("test insert query", () => {
        let userObj = {
            name: "test-user-2",
            email: "testuser55@gmail.com",
        };
        const query = constructQueryFromObject("user", "insert", userObj, {});
        expect(query.query).toEqual(
            "INSERT INTO user (name, email) VALUES (?, ?)"
        );
        expect(query.queryValues).toEqual([
            "test-user-2",
            "testuser55@gmail.com",
        ]);
    });
});

describe("test update query constructor", () => {
    test("test update query with single condition", () => {
        let userObj = {
            name: "test-user-3",
            email: "testuser66@gmail.com",
        };
        let condiition = { phone: "01004102505" };
        const query = constructQueryFromObject(
            "user",
            "update",
            userObj,
            condiition
        );
        expect(query.query).toEqual(
            "UPDATE user SET name = ?, email = ? WHERE phone = ?"
        );
        expect(query.queryValues).toEqual([
            "test-user-3",
            "testuser66@gmail.com",
            "01004102505",
        ]);
    });
    test("test update query with multiple conditions", () => {
        let userObj = {
            name: "test-user-3",
            email: "testuser66@gmail.com",
        };
        let condiition = { phone: "01004102505", socialId: "19018823" };
        const query = constructQueryFromObject(
            "user",
            "update",
            userObj,
            condiition
        );
        expect(query.query).toEqual(
            "UPDATE user SET name = ?, email = ? WHERE phone = ? AND socialId = ?"
        );
        expect(query.queryValues).toEqual([
            "test-user-3",
            "testuser66@gmail.com",
            "01004102505",
            "19018823",
        ]);
    });
});

describe("test select query constructor", () => {
    test("test select query with single condition", () => {
        let condiition = { phone: "01004102505" };
        const query = constructQueryFromObject(
            "user",
            "select",
            {},
            condiition
        );
        expect(query.query).toEqual("SELECT * FROM user WHERE phone = ?");
        expect(query.queryValues).toEqual(["01004102505"]);
    });
    test("test select query with multiple conditions", () => {
        let condiition = { phone: "01004102505", socialId: "19018823" };
        const query = constructQueryFromObject(
            "user",
            "select",
            {},
            condiition
        );
        expect(query.query).toEqual(
            "SELECT * FROM user WHERE phone = ? AND socialId = ?"
        );
        expect(query.queryValues).toEqual(["01004102505", "19018823"]);
    });
});

describe("test delete query constructor", () => {
    test("test delete query with single condition", () => {
        let condiition = { phone: "01004102505" };
        const query = constructQueryFromObject(
            "user",
            "delete",
            {},
            condiition
        );
        expect(query.query).toEqual("DELETE FROM user WHERE phone = ?");
        expect(query.queryValues).toEqual(["01004102505"]);
    });
    test("test delete query with multiple conditions", () => {
        let condiition = { phone: "01004102505", socialId: "19018823" };
        const query = constructQueryFromObject(
            "user",
            "delete",
            {},
            condiition
        );
        expect(query.query).toEqual(
            "DELETE FROM user WHERE phone = ? AND socialId = ?"
        );
        expect(query.queryValues).toEqual(["01004102505", "19018823"]);
    });
});
