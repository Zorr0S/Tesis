import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Roles, User, UserInfo } from "../API/Types/Tipos";
import { RootState } from "./store";
//const  Default: UserInfo = { Nombre: "", Token: "", Correo: "" };

// Define a type for the slice state

// Define the initial state using that type
interface ID{
  IDUser:number|null
}
const initialState:ID= {
    IDUser:null
  }


export const counterSlice = createSlice({
  name: "UserView",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserIDState: (state: ID, action: PayloadAction<ID>) => {
    
      state = action.payload;
      return state

    },
  },
});
// Action creators are generated for each case reducer function
export const { setUserIDState } = counterSlice.actions;
export const selectCount = (state: ID) => state.IDUser;
export default counterSlice.reducer;
