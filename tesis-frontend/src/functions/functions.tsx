import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JeraquiaRoles, Roles } from "../API/Types/Tipos";
import { setUserState } from "../store/counterSlice";
import { useAppDispatch } from "../store/hooks";

function usePagination(data: any, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}
export function IMGFallback(Cadena: string) {
  if (Cadena == null) {
    return "https://source.unsplash.com/random";
  }
  return Cadena;
}
export const Jeraquia: JeraquiaRoles[] = [
  { Rol: "ADMIN", ID: 0 },
  { Rol: "PROFESOR", ID: 1 },
  { Rol: "USER", ID: 2 },
  { Rol: "INVITADO", ID: 3 },
];

export function RolMinimo(RolMinimo: JeraquiaRoles, RolDado: JeraquiaRoles) {
  if (RolMinimo.ID >= RolDado.ID) {
    return true;
  }

  return false;
}
//Transforma una cadena de tipo ROL a su correpondiente valor jerarquico
export function RolFormato(RolDado: Roles): JeraquiaRoles {
  let auxRoldado: JeraquiaRoles;

  for (let index = 0; index < Jeraquia.length; index++) {
    if (RolDado === Jeraquia[index].Rol) {
      auxRoldado = Jeraquia[index];
      return auxRoldado;
    }
  }
  return { Rol: "INVITADO", ID: 3 };
}


export { usePagination };
