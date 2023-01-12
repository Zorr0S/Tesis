import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";
import jwt from "jsonwebtoken";

import { Prisma, PrismaClient } from "@prisma/client";
import { ACCESS_TOKEN_SECRET } from "../globlal";
import { TokenContent } from "../middlewares/BasicAuth";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const CursoService = new userService();
//Get functions
export async function GetListaMaterialesMateria(req: Request, res: Response) {
  try {
    const { MaterialID } = req.query;
    const token = req.headers["x-access-token"] as string;
    //console.log("Token: " + token);
    let IDUser: number;
    if (token.length > 0) {
      console.log("Loggeado" + MaterialID);

      const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
      IDUser = parseInt(decodeded.ID);
      const CursoLogged = await prisma.materiales.findMany({
        where: {
          ContenidoBloque: {
            some: {
              ID: parseInt(MaterialID as string),
            },
          },
        },
        include: {
          Seguimiento: {
            where: {
              UsuarioID: IDUser,
            },
          },
          TipoMaterial: true,
        },
      });

      res.json(CursoLogged);
    } else {
      console.log("NoLoggeado");
      const Curso = await prisma.materiales.findMany({
        where: {
          ContenidoBloque: {
            some: {
              ID: parseInt(MaterialID as string),
            },
          },
        },
        include: {
          TipoMaterial: true,
          // IdiomaTabla:true,
          // Agregacion:true,
          // TipoRecursoEducativoTabla:true,
          // TipoInteractividadTabla:true,
          // Destinatario:true,
          // TipoDeConocimiento:true
        },
      });
      res.json(Curso);
    }
    //let data: TokenContent;

    // if (token.length > 0) {
    // const decodeded = jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenContent;
    // data = decodeded;

    // }
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetListaMaterialesCurso(req: Request, res: Response) {
  try {
    const { MaterialID } = req.query;
    const token = req.headers["x-access-token"] as string;
    //console.log("Token: " + token);
    let IDUser: number;

    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    IDUser = parseInt(decodeded.ID);
    const CursoLogged = await prisma.materiales.findMany({
      where: {
        ContenidoBloqueCurso: {
          some: {
            ID: parseInt(MaterialID as string),
          },
        },
      },
      include: {
        Seguimiento: {
          where: {
            UsuarioID: IDUser,
          },
        },
        TipoMaterial: true,
      },
    });

    res.json(CursoLogged);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function getMaterialesDisponible(req: Request, res: Response) {
  try {
    const Materiales = await prisma.materiales.findMany({
      include: {
        TipoMaterial: true,
        IdiomaTabla: true,
        Agregacion: true,
        TipoRecursoEducativoTabla: true,
        TipoInteractividadTabla: true,
        Destinatario: true,
        TipoDeConocimiento: true,
      },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetPersonalRecurso(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"] as string;
    //console.log("Token: " + token);
    let IDUser: number;

    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    IDUser = parseInt(decodeded.ID);
    const Materiales = await prisma.materiales.findMany({
      where: { AuthorID: IDUser },
      include: {
        TipoMaterial: true,
        IdiomaTabla: true,
        Agregacion: true,
        TipoRecursoEducativoTabla: true,
        TipoInteractividadTabla: true,
        Destinatario: true,
        TipoDeConocimiento: true,
      },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function getMateriales(req: Request, res: Response) {
  try {
    const Materiales = await prisma.materiales.findMany({
      include: {
        TipoMaterial: true,
        IdiomaTabla: true,
        Agregacion: true,
        TipoRecursoEducativoTabla: true,
        TipoInteractividadTabla: true,
        Destinatario: true,
        TipoDeConocimiento: true,
      },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function getMaterial(req: Request, res: Response) {
  try {
    const Materiales = await prisma.materiales.findFirstOrThrow({
      include: { TipoMaterial: true },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function getMaterialesMateria(req: Request, res: Response) {
  try {
    const { ContenidoID } = req.query;

    const Materiales = await prisma.materiales.findMany({
      where: {
        ContenidoBloque: {
          some: {
            ID: parseInt(ContenidoID as string),
          },
        },
      },
      include: { TipoMaterial: true },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function getMaterialesCurso(req: Request, res: Response) {
  try {
    const { ContenidoID } = req.query;

    const Materiales = await prisma.materiales.findMany({
      where: {
        ContenidoBloqueCurso: {
          some: {
            ID: parseInt(ContenidoID as string),
          },
        },
      },
      include: { TipoMaterial: true },
    });

    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function LinkMateriralToMateria(req: Request, res: Response) {
  try {
    const { IDContenidoMateria } = req.params;
    const { Recursos } = req.body;

    const ArregloRecursos = Recursos as Array<{ ID: number }>;
    console.log(ArregloRecursos);
    // const Desconectar = await prisma.contenidoBloque.update({
    //   where: { ID: parseInt(IDContenidoMateria) },
    //   data: {
    //     MaterialAsociado: { },
    //   },
    //   include:{
    //     MaterialAsociado:true
    //   }
    // });
    const Materiales = await prisma.contenidoBloque.update({
      where: { ID: parseInt(IDContenidoMateria) },
      data: {
        MaterialAsociado: { set: ArregloRecursos },
      },
      include: {
        MaterialAsociado: true,
      },
    });
    // const contenido = await prisma.contenidoBloque.update({
    //   where: { ID: Validar[0].ID },
    //   data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
    // });
    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function LinkMateriralToCurso(req: Request, res: Response) {
  try {
    const { IDContenidoMateria } = req.params;
    const { Recursos } = req.body;

    const ArregloRecursos = Recursos as Array<{ ID: number }>;
    console.log(ArregloRecursos);
    // const Desconectar = await prisma.contenidoBloque.update({
    //   where: { ID: parseInt(IDContenidoMateria) },
    //   data: {
    //     MaterialAsociado: { },
    //   },
    //   include:{
    //     MaterialAsociado:true
    //   }
    // });
    const Materiales = await prisma.contenidoBloqueCurso.update({
      where: { ID: parseInt(IDContenidoMateria) },
      data: {
        MaterialAsociado: { set: ArregloRecursos },
      },
      include: {
        MaterialAsociado: true,
      },
    });
    // const contenido = await prisma.contenidoBloque.update({
    //   where: { ID: Validar[0].ID },
    //   data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
    // });
    res.json(Materiales);
  } catch (error) {
    console.log(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
