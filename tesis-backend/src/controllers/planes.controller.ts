import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { PrismaClient } from "@prisma/client";
import { rejects } from "assert";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetPlanes(req: Request, res: Response) {
  try {
    const { CarreraID, FacultadID } = req.params;
    const {last} =req.query;
    if(last==="1"){
      const espacio = await prisma.planEstudio.findMany({
        where: {
          CarreraPerteneciente: { is: { FacultadID: parseInt(FacultadID) } },
          CarreraID: parseInt(CarreraID),
        }, orderBy:[{ID:"desc"}],
        take:1
      });
     res.json(espacio);
      
    }else{
      const Planes = await prisma.planEstudio.findMany({
        where: {
          CarreraPerteneciente: { is: { FacultadID: parseInt(FacultadID) } },
          CarreraID: parseInt(CarreraID),
        },
      });
  
      res.json(Planes);
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetPlanesById(req: Request, res: Response) {
  try {
    const { PlanID, CarreraID, FacultadID } = req.params;
  
  
   
    const espacio = await prisma.planEstudio.findMany({
      where: {
        CarreraPerteneciente: { is: { FacultadID: parseInt(FacultadID) } },
        CarreraID: parseInt(CarreraID),
        ID: parseInt(PlanID),
      },
    });
    res.send(espacio);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function EditPlanesById(req: Request, res: Response) {
  try {
    const { PlanID, CarreraID, FacultadID } = req.params;
    const { Nombre } = req.body;
  
  
   
    const Index = await prisma.planEstudio.findMany({
      where: {
        CarreraPerteneciente: { is: { FacultadID: parseInt(FacultadID) } },
        CarreraID: parseInt(CarreraID),
        ID: parseInt(PlanID),
      },
    });
    const espacio = await prisma.planEstudio.update({
      where: {
        ID: parseInt(PlanID),
      },
      data:{
        Nombre:(Nombre)
      }
    });
    res.send([espacio]);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreatePlanes(req: Request, res: Response) {
  try {
    const { CarreraID, FacultadID } = req.params;

    const { Nombre } = req.body;
    const PlanesBusqueda = await prisma.planEstudio.findMany({
      where: {
        CarreraPerteneciente: { is: { FacultadID: parseInt(FacultadID) } },
        CarreraID: parseInt(CarreraID),
      },
    });
    
    
    const Planes = await prisma.planEstudio.create({
      data: { Nombre: Nombre, CarreraID: parseInt(CarreraID) },
    });

    res.status(200).send({ status: "ok", response: { Planes } });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
