import { Request, Response, NextFunction } from 'express';
import ErrorWithStatusCode from '../../util/classes/ErrorWithStatusCode';
import validateUser, {
	validateUserUpdateData,
} from '../../util/validation/user.validation';

export const mwValidateData = (state: 'signup' | 'update') => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			switch (state) {
				case 'signup':
					const { Fname, Lname, email, password, role } = req.body;
					validateUser({ Fname, Lname, email, password, role });
					return next();
				case 'update':
					const { update } = req.body;
					validateUserUpdateData(update);
					return next();
				default:
					throw new ErrorWithStatusCode('Invalid state', 500);
			}
		} catch (error: ErrorWithStatusCode | any) {
			return res
				.status(error.statusCode || 500)
				.json({ status: 'failure', data: error.message });
		}
	};
};
