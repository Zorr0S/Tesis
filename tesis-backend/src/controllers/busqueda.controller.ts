import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient, usuarios } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
//Get functions
export async function SearchMaterials(req: Request, res: Response) {
  try {
    const { Tipo, General, Titulo, Descripcion, PalabrasClave } = req.body;
    const select = {
      ID: true,
      Titulo: true,
      Descripcion: true,
      TipoMaterial: true,
      Direccion: true,
      ContenidoBloque: {
        select: {
          BlqueID: true,
          BloquePerteneciente: {
            select: {
              MateriaID: true,
              MateriaPerteneciente: {
                select: {
                  SemestreID: true,
                  SemestrePerteneciente: {
                    select: {
                      PlanID: true,
                      PlanPerteneciente: {
                        select: {
                          CarreraID: true,
                          CarreraPerteneciente: {
                            select: {
                              FacultadID: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    console.log("Entro")
    switch (parseInt(Tipo)) {
      case 2: {
        //Titulo
        console.log("Titulo: " + Titulo);

        const Resultados = await prisma.materiales.findMany({
          where: { AND: [{ Titulo: { search: Titulo } }, 
           {             Estatus: true }
          ] },
          select,
        });
        res.json(Resultados);
        break;
      }
      case 3: {
        //Descripcion
        console.log("Descripcion: " + Descripcion);

        const Resultados = await prisma.materiales.findMany({
          where: {
            AND: [
              { Descripcion: { search: Descripcion + "" } },
             { Estatus: true },
            ],
          },
          select,
        });
        res.json(Resultados);
        break;
      }
      case 4: {
        //Palabras clave
        console.log("Palabras CLave: " + PalabrasClave);
        const Resultados = await prisma.materiales.findMany({
          where: {
            AND: [
              { PalabrasClave: { search: PalabrasClave + "" } },
             { Estatus: true },
            ],
          },
          select,
        });
        res.json(Resultados);
        break;
      }

      default: {
        //General
        const Resultados = await prisma.materiales.findMany({
          where: {
            AND: [
              {
                OR: [
                  {
                    Titulo: { contains: General + "" },
                  },
                  {
                    Descripcion: { contains: General + "" },
                  },

                  {
                    OR: [
                      { PalabrasClave: { contains: General + "" } },
                      { PalabrasClave: { search: General + "" } },
                    ],
                  },
                ],
              },
              { Estatus: true },
            ],
          },
          select,
        });
        res.json(Resultados);

        break;
      }
    }
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
