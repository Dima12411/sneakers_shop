import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {filterReducer} from "./slices/filterSlice";

const rootReducer = combineReducers({
    filter: filterReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunkMiddleware)

})

export type RootStateType = ReturnType<typeof rootReducer>