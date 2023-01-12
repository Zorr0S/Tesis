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
export async function Seguimiento(req: Request, res: Response) {
  try {
    const token: any = req.headers["x-access-token"];
    //console.log(token);
    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // console.log(decodeded);

    const { URLRecurso } = req.params;
    const { RecursoURL, Ruta, Porcentaje, Tiempo } = req.body;
    let PorcentajeAux = Porcentaje + 0;
    let TiempoAux = parseInt(Tiempo + 0);
    //console.log("Recurso: " + RecursoURL);
    const Material = await prisma.materiales.findFirstOrThrow({
      where: {
        Direccion: RecursoURL,
      },
    });

    if (Material != null) {
      const Avance = await prisma.seguimiento.findUnique({
        where: {
          RecursoID_UsuarioID: {
            RecursoID: Material?.ID,
            UsuarioID: decodeded.ID,
          },
        },
      });
      if (Avance?.PorcentajeVisto != undefined) {
        //actualiza los datos
        if (PorcentajeAux * 100 + 0 > Avance?.PorcentajeVisto) {
          const CrearOActualizar = await prisma.seguimiento.update({
            where: {
              RecursoID_UsuarioID: {
                RecursoID: Material?.ID,
                UsuarioID: decodeded.ID,
              },
            },

            data: {
              UltimaVisto: new Date(),
              RutaVista: Ruta,
              TiempoVisto: TiempoAux + 0 || 0,
              PorcentajeVisto: PorcentajeAux * 100 + 0 || 100,
            },
          });
          console.log("Update");
        }else{
          console.log("Update Fecha");

          const CrearOActualizar = await prisma.seguimiento.update({
            where: {
              RecursoID_UsuarioID: {
                RecursoID: Material?.ID,
                UsuarioID: decodeded.ID,
              },
            },

            data: {
              UltimaVisto: new Date(),
              RutaVista: Ruta,
          
            },
          });
        }
      } else {
        //Crea el registro
        console.log("Creacion");
        const CrearOActualizar = await prisma.seguimiento.upsert({
          where: {
            RecursoID_UsuarioID: {
              RecursoID: Material?.ID,
              UsuarioID: decodeded.ID,
            },
          },
          create: {
            UsuarioID: decodeded.ID,
            RecursoID: Material.ID,
            RutaVista: Ruta,
            TiempoVisto: TiempoAux + 0 || 0,
            PorcentajeVisto: PorcentajeAux * 100 + 0 || 100,
          },
          update: {
            UsuarioID: decodeded.ID,
            RecursoID: Material.ID,
            RutaVista: Ruta,
            UltimaVisto: Fecha()
           
          },
        });
      }
    }

    return res.send();
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}

function Fecha() {
  const aux=new Date()
  console.log(aux)
  return aux
}