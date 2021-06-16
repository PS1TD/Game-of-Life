import { composeWithDevTools } from "redux-devtools-extension"
import { createStore } from "redux"
import { rootReducer } from "../reducers"

import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
	key: "root",
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
