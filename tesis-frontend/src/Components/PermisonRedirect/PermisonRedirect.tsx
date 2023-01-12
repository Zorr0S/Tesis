import React from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../API/Types/Tipos";
import { RolFormato, RolMinimo } from "../../functions/functions";
import { useAppSelector } from "../../store/hooks";

export function PersmisonRedirect({RolNecesario,Componente}:{RolNecesario:Roles,Componente:JSX.Element}) {
  let User = useAppSelector((state) => state.Token);
  const Redirect = useNavigate();
    const DatoRolDelUser = RolFormato(User.Nivel);
    const DatoRolMinimo = RolFormato(RolNecesario);

    if (!RolMinimo(DatoRolMinimo, DatoRolDelUser)) {
      console.log(`PermRedi Permisos suficiente: ${User.Nivel} ` );
      Redirect("/")
      return(<>Permisos insuficiente</>)
    }
    return(
        Componente
    )
}

export function PersmisonRender({RolNecesario,Componente}:{RolNecesario:Roles,Componente:JSX.Element}) {
  let User = useAppSelector((state) => state.Token);
    const DatoRolDelUser = RolFormato(User.Nivel);
    const DatoRolMinimo = RolFormato(RolNecesario);

    if (!RolMinimo(DatoRolMinimo, DatoRolDelUser)) {
      console.log(`Permisos NEce ${RolNecesario} ` );

      console.log(`PermRende Permisos insuficiente: ${User.Nivel} ` );
      return(<></>)
    }
    return(
        Componente
    )
}