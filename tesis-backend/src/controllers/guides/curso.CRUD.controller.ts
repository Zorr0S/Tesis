import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { Prisma, PrismaClient, usuarios } from "@prisma/client";
import { ACCESS_TOKEN_SECRET, DominioIP } from "../../globlal";
const prisma = new PrismaClient();
import multer from "multer";
import path from "path";
import ShortUniqueId from "short-unique-id";
//CRUD Grupos
export const StorageGroupIcon = multer.diskStorage({
  destination: async (req, file, cb) => {
    let dir = "Icons/Guides";
    cb(null, dir);
  },
  filename: async (req, file, cb) => {
    const { Identificador } = req.params;
    console.log("si: " + req.file?.size);
    let Nombre =
      `${Identificador}_IconoGrupo` + path.extname(file.originalname);
    await prisma.iconos.create({
      data: {
        NombreArchivo: Nombre,
        LinkDeIcono: `${DominioIP}/archivo/icono/${Nombre}`,
        RutaArchivo: file.destination || "",
      },
    });

    cb(null, Nombre);
  },
});
export async function CambiarIconoGrupo(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;
    // Icono: req.file?.filename

    const Grupo = await prisma.grupo.update({
      where: { ID: parseInt(Identificador) },
      data: {
        Icono: `${DominioIP}/archivo/icono/${req.file?.filename}`,
      },
    });

    return res.status(200).json(Grupo);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function ViewGrupo(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;

    const Grupo = await prisma.grupo.findFirstOrThrow({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(Grupo);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function CreateGrupo(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"];
    const { Nombre, Descripcion } = req.body; //Grupo
    const {
      Guia: { GuiaNombre },
    } = req.body; //Guia
    const decoded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
    const uuid= new ShortUniqueId({ length: 7 });
    const CodigoGenerado= uuid()
    const GruposCreado = await prisma.grupo.create({
      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
        CreadorID: parseInt(decoded.ID),
        CursoGuia: {
          create: {
            Nombre: GuiaNombre,
            CreadorID: parseInt(decoded.ID),
          },
        },
        Matriculados: { connect: { ID: decoded?.ID } },
        Codigo: CodigoGenerado
        
      },
    });

    return res.status(200).json(GruposCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function EditGrupo(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Identificador } = req.params;

    const GruposCreado = await prisma.grupo.update({
      where: { ID: parseInt(Identificador) },
      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
      },
    });

    return res.status(200).json(GruposCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function DeleteGrupo(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;
    //debe borrarse Grupo,CursoGuia,Curso
    // const DatosGrupo = await prisma.grupo.findFirstOrThrow({
    //   where: { ID: parseInt(Identificador) },
    // });

    // const DatosCursoGuia = await prisma.cursoGuia.findFirstOrThrow({
    //   where: { Grupo: { some: { ID: DatosGrupo.ID } } },
    // });

    // //
    // const CursoBorrado = await prisma.curso.deleteMany({
    //   where: { CursoGuia: { some: { ID: DatosCursoGuia.ID } } },
    // });
    // const CursoGuiaBorrado = await prisma.cursoGuia.deleteMany({
    //   where: { Grupo: { some: { ID: DatosGrupo.ID } } },
    // });

    const GruposBorrado = await prisma.grupo.delete({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(GruposBorrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//CRUD GUIA
export async function ViewGuia(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo

    const { Identificador } = req.params;

    const Guia = await prisma.cursoGuia.findFirstOrThrow({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(Guia);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function CreateGuia(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"];
    const { Nombre } = req.body; //Grupo

    const { Identificador } = req.params;

    const decoded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);
    const Grupo = await prisma.grupo.findFirstOrThrow({
      where: {
        ID: parseInt(Identificador),
      },
    });

    const GuiaCreada = await prisma.cursoGuia.create({
      data: {
        Nombre: Nombre,
        CreadorID: parseInt(decoded.ID),
        Grupo: {
          connect: [{ ID: Grupo.ID }],
        },
      },
    });

    return res.status(200).json(GuiaCreada);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function EditGuia(req: Request, res: Response) {
  try {
    const { Nombre } = req.body; //Grupo

    const { Identificador } = req.params;

    const GuiaCreada = await prisma.cursoGuia.update({
      where: { ID: parseInt(Identificador) },
      data: {
        Nombre: Nombre,
      },
    });

    return res.status(200).json(GuiaCreada);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function DeleteGuia(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;

    const GuiaCreada = await prisma.cursoGuia.delete({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(GuiaCreada);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//Crud CURSO
export async function ViewCurso(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);

    const Curso = await prisma.curso.findFirstOrThrow({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(Curso);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function CreateCurso(req: Request, res: Response) {
  try {
    const token = req.headers["x-access-token"];
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;
    const decoded: any = jwt.verify(token as string, ACCESS_TOKEN_SECRET);

    console.log(Identificador);
    const Grupo = await prisma.cursoGuia.findFirstOrThrow({
      where: {
        ID: parseInt(Identificador),
      },
    });
    console.log(Grupo);
    const GuiaCreado = await prisma.curso.create({
      data: {
        CursoGuia: {
          connect: [{ ID: Grupo.ID }],
        },

        Nombre: Nombre,
        Descripcion: Descripcion,
        CreadorID: parseInt(decoded.ID),
      },
    });

    return res.status(200).json(GuiaCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function EditCurso(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);

    const GuiaCreado = await prisma.curso.update({
      where: { ID: parseInt(Identificador) },

      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
      },
    });

    return res.status(200).json(GuiaCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function DeleteCurso(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;

    console.log(Identificador);

    const GuiaCreado = await prisma.curso.delete({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(GuiaCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//Bloque
export async function ViewBloque(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);
    // const Curso = await prisma.curso.findFirstOrThrow({
    //   where: {
    //     ID: parseInt(Identificador),
    //   },
    // });
    //console.log(Curso);
    const BloqueCreado = await prisma.bloqueCurso.update({
      where: { ID: parseInt(Identificador) },

      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
      },
    });

    return res.status(200).json(BloqueCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function CreateBloque(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);
    // const Curso = await prisma.curso.findFirstOrThrow({
    //   where: {
    //     ID: parseInt(Identificador),
    //   },
    // });
    //console.log(Curso);
    const BloqueCreado = await prisma.bloqueCurso.create({
      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
        MateriaID: parseInt(Identificador),
      },
    });

    return res.status(200).json(BloqueCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function EditBloque(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);
    // const Curso = await prisma.curso.findFirstOrThrow({
    //   where: {
    //     ID: parseInt(Identificador),
    //   },
    // });
    //console.log(Curso);
    const BloqueCreado = await prisma.bloqueCurso.update({
      where: { ID: parseInt(Identificador) },

      data: {
        Nombre: Nombre,
        Descripcion: Descripcion,
      },
    });

    return res.status(200).json(BloqueCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function DeleteBloque(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;

    const BloqueCreado = await prisma.bloqueCurso.delete({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(BloqueCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
//ContenidoCrud
export async function ViewContenido(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    const ContenidoCreado = await prisma.contenidoBloqueCurso.findFirstOrThrow({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(ContenidoCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function CreateContenido(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Codigo } = req.body; //ID
    const { Identificador } = req.params;

    console.log(Identificador);
    // const Curso = await prisma.curso.findFirstOrThrow({
    //   where: {
    //     ID: parseInt(Identificador),
    //   },
    // });
    //console.log(Curso);
    const ContenidoCreado = await prisma.contenidoBloqueCurso.create({
      data: {
        Titulo: Nombre,
        Descripcion: Descripcion,
        BlqueID: parseInt(Identificador),
      },
    });

    return res.status(200).json(ContenidoCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function EditContenido(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Identificador } = req.params;

    const ContenidoCreado = await prisma.contenidoBloqueCurso.update({
      where: { ID: parseInt(Identificador) },

      data: {
        Titulo: Nombre,
        Descripcion: Descripcion,
      },
    });

    return res.status(200).json(ContenidoCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function DeleteContenido(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body; //Grupo
    const { Identificador } = req.params;

    const ContenidoCreado = await prisma.contenidoBloqueCurso.delete({
      where: { ID: parseInt(Identificador) },
    });

    return res.status(200).json(ContenidoCreado);
  } catch (error) {
    console.error(error);
    return res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}
