import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useAppSelector } from "../../store/hooks";
import { RolFormato, RolMinimo } from "../../functions/functions";
import { Roles } from "../../API/Types/Tipos";
import { useNavigate } from "react-router-dom";
type RutasAcesso = { Nombre: string; Ruta: string; Minimo: Roles };
export function MenuPopupState() {
  let User = useAppSelector((state) => state.Token);
  const Redirect = useNavigate();

  const DatoRolDelUser = RolFormato(User.Nivel);
  const DatoRolMinimo = RolFormato("ADMIN");
  const Rutas: RutasAcesso[] = [
    {
      Nombre: "Gestion de grupos",
      Ruta: "/Gestion/Grupo",
      Minimo: "PROFESOR",
    },
   
    {
      Nombre: "Tus REA(s)",
      Ruta: "/Gestion/TusRecursos",
      Minimo: "PROFESOR",
    },
    {
      Nombre: "Gestion de REA(s) (Admin)",

      Ruta: "/Gestion/REA",
      Minimo: "ADMIN",
    },

    {
      Nombre: "Conservar REA",

      Ruta: "/subir_archivos",
      Minimo: "ADMIN",
    },
    {
      Nombre: "Gestion de usuarios",

      Ruta: "/Gestion/Users",
      Minimo: "ADMIN",
    },
    {
      Nombre: "Administracion de materias",

      Ruta: "/administracion",
      Minimo: "ADMIN",
    },
    {
      Nombre: "Seguimiento global",

      Ruta: "/seguimiento",
      Minimo: "ADMIN",
    },
  ];
  if(User.Token.length==0){
    return <></>
  }
  // const items = Rutas.map((data) => {
  //   if (RolMinimo(RolFormato(data.Minimo), RolFormato(User.Nivel))) {
  //     return (
  //       <MenuItem onClick={() => Redirect(data.Ruta)}>{data.Nombre}</MenuItem>
  //     );
  //   } else {
  //     return <></>;
  //   }
  // });

  return (<>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button variant="contained" color="warning" {...bindTrigger(popupState)}>
            Acciones
          </Button>
          <Menu {...bindMenu(popupState)}>
            {Rutas.map((data,index) => {
              if (RolMinimo(RolFormato(data.Minimo), RolFormato(User.Nivel))) {
                return (
                  <MenuItem key={`Menu-${index}-${data.Nombre}`} onClick={() => Redirect(data.Ruta)}>
                    {data.Nombre}
                  </MenuItem>
                );
              } else {
                return <></>;
              }
            })}
          </Menu>
        </>
      )}
    </PopupState>
    </>
  );
}
