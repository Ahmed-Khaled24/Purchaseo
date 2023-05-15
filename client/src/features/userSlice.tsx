import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../../server/types/User';

export const userInitialState: User = {
	email: '',
	Fname: '',
	Lname: '',
	image_url: '',
	role: 'Customer',
	password: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState: userInitialState,
	reducers: {
		putUser: (state, action: PayloadAction<User>) =>
			(state = action.payload),
		logoutUser: (state, action: PayloadAction<User>) => {
			state = userInitialState;
		},
	},
});

export const { putUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
