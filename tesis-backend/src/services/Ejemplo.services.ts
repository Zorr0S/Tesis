import { Request, Response } from "express";

export class EjemploService {
  get() {
    return new Promise((resolve, reject) => {
      const Mensaje: string = "HOLAAAA";
      resolve(Mensaje)
    });
  }
  
  

  getById(id: string) {
    return new Promise((resolve, reject) => {
      const Mensaje: string = `Hola ${(id)} ;`
      
      resolve(Mensaje);
    });
  }
  

}
