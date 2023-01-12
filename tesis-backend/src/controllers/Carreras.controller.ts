import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetCarreras(req: Request, res: Response) {
  try {
    const {FacultadID} =req.params
    const Facultad = await prisma.carrera.findMany({where:{FacultadID:parseInt(FacultadID)}});

    res.json(Facultad);
  } catch (error) {
    console.error(error)
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetCarreraById(req: Request, res: Response) {
  try {
    const { CarreraID, FacultadID } = req.params;
    //const {var1} =req.body;

    const espacio = await prisma.carrera.findMany({
      where: {
      
        ID: parseInt(CarreraID),
        FacultadID: parseInt(FacultadID) 
      },
    });
    res.send(espacio);
  } catch (error) {
    console.error(error)
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreateCarrera(req: Request, res: Response) {
  try {
    const { FacultadID } = req.params;
    const { Nombre } = req.body;
   
     const Curso = await prisma.carrera.create({
     data:{Nombre:Nombre, FacultadID:parseInt(FacultadID)},
    });
    

    res.status(200).send({status:"ok", response:{Curso}});
  } catch (error) {
    console.error(error)
    res.status(500).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}


export async function EditCarreraById(req: Request, res: Response) {
  try {
    const { CarreraID, FacultadID } = req.params;
    const { Nombre } = req.body;

    //const {var1} =req.body;
    //Validar INdice
    const INdex = await prisma.carrera.findMany({
      where: {
      
        ID: parseInt(CarreraID),
        FacultadID: parseInt(FacultadID) 
      },
    });
    const espacio = await prisma.carrera.update({
      where: {
      
        ID: parseInt(CarreraID),
      },
      data:{
        Nombre:(Nombre)
      }
    });
    
    res.send([espacio]);
  } catch (error) {
    console.error(error)
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}