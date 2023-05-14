import { Request, Response } from 'express';
import {
	dbGetUserById,
	dbGetUsersByName,
	dbGetUserByEmail,
	dbAddUserEncrypted,
	dbDeleteUserByEmail,
	dbUpdateUserByEmail,
} from '../model/users.model';
import { Role } from '../types/User';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import validateUser, {
	validateUserUpdateData,
} from '../util/validation/user.validation';

async function addNewUser(req: Request, res: Response) {
	let {
		Fname,
		Lname,
		email,
		password,
		role,
	}: {
		Fname: string;
		Lname: string;
		email: string;
		password: string;
		role: Role;
	} = req.body;

	try {
		await dbAddUserEncrypted({ Fname, Lname, email, password, role });
		return res
			.status(200)
			.json({ status: 'success', data: 'New user added successfully' });
	} catch (error: ErrorWithStatusCode | any) {
		console.log(`User adding error: ${error}`);
		return res
			.status(error.statusCode || 500)
			.json({ status: 'failure', data: error.message });
	}
}

async function removeUser(req: Request, res: Response) {
	let { email } = req.body;
	try {
		await dbDeleteUserByEmail(email);
		return res
			.status(200)
			.json({ status: 'success', data: 'User deleted successfully' });
	} catch (error: ErrorWithStatusCode | any) {
		console.log(`User deletion error: ${error}`);
		return res
			.status(error.statusCode || 500)
			.json({ status: 'failure', data: error.message });
	}
}

async function updateUser(req: Request, res: Response) {
	let { email, update } = req.body;
	try {
		await dbUpdateUserByEmail(email, update);
		return res
			.status(200)
			.json({ status: 'success', data: 'User updated successfully' });
	} catch (error: ErrorWithStatusCode | any) {
		console.log(`User updating error: ${error}`);
		return res
			.status(error.statusCode || 500)
			.json({ status: 'failure', data: error.message });
	}
}

async function getUserById(req: Request, res: Response) {
	let { id } = req.params;
	try {
		let user = await dbGetUserById(id);
		return res.status(200).json({ status: 'success', data: user });
	} catch (error: ErrorWithStatusCode | any) {
		console.log(`User finding error: ${error}`);
		return res
			.status(error.statusCode || 500)
			.json({ status: 'failure', data: error.message });
	}
}

async function getUserByEmail(req: Request, res: Response) {
	let { email } = req.params;
	// TODO: check that the user trying to access this data is the same user logged in to the session
	try {
		let user = await dbGetUserByEmail(email);
		return res.status(200).json({ status: 'success', data: user });
	} catch (error: ErrorWithStatusCode | any) {
		console.log(`User finding error: ${error}`);
		return res
			.status(error.statusCode || 500)
			.json({ status: 'failure', data: error.message });
	}
}

export { getUserById, getUserByEmail, addNewUser, removeUser, updateUser };
