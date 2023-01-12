import { Request, Response } from "express";
import { Prisma,PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class EjemploService {
  get() {
    const Hola = {}
    return prisma.usuarios.findMany()
  }
  
  

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const Mensaje: string = `Hola ${(id)} ;`
      
      resolve(Mensaje);
    });
  }
  
  Create(){
   
    
  }
  

}
