import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class EjemploService {
  get() {
    const Hola = {};
    return prisma.usuarios.findMany();
  }

  getById(IDUser: number) {
    return new Promise((resolve, reject) => {
      
      return prisma.usuarios.findMany({
        where: { ID: IDUser },
        select: {
          ID: true,
          Tipo_user: true,
          Nombre: true,
          Apellidos: true,
          Numero_Cuenta: true,
          Correo: true,
        },
      });
    });
  }

  Create() {}
}
