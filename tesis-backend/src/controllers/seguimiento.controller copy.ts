import { Prisma, PrismaClient } from "@prisma/client";
import console from "console";
import { Request, Response } from "express";
import { EjemploService } from "../services/Ejemplo.services";
import path from "path";
import { ACCESS_TOKEN_SECRET, Dominio, TOKEN } from "../globlal";
import jwt from "jsonwebtoken";

//El controlador se encarga del cuerpo del la funcion Rest
const ejemploService = new EjemploService();
const prisma = new PrismaClient();

//Funcion que recopila que recurso a visto el user
export async function GetMonitoreoGeneral(req: Request, res: Response) {
  try {
   const monitoreo =await prisma.seguimiento.findMany({select:{
    ID:true,
    UsuarioID:true,
    Usuario:{
      select:{
        ID:true,
        Nombre:true,
        Correo:true
      }
    }
    ,
    RecursoID:true,
    Recurso:true,
    PrimerVisto:true,
    UltimaVisto:true,
    RutaVista:true,
    PorcentajeVisto:true,
    TiempoVisto:true

    
   }
   })
   return res.send(monitoreo)

  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetSeguimientoMaterial(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"] as string;
    const decodeded:any= jwt.verify(token, ACCESS_TOKEN_SECRET);
    const {Material}= req.query
    const monitoreo =await prisma.seguimiento.findFirst({where:{
      AND:[
        {UsuarioID: parseInt(decodeded.ID)},
        {Recurso:{Direccion:Material as string}}
      ]
      
    },select:{
      ID:true,
      UsuarioID:true,
      Usuario:{
        select:{
          ID:true,
          Nombre:true,
          Correo:true
        }
      }
      ,
      RecursoID:true,
    //  Recurso:true,
      PrimerVisto:true,
      UltimaVisto:true,
      RutaVista:true,
      PorcentajeVisto:true,
      TiempoVisto:true
  
      
     }
     })
     return res.send(monitoreo)
  
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}