import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import CartReducer from './features/cartSlice';
import UserReducer from './features/userSlice';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// TODO: Persist the state using redux-persist
const store = configureStore({
	reducer: {
		cart: CartReducer,
		user: UserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
