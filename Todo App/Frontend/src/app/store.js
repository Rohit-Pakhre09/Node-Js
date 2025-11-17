import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo.js"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  }
});