import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetApellidos,
  GetIdentificador,
  GetNCuenta,
  GetNivel,
  GetNombre,
  GetRefresh,
  getToken,
  SetApellidos,
  SetNCuenta,
  SetNivel,
  SetNombre,
  SetRefresh,
  setToken,
} from "../API/auth/auth";
import { Roles, User, UserInfo } from "../API/Types/Tipos";
import { RootState } from "./store";
//const  Default: UserInfo = { Nombre: "", Token: "", Correo: "" };

// Define a type for the slice state

// Define the initial state using that type

const initialState:UserInfo= {
  Token: getToken() ||"",
  Refresh: GetRefresh()||"",
  Nivel: GetNivel()||"INVITADO",
  Identificador: GetIdentificador()||"",
  UserInfo:{
    ID:0,
    Genero:"HOMBRE",
    Nombre: GetNombre()||"",
    Apellidos: GetApellidos()||"",
    Numero_Cuenta:GetNCuenta()||""
    ,Icono:""
  }
} 

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserState: (state: UserInfo, action: PayloadAction<UserInfo>) => {
      setToken(action.payload.Token);
      SetRefresh(action.payload.Refresh);
      SetNivel(action.payload.Nivel);
      SetNombre(action.payload.UserInfo.Nombre);
      SetApellidos(action.payload.UserInfo.Apellidos);
      SetNCuenta(action.payload.UserInfo.Numero_Cuenta)
      state = action.payload;
      return state

    },
  },
});
// Action creators are generated for each case reducer function
export const { setUserState } = counterSlice.actions;
export const selectCount = (state: any) => state.Token.Token;
export default counterSlice.reducer;
