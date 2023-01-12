import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetMateria(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID } = req.params;

    const Curso = await prisma.materia.findMany({
      where: {
        SemestrePerteneciente: {
          ID: parseInt(SemestreID),
          PlanPerteneciente: { ID: parseInt(PlanID) ,CarreraPerteneciente:{ID:parseInt(CarreraID),FacultadID:parseInt(FacultadID)}},
        },
      },
    });

    res.json(Curso);
  } catch (error) {
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetMateriaById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = req.params;

    const Materia = await prisma.materia.findMany({
      where: {
        SemestrePerteneciente: {
          is: {
            ID: parseInt(SemestreID),
            PlanPerteneciente: {
              is: {
                ID: parseInt(PlanID),
                CarreraPerteneciente: {
                  is: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
        ID: parseInt(MateriaID),
      },
      include:{
        Bloques:{
          include:{
            Contenido:{
              include:{
                MaterialAsociado:{
                  include:{
                    TipoMaterial:true
                  }
                }
              }
            }
              
          }
        }
      }
    });
    res.send(Materia);
  } catch (error) {
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function EditMateriaById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = req.params;
    const { Nombre, Descripcion } = req.body;

    const index = await prisma.materia.findMany({
      where: {
        SemestrePerteneciente: {
          is: {
            ID: parseInt(SemestreID),
            PlanPerteneciente: {
              is: {
                ID: parseInt(PlanID),
                CarreraPerteneciente: {
                  is: {
                    ID: parseInt(CarreraID),
                    FacultadID: parseInt(FacultadID),
                  },
                },
              },
            },
          },
        },
        ID: parseInt(MateriaID),
      },
    });
    const Materia = await prisma.materia.update({
      where: {
       
        ID: parseInt(MateriaID),
      },
      data:{
        Nombre:(Nombre),
        Descripcion:(Descripcion)
      }
    });
    res.send(Materia);
  } catch (error) {
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreateMateria(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID } = req.params;
    const { Nombre, Descripcion } = req.body;
    const MateriaBusqueda = await prisma.materia.findMany({
      where: {
        SemestrePerteneciente: {
          is: {
            ID: parseInt(SemestreID),
            PlanPerteneciente: {
              is: {
                ID: parseInt(PlanID),
                CarreraPerteneciente: {
                  is: {
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

    const Materia = await prisma.materia.create({
      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
        SemestreID: parseInt(SemestreID),
      },
    });

    res.status(200).send({ staus: "ok", response: { Materia } });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
