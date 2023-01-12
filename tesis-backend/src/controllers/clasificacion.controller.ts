import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetIdiomas(req: Request, res: Response) {
  try {

    const Idiomas = await prisma.idiomas.findMany();

    res.json(Idiomas);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetNivelDeAgregacion(req: Request, res: Response) {
  try {
   

    const NivelDeAgregacion = await prisma.nivelDeAgregacions.findMany();
    res.json(NivelDeAgregacion);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function GetNivelDeInteractividad(req: Request, res: Response) {
  try {
   

    const NivelDeAgregacion = await prisma.tipoInteractividad.findMany();
    res.json(NivelDeAgregacion);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function GetDestinatario(req: Request, res: Response) {
  try {
   

    const NivelDeAgregacion = await prisma.destinatario.findMany();
    res.json(NivelDeAgregacion);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function GetTipoConocimiento(req: Request, res: Response) {
  try {
   

    const NivelDeAgregacion = await prisma.tipoConocimiento.findMany();
    res.json(NivelDeAgregacion);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}


export async function GetTipoRecursoEducativo(req: Request, res: Response) {
  try {
   

    const NivelDeAgregacion = await prisma.tipoRecursoEducativo.findMany();
    res.json(NivelDeAgregacion);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}