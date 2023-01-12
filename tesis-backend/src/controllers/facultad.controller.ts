import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetFacultad(req: Request, res: Response) {
  try {
    const Facultad = await prisma.facultad.findMany({include:{
      Carreras:true
    }});

    res.json(Facultad);
  } catch (error) {
    console.error(error)
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetFacultadById(req: Request, res: Response) {
  try {
    const { FacultadID } = req.params;
    //const {var1} =req.body;

    const espacio = await prisma.facultad.findUnique({
      where: {
        ID: parseInt(FacultadID),
      },
      include:{
        Carreras:true
      }

    });
   
    res.send([espacio]);
  } catch (error) {
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function EditFacultadById(req: Request, res: Response) {
  try {
    const { FacultadID } = req.params;
    const { Nombre } = req.body;

    //const {var1} =req.body;

    const espacio = await prisma.facultad.update({
      where: {
        ID: parseInt(FacultadID),
      },
      data:{
        Nombre:Nombre,
        }
      ,
      include:{
        Carreras:true
      }

    });
    
    res.send([espacio]);
  } catch (error) {
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreateFacultad(req: Request, res: Response) {
  try {
    const { Nombre } = req.body;
    
    const Contenido= await prisma.facultad.create({
     
      data:{
        Nombre:Nombre,

      },
   
    });
    res.status(200).send({staus:"ok", response:{Contenido}});


  } catch (error) {
    console.error(error)
    res.status(500).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
