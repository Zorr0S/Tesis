import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Prisma, PrismaClient, usuarios } from "@prisma/client";
import { ACCESS_TOKEN_SECRET } from "../../globlal";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
//Get functions
export async function GetGuides(req: Request, res: Response) {
  try {
    //const { Tipo, General, Titulo, Descripcion, PalabrasClave } = req.body;
    // const token: any = req.headers["x-access-token"];

    //const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const Guia = await prisma.cursoGuia.findMany({
      include: {
        Plantilla: {
          include: {
            Bloques: {
              include: { Contenido: { include: { MaterialAsociado: true } } },
            },
          },
        },
      },
    });
    console.log("entro");

    res.status(200).json(Guia);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//Trae la guias creadas por el user
export async function GetMyGuides(req: Request, res: Response) {
  try {
    //const { Tipo, General, Titulo, Descripcion, PalabrasClave } = req.body;
    const token: any = req.headers["x-access-token"];

    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const MisGrupos = prisma.cursoGuia.findMany({
      where: { CreadorID: parseInt(decodeded.ID) },
    });
    res.status(200).json(MisGrupos);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function SuscribeToGroup(req: Request, res: Response) {
  try {
    //const { Tipo, General, Titulo, Descripcion, PalabrasClave } = req.body;
    const token: any = req.headers["x-access-token"];

    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const MisGrupos = prisma.grupo.findMany({
      where: { CreadorID: parseInt(decodeded.ID) },
    });

    res.status(200).json(MisGrupos);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//  include: {
//               MateriaPerteneciente: {
//                 include: {
//                   SemestrePerteneciente: {
//                     include: {
//                       PlanPerteneciente: {
//                         include: {
//                           CarreraPerteneciente: {
//                             include: { FacultadPerteneciente: true },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
