import { configureStore } from '@reduxjs/toolkit'
import UserInfoReducers  from "./counterSlice"
import counterReducer  from "./currentView"

export const store = configureStore({
  reducer: {
    Token: UserInfoReducers,
    UserView:counterReducer

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch