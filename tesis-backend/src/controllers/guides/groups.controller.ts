import { Request, Response } from "express";
import { EjemploService as userService } from "../../services/users.services";
import jwt from "jsonwebtoken";

import { Prisma, PrismaClient, usuarios } from "@prisma/client";
import { ACCESS_TOKEN_SECRET } from "../../globlal";
const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
//
export async function GetGroup(req: Request, res: Response) {
  try {
    // const token = req.headers["x-access-token"];
    const { Codigo } = req.query;
    //const decodeded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
    const GruposSuscritos = await prisma.grupo.findFirst({
      where: { Codigo: Codigo as string },
      include: {
        Creador: { select: { Nombre: true, Apellidos: true } },

        CursoGuia: {
          include: {
            Plantilla: {
              include: {
                Bloques: {
                  include: {
                    Contenido: {
                      include: {
                        MaterialAsociado: { include: { TipoMaterial: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json(GruposSuscritos);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetGroupAdmin(req: Request, res: Response) {
  try {
    // const token = req.headers["x-access-token"];
    const { Codigo } = req.query;
    //const decodeded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
    const GruposSuscritos = await prisma.grupo.findFirst({
      where: { Codigo: Codigo as string },
      include: {
        Creador: { select: { Nombre: true, Apellidos: true } },
        Matriculados: {
          select: {
            ID: true,
            Nombre: true,
            Apellidos: true,
            Numero_Cuenta: true,
            Icono: true,
          },
        },
        CursoGuia: {
          include: {
            Plantilla: {
              include: {
                Bloques: {
                  include: {
                    Contenido: {
                      include: {
                        MaterialAsociado: { include: { TipoMaterial: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

   return res.status(200).json(GruposSuscritos);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//Trae todos los grupos en que este matriculado el user
export async function GetSuscribedGroups(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"];

    const decodeded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
    const GruposSuscritos = await prisma.grupo.findMany({
      where: { Matriculados: { some: { ID: parseInt(decodeded.ID) } } },
      include: { Creador: { select: { Nombre: true, Apellidos: true } } },
    });

    res.status(200).json(GruposSuscritos);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//Trae la guias creadas por el user
export async function GetMyGroups(req: Request, res: Response) {
  try {
    //const { Tipo, General, Titulo, Descripcion, PalabrasClave } = req.body;
    const token: any = req.headers["x-access-token"];

    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const Guia = await prisma.grupo.findMany({
      where: { CreadorID: parseInt(decodeded.ID) },
      include: {
        Matriculados: {
          select: {
            ID: true,
            Nombre: true,
            Apellidos: true,
            Numero_Cuenta: true,
            Icono: true,
          },
        },
      },
    });

    res.status(200).json(Guia);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function SuscribeTo(req: Request, res: Response) {
  try {
    let filler: any;
    const token: any = req.headers["x-access-token"];
    const decodeded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const { Codigo } = req.query;
    const Identificador = await prisma.grupo.findFirst({
      where: { Codigo: ("" + Codigo) as string },
    });
    console.log(Identificador);
    const Guia = await prisma.grupo.update({
      where: { ID: Identificador?.ID },
      data: { Matriculados: { connect: { ID: decodeded?.ID } } },
    });

    res.status(200).json(Guia);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function ExpulsarAlumno(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;
    const { AlumnoID } = req.body;
    const Grupo = await prisma.grupo.update({
      where: { ID: parseInt(Identificador) },
      data: { Matriculados: { disconnect: { ID: parseInt(AlumnoID) } } },
    });
    res.status(200).json(Grupo);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function GetMonitoreoDelGrupo(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"];

    const decodeded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);

    const { Codigo } = req.query;
    //Trae todos los users del grupo
    const Grupo = await prisma.grupo.findFirstOrThrow({
      where: { Codigo: Codigo as string },
    });
    const MaterialesDelGrupo = await prisma.materiales.findMany({
      where: {
        ContenidoBloqueCurso: {
          some: {
            BloquePerteneciente: {
              MateriaPerteneciente: {
                CursoGuia: {
                  some: { Grupo: { some: { ID: Grupo.ID } } },
                },
              },
            },
          },
        },
      },
      select: { ID: true },
    });
    const IDMAteriales = MaterialesDelGrupo.map((value) => value.ID);

    const SeguimientoGrupo = await prisma.seguimiento.findMany({
      orderBy: [{ Usuario: { Apellidos: "desc" } },{RecursoID:"desc"}],
      where: {
        AND: [
          { Usuario: { GrupoCursos: { some: { ID: Grupo.ID } } } },
          { RecursoID: { in: IDMAteriales } },
        ],
      },
      include: {
        Usuario: {
          select: {
            ID: true,
            Nombre: true,
            Apellidos: true,
            Icono: true,
          },
        },
        Recurso: {
          include: {
            TipoMaterial: true,
          },
        },
      },
    });
    // const AUx = await prisma.seguimiento.groupBy({
    //   by: ["UsuarioID", "RecursoID"],
    //   where: {
    //     AND: [
    //       { Usuario: { GrupoCursos: { some: { ID: Grupo.ID } } } },
    //       { RecursoID: { in: IDMAteriales } },
    //     ],
    //   },

    // });
    //console.log(SeguimientoGrupo)
    return res.send(SeguimientoGrupo);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}
