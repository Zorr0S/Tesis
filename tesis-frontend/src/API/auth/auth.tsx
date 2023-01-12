import { Retryer } from "react-query/types/core/retryer"
import { UserInfo } from "../Types/Tipos"
export function UndefinedTokenToEmptyString(Cadena:string="") {
    if((Cadena==undefined)||(Cadena==null)||(Cadena.length==0)){
        console.log("Entro ACA")
    return "";
    }
    return Cadena;

}

export function setToken(cadena:string=""){
    console.log("set")
   return localStorage.setItem("token",cadena)
    
}
export function getToken(){
    const Token =localStorage.token
    
    return Token
}
export function SetRefresh(cadena:string){
    return localStorage.setItem("refresh",cadena)

}
export function GetRefresh(){
    return localStorage.refresh

}

export function SetNivel(cadena:string){
    return localStorage.setItem("nivel",cadena)

}
export function GetNivel(){
    return localStorage.nivel

}

export function SetIdentificador(cadena:string){
    return localStorage.setItem("identificador",cadena)

}
export function GetIdentificador(){
    return localStorage.identificador

}
//user data related

export function SetNombre(cadena:string){
    return localStorage.setItem("nombre",cadena)

}
export function GetNombre(){
    return localStorage.nombre

}

export function SetApellidos(cadena:string){
    return localStorage.setItem("apellidos",cadena)

}
export function GetApellidos(){
    return localStorage.apellidos

}
export function SetNCuenta(cadena:string){
    return localStorage.setItem("NCuenta",cadena)

}
export function GetNCuenta(){
    return localStorage.NCuenta

}