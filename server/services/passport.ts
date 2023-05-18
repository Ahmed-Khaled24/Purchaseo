import passport from "passport";
import {
	IStrategyOptionsWithRequest,
	Strategy as LocalStrategy,
} from "passport-local";
import {
	Profile as GoogleProfile,
	Strategy as GoogleStrategy,
	StrategyOptionsWithRequest as GoogleStrategyOptionsWithRequest,
	VerifyCallback as GoogleVerifyCallback,
} from "passport-google-oauth20";
import {
	Profile,
	Strategy as FacebookStrategy,
	StrategyOptionWithRequest,
	VerifyFunction,
} from "passport-facebook";

import { User as UserType } from "../types/User";
import keys from "../config/dev";
import {
	dbAddUserEncrypted,
	dbGetUserByEmail,
	dbGetUserById,
	dbGetUserBySocialId,
	dbUpdateUserByEmail,
	dbUpdateUserById,
} from "../model/users.model";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { checkPassword } from "../util/bcrypt";

declare global {
	namespace Express {
		interface User extends UserType {}
	}
}

passport.serializeUser((user: Express.User | any, done) => {
	console.log("At serializeUser", user);
	done(null, user?.user_id as string);
});

passport.deserializeUser(async (id: string, done) => {
	console.log("At deserializeUser", id);
	try {
		const thisUser = await dbGetUserById(id);
		done(null, thisUser as Express.User);
	} catch (error) {
		// TODO: handle error
		done(null, false);
	}
});

const GOOGLE_AUTH_OPTIONS: GoogleStrategyOptionsWithRequest = {
	clientID: keys.GOOGLE_CLIENT_ID as string,
	clientSecret: keys.GOOGLE_CLIENT_SECRET as string,
	callbackURL: "/auth/google/callback",
	passReqToCallback: true,
};
async function googleVerifyCallback(
	req: Request | any,
	accesToken: string,
	refreshToken: string,
	profile: GoogleProfile,
	done: GoogleVerifyCallback
): Promise<void> {
	console.log(`Google profile is:`, profile);
	console.log(`Google email is:`, profile._json?.email);
	const { sub, given_name, family_name, email, picture } = profile._json;
	const role = req.body.role || "Customer";
	let dbUser: Partial<UserType> = {};
	const user: Partial<UserType> = {
		social_id: sub,
		social_type: "google",
		user_type: "Non-Local",
		Fname: given_name,
		Lname: family_name,
		email,
		image_url: picture,
		role,
	};
	try {
		dbUser = await dbGetUserByEmail(email as string);
		if (!dbUser.social_id) {
			await dbUpdateUserById(dbUser.user_id as number, {
				social_id: sub,
				social_type: "google",
				user_type: "Both",
				image_url: picture,
			});
			dbUser.social_id = sub;
			dbUser.social_type = "google";
			dbUser.user_type = "Both";
		}
	} catch (error: ErrorWithStatusCode | any) {
		if (error.statusCode === 404) {
			await dbAddUserEncrypted(user);
			dbUser = await dbGetUserByEmail(email as string);
		} else {
			done(null);
		}
	}

	done(null, dbUser as Express.User);
}

passport.use(new GoogleStrategy(GOOGLE_AUTH_OPTIONS, googleVerifyCallback));

// const FACEBOOK_AUTH_OPTIONS: StrategyOptionWithRequest = {
//   callbackURL: "/auth/facebook/callback",
//   clientID: (keys.FACEBOOK_CLIENT_ID) as string,
//   clientSecret: (keys.FACEBOOK_CLIENT_SECRET) as string,
//   passReqToCallback: true,
// };
// function facebookVerifyCallback(
//   req: Request | any,
//   accesToken: string,
//   refreshToken: string,
//   profile: Profile,
//   done: GoogleVerifyCallback
// ): void {
//   console.log(`Facebook profile is:`, profile);

//   // first param is error, second is user profile
//   done(null, profile._json as Express.User);
//   // if this was local strategy we can use the email and password to find the user in the database or save them there
//   // but with google we can just use the profile object (hooray for copilot)
// }

// passport.use(new FacebookStrategy(FACEBOOK_AUTH_OPTIONS, facebookVerifyCallback));

const LOCAL_AUTH_OPTIONS: IStrategyOptionsWithRequest = {
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true,
};
async function localVerifyCallback(
	req: any,
	email: string,
	password: string,
	done: GoogleVerifyCallback
): Promise<void> {
	console.log("At Local verify callback");
	console.log(`local profile is:`, email, password);
	console.log(`local profile is:`, req.body);
	let user;
	//TODO: decide where to do this here or middleware
	// DO it here to reduce db calls
	try {
		const { rememberMe } = req.body;
		if (rememberMe) {
			req.sessionOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
		}
		// console.log("At Local verify callback", email);
		user = await dbGetUserByEmail(email);
		if (!(await checkPassword(password, user.password))) {
			return done(null);
		}
		// console.log("At Local verify callback", user);
		return done(null, user as Express.User);
	} catch (error: ErrorWithStatusCode | any) {
		console.log("At Local verify callback", error);
		return done(null);
	}
}

passport.use(
	"local",
	new LocalStrategy(LOCAL_AUTH_OPTIONS, localVerifyCallback)
);
