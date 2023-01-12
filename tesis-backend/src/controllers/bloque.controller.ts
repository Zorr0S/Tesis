import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetBloques(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = req.params;

    const Bloques = await prisma.bloque.findMany({
      where: {
        MateriaPerteneciente: {
          is: {
            ID: parseInt(MateriaID),
            SemestrePerteneciente: {
              is: {
                ID: parseInt(SemestreID),
                PlanPerteneciente: {
                  ID: parseInt(PlanID),
                  CarreraPerteneciente: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
      },
    });
    res.json(Bloques);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetBloqueById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID, BloqueID } =
      req.params;

    const Index = await prisma.bloque.findMany({
      where: {
        MateriaPerteneciente: {
          is: {
            ID: parseInt(MateriaID),
            SemestrePerteneciente: {
              is: {
                ID: parseInt(SemestreID),
                PlanPerteneciente: {
                  ID: parseInt(PlanID),
                  CarreraPerteneciente: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
        ID: parseInt(BloqueID),
      },
    });
  
    res.json(Index);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function EditBloqueById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID, BloqueID } =
      req.params;
      const { Nombre, Descripcion } = req.body;

    const Index = await prisma.bloque.findMany({
      where: {
        MateriaPerteneciente: {
          is: {
            ID: parseInt(MateriaID),
            SemestrePerteneciente: {
              is: {
                ID: parseInt(SemestreID),
                PlanPerteneciente: {
                  ID: parseInt(PlanID),
                  CarreraPerteneciente: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
        ID: parseInt(BloqueID),
      },
    });
    const Bloque = await prisma.bloque.update({
      where: {
        
        ID: parseInt(BloqueID),
      },
      data:{
        Nombre:(Nombre),
        Descripcion:(Descripcion)
      }
    });
    
  
    res.json(Bloque);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function CreateBloque(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body;

    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = req.params;

    const BloquesBuscados = await prisma.bloque.findMany({
      where: {
        MateriaPerteneciente: {
          is: {
            ID: parseInt(MateriaID),
            SemestrePerteneciente: {
              is: {
                ID: parseInt(SemestreID),
                PlanPerteneciente: {
                  ID: parseInt(PlanID),
                  CarreraPerteneciente: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
      },
    });
    const Seccion = await prisma.bloque.create({
      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
        MateriaID: parseInt(MateriaID),
      },
    });

    res.status(200).send({ staus: "ok", response: { Seccion } });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json([{ mensaje: "Elemento no encontrado/inexistentesss" }]);
  }
}
