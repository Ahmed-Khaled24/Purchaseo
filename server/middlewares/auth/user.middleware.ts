import { Request, Response, NextFunction } from 'express';
import { dbGetUserById, dbGetUserByEmail } from '../../model/users.model';
import ErrorWithStatusCode from '../../util/classes/ErrorWithStatusCode';
import validateUser from '../../util/validation/user.validation';
import { checkPassword } from '../../util/bcrypt';

export function mwValidateUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('mwValidateUser');
	const { Fname, Lname, email, password, role } = req.body;
	try {
		validateUser({ Fname, Lname, email, password, role });
		next();
	} catch (error: ErrorWithStatusCode | any) {
		res.status(400).send({ status: 'failure', data: error.message });
	}
}

export async function mwCheckUserExists(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('checkUserExists');
	const { email } = req.body;
	try {
		const result = await dbGetUserByEmail(email);
		return res
			.status(409)
			.send({ status: 'failure', data: 'User already exists' });
	} catch (error: ErrorWithStatusCode | any) {
		if (error.statusCode === 404) {
			return next();
		}
		res.status(500).send({ status: 'failure', data: error.message });
	}
}

export const mwCheckLoginStatus = (flag: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log('mwCheckLoginStatus');
		let userLoggedIn = false;
		if (req.user && req.isAuthenticated()) {
			userLoggedIn = true;
		}
		switch (flag) {
			case 'login':
				return userLoggedIn
					? res.status(409).send({
							status: 'failure',
							data: 'User is already logged in',
					  })
					: next();
			case 'logout':
				return !userLoggedIn
					? res.status(409).send({
							status: 'failure',
							data: 'User is already logged out',
					  })
					: next();
			default:
				next();
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
	console.log('mwCheckLoginCredentials');
	const { email, password } = req.body;
	try {
		const user = await dbGetUserByEmail(email);
		if (!(await checkPassword(password, user.password))) {
			return res
				.status(401)
				.send({ status: 'failure', data: 'invalid password' });
		}
		next();
	} catch (error: ErrorWithStatusCode | any) {
		return res.status(404).send({ status: 'failure', data: error.message });
	}
}

export const authorizeUser = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log('authorizeUser');
		if (role === req.user?.role) {
			next();
		} else {
			res.status(403).send({
				status: 'failure',
				data: `User not authorized, permission required "${req.user?.role}" got "${role}"`,
			});
		}
	};
};
