import { Request, Response, NextFunction } from "express";
import { PrismaClient, Roles } from "@prisma/client";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, TOKEN } from "../globlal";
const prisma = new PrismaClient();

type JeraquiaRoles = {
  Rol: Roles | string;
  ID: number;
};
export interface TokenContent{
  Correo:string;
  ID:number;
}
let Jeraquia: JeraquiaRoles[] = [
  { Rol: "ADMIN", ID: 0 },
  { Rol: "PROFESOR", ID: 1 },
  { Rol: "USER", ID: 2 },
  { Rol: "INVITADO", ID: 3 },
];
//, "", "", ""
//Solo user logeados
export async function VerifyTyoken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token: any = req.headers["x-access-token"];
    if (token == null) {
      return res.status(403).send({ Estatus: "Error",message: "Se necesita un token de autorizacion" });
    }
    const decodeded: TOKEN |any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await prisma.usuarios.findFirst({
      where: {
        AND: [{ Correo: decodeded.Correo }, { ID: decodeded.ID }],
      },
    });
    if (user == null) {
      return res.status(403).send({  Estatus: "Error", message: "usuario invalido" });
    }
    //console.log("Termino validacion")
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Estatus: "Error", message: "fallo en autenticar token" });
  }
}

export async function EsAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token: any = req.headers["x-access-token"];
    if (token == null) {
      return res.status(403).send({ message: "Se necesita un token de autorizacion" });
    }
    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await prisma.usuarios.findFirst({
      where: {
        AND: [{ Correo: decodeded.Correo }, { ID: decodeded.ID }],
      },
    });
    if (user == null) {
      return res.status(403).send({ message: "usuario invalido" });
    } else {
      const DatoRolDelUser = RolFormato(user?.Tipo_user);
      const DatoRolMinimo = RolFormato("ADMIN");

      if (RolMinimo(DatoRolMinimo, DatoRolDelUser)) {
        console.log("");
        next();
      } else {
    console.log(1)

        return res.status(403).send({ message: "Permisos insuficientes" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "fallo en autenticar token" });
  }
}
export async function EsProfesor(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Entro");

    const token: any = req.headers["x-access-token"];
    console.log(token)
    
    if (token == null) {
      return res.status(403).send({ message: "Se necesita un token de autorizacion" });
    }
    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await prisma.usuarios.findFirst({
      where: {
        AND: [{ Correo: decodeded.Correo }, { ID: decodeded.ID }],
      },
    });
    if (user == null) {
      return res.status(403).send({ message: "usuario invalido" });
    } else {
      const DatoRolDelUser = RolFormato(user?.Tipo_user);
      const DatoRolMinimo = RolFormato("PROFESOR");

      if (RolMinimo(DatoRolMinimo, DatoRolDelUser)) {
       console.log("Si es");
        next();
      } else {
   console.log("Permisos insuficientes")

        return res.status(403).send({ message: "Permisos insuficientes" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "fallo en autenticar token" });
  }
}
//
function RolMinimo(RolMinimo: JeraquiaRoles, RolDado: JeraquiaRoles) {
  if (RolMinimo.ID >= RolDado.ID) {
    return true;
  }

  return false;
}
//Transforma una cadena de tipo ROL a su correpondiente valor jerarquico
function RolFormato(RolDado: Roles): JeraquiaRoles {
  let auxRoldado: JeraquiaRoles;

  for (let index = 0; index < Jeraquia.length; index++) {
    if (RolDado === Jeraquia[index].Rol) {
      auxRoldado = Jeraquia[index];
      return auxRoldado;
    }
  }
  return { Rol: "INVITADO", ID: 3 };
}
