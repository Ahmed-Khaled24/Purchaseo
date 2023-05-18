import { dbGetUserById, dbGetUserByEmail } from "../../model/users.model";
import ErrorWithStatusCode from "../../util/classes/ErrorWithStatusCode";
import validateUser from "../../util/validation/user.validation";
import { checkPassword } from "../../util/bcrypt";
import { NextFunction, Request, Response } from "express";
import { permissions } from "../../types/User.Premissions";
import { Role } from "../../types/User";
export function mwValidateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("mwValidateUser");
    const { Fname, Lname, email, password, role } = req.body;
    try {
        validateUser({ Fname, Lname, email, password, role });
        next();
    } catch (error: ErrorWithStatusCode | any) {
        res.status(400).send({ status: "failure", data: error.message });
    }
}

export function mwCheckUserExists(flag: boolean) {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("checkUserExists");
        const { email } = req.body;
        try {
            switch (flag) {
                case true: {
                    try {
                        await dbGetUserByEmail(email);
                            return res.status(409).send({
                                status: "failure",
                                data: "User already exists",
                            });
                                              
                    } catch (error) {
                        return next();
                    }
                }
                case false: {
                    try {
                        await dbGetUserByEmail(email);
                        return next();
                    } catch (error) {
                        return res.status(404).send({
                            status: "failure",
                            data: "User does not exist",
                        });
                    }
                    
                }
                default: {
                    res.status(500).send({
                        status: "failure",
                        data: "Invalid flag",
                    });
                    break;
                }
            }
        } catch (error: ErrorWithStatusCode | any) {
            res.status(500).send({ status: "failure", data: error.message });
        }
    };
}

export const mwCheckLoginStatus = (flag: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("mwCheckLoginStatus");
        let userLoggedIn = false;
        if (req.user && req.isAuthenticated()) {
            userLoggedIn = true;
        }
        console.log({ userLoggedIn });
        console.log({ flag });
        switch (flag) {
            case "loggedOut":
                return userLoggedIn
                    ? res.status(409).json({
                          status: "failure",
                          data: "User is logged in",
                      })
                    : next();
            case "loggedIn":
                return !userLoggedIn
                    ? res.status(409).json({
                          status: "failure",
                          data: "User is logged out",
                      })
                    : next();

            default:
                res.status(500).json({
                    status: "failure",
                    data: "Invalid flag",
                });
        }
    };
};

// TODO: check whether to put this here on inside passport callback
// if put in passport callback, then we can add to req.body to validate error in redirectors
export async function mwCheckLoginCredentials(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // TODO: done( err, user, info) info contains message
    console.log("mwCheckLoginCredentials");
    const { email, password } = req.body;
    try {
        const user = await dbGetUserByEmail(email);
        if (!(await checkPassword(password, user.password))) {
            return res
                .status(401)
                .send({ status: "failure", data: "invalid password" });
        }
        next();
    } catch (error: ErrorWithStatusCode | any) {
        return res.status(404).send({ status: "failure", data: error.message });
    }
}

export const authorize = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("authorizeUser");
        if (permissions[req.user?.role as string] < permissions[role]) {
            next();
        } else if (
            permissions[req.user?.role as string] === permissions[role] &&
            req.user?.role === role
        ) {
            next();
        } else {
            res.status(403).send({
                status: "failure",
                data: `User not authorized, permission required need to be at least "${
                    role as string
                }"`,
            });
        }
    };
};

export function mwCheckIsCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("mwCheckCurrentUser");
    let { id, email } = req.params;
    if (!email ) {
        email = req.body.email;
    }
    if(!id){
        id = req.body.id
    }
    if (req.user?.user_id === Number(id) || req.user?.email === String(email)) {
        return next();
    }
    return res
        .status(403)
        .send({ status: "failure", data: "User not authorized" });
}
