import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import userGameDataSlice from "../features/userGameDataSlice";
import wordsDataSlice from "../features/wordsData";
import answerSlice from "../features/answersSlice";
import roomSlice from "../features/roomSlice";
import { persistStore, persistReducer, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  userGameData: userGameDataSlice,
  wordsData: wordsDataSlice,
  answers: answerSlice,
  room: roomSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const resetStore = async () => {
  await persistor.purge(); 
  store.dispatch({ type: PURGE }); 
};

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor, resetStore };
