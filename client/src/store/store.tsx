import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import CartReducer from "./features/cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
	key: "cart",
	storage,
};
const userPersistConfig = {
	key: "user",
	storage,
};

const rootReducer = combineReducers({
	cart: persistReducer(cartPersistConfig, CartReducer),
	user: persistReducer(userPersistConfig, UserReducer),
});

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
