import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetSemestre(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID } = req.params;
    console.log([FacultadID,CarreraID,PlanID])
    const Planes = await prisma.semestre.findMany({
      where: {
        // PlanPerteneciente: {
        //   is: {, CarreraPerteneciente: { FacultadID: parseInt(FacultadID) } ,ID:parseInt(CarreraID)},
        // },
        
        PlanID:parseInt(PlanID),
        PlanPerteneciente:{
          ID:parseInt(PlanID),CarreraPerteneciente:{ID:parseInt(CarreraID),FacultadID:parseInt(FacultadID)}
        }
      },
    });
    console.log(Planes)
  
    res.json(Planes);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetSemestreById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID,SemestreID } = req.params;

    const Semestre = await prisma.semestre.findMany({
      where: {
        PlanPerteneciente: {
          is: { CarreraPerteneciente: { FacultadID: parseInt(FacultadID) } ,ID:parseInt(CarreraID)},
        },
        PlanID:parseInt(PlanID),
        ID:parseInt(SemestreID)
      },
    });
    res.send(Semestre);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function EditSemestreById(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID,SemestreID } = req.params;
    const { Nombre } = req.body;

    const index = await prisma.semestre.findMany({
      where: {
        PlanPerteneciente: {
          is: { CarreraPerteneciente: { FacultadID: parseInt(FacultadID) } ,ID:parseInt(CarreraID)},
        },
        PlanID:parseInt(PlanID),
        ID:parseInt(SemestreID)
      },
    });
    const Semestre = await prisma.semestre.update({
      where: {
       
        ID:parseInt(SemestreID)
      },
      data:{
        Nombre:(Nombre)
      }
    });
    res.send([Semestre]);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function CreateSemestre(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID } = req.params;
    

    const { Nombre } = req.body;

    const PlanesBusqueda = await prisma.semestre.findMany({
      where: {
        PlanPerteneciente: {
          is: { CarreraPerteneciente: { FacultadID: parseInt(FacultadID) } ,ID:parseInt(CarreraID)},
        },
        PlanID:parseInt(PlanID)
      },
    });

    const Planes = await prisma.semestre.create({
      data: { Nombre: Nombre, PlanID: parseInt(PlanID) },
    });

    res.status(200).send({ status: "ok", response: { Planes } });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
