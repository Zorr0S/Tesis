import { Prisma, PrismaClient } from "@prisma/client";
import console, { error } from "console";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { EjemploService } from "../services/Ejemplo.services";
import path from "path";
import { ACCESS_TOKEN_SECRET, Dominio } from "../globlal";

//El controlador se encarga del cuerpo del la funcion Rest
const ejemploService = new EjemploService();
const prisma = new PrismaClient();
//Get functions
export async function UploadRecurso(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body;
    //Clasificacion

    const {
      URL,
      PalabrasClave,
      Catalogo,
      Idioma,
      Ambito,
      Estructura,
      NivelDeAgregacion,
      //UsoEducativo
      RangoDeEdad,
      Version,
      Estado,
      Contribucion,
      TipoContribucion,
      Entidad,
      IdiomaUtilizado,
      Dificultad,
      Contexto,

      //
      tipoInteractividad,
      TipoRecurso, //Checar esto
      DensidadSemantica,
      TiempoAprendisaje,
      DescripcionRecurso,
      ConocimientoPrevio,
      ObjetivosDidacticos,
      TipoConomiento,
      ProcesoCognitivo,
      //
      Proposito,
      Fuente,
      Taxon,
      Entrada,
      TipoDestinatario,
    } = req.body;
    //Index
    const {
      FacultadID,
      CarreraID,
      PlanID,
      SemestreID,
      MateriaID,
      BloqueID,
      ContenidoID,
    } = req.body;
    console.log("Entro");

    console.log(
      FacultadID,
      CarreraID,
      PlanID,
      SemestreID,
      MateriaID,
      BloqueID,
      ContenidoID
    );

    const Tipo = await ObtenerExtension(URL + "");
    //Asociado normal

    const archivo = await prisma.materiales.create({
      data: {
        EsLocal: true,
        Titulo: Nombre,
        Descripcion: Descripcion,
        PalabrasClave: PalabrasClave,
        AuthorID: 1,
        TipoMaterialId: Tipo,
        Direccion: URL,
        //
        Catalogo: Catalogo,
        IDIdioma: parseInt(Idioma),
        Ambito: Ambito,
        Estructura: Estructura,
        IDNivelAgregacion: parseInt(NivelDeAgregacion),
        //Ciclo
        TipoContribucion: TipoContribucion,
        Version: Version,
        Estado: Estado,
        Contribucion: Contribucion,
        TipoConocimiento: parseInt(TipoConomiento),
        Entidad: Entidad,
        //Educativo
        RangoDeEdad: RangoDeEdad,
        TipoInteractividad: parseInt(tipoInteractividad),
        TipRecurso: parseInt(TipoRecurso),
        DensidadSemantica: DensidadSemantica,
        TiempoTipicoAprendizadje: TiempoAprendisaje,
        DescripcionRecurso: DescripcionRecurso,
        ConocimientoPrevio: ConocimientoPrevio,
        ObjetivosDidacticos: ObjetivosDidacticos,
        TipoDestinatario: parseInt(TipoDestinatario),
        ProcesoCognitivo: ProcesoCognitivo,
        IdiomaUtilizado: IdiomaUtilizado,
        //
        Proposito: Proposito,

        Fuente: Fuente,
        Taxon: Taxon,
        Entrada: Entrada,
        //
        Dificultad: Dificultad,
        Contexto: Contexto,
      },
    });
    console.log(archivo);

    //VAlidar IDs
    const Validar = await prisma.contenidoBloque.findMany({
      where: {
        BloquePerteneciente: {
          is: {
            ID: parseInt(BloqueID),
            MateriaPerteneciente: {
              is: {
                ID: parseInt(MateriaID),
                SemestrePerteneciente: {
                  is: {
                    ID: parseInt(SemestreID),
                    PlanPerteneciente: {
                      is: {
                        ID: parseInt(PlanID),
                        CarreraPerteneciente: {
                          is: {
                            ID: parseInt(CarreraID),
                            FacultadID: parseInt(FacultadID),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ID: parseInt(ContenidoID),
      },
    });

    const contenido = await prisma.contenidoBloque.update({
      where: { ID: Validar[0].ID },
      data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
    });

    return res.json({
      status: "OK",
      uploaded: archivo?.Direccion,
      id: archivo.ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al subir los datos" }]);
  }
}

export async function UploadFileAsociado(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion, PalabrasClave } = req.body;
    //Clasificacion
    const {
      Catalogo,
      Idioma,
      Ambito,
      Estructura,
      NivelDeAgregacion,
      //UsoEducativo
      RangoDeEdad,
      Version,
      Estado,
      Contribucion,
      TipoContribucion,
      Entidad,
      IdiomaUtilizado,
      Dificultad,
      Contexto,

      //
      tipoInteractividad,
      TipoRecurso,
      DensidadSemantica,
      TiempoAprendisaje,
      DescripcionRecurso,
      ConocimientoPrevio,
      ObjetivosDidacticos,
      TipoConomiento,
      ProcesoCognitivo,
      //
      Proposito,
      Fuente,
      Taxon,
      Entrada,
      TipoDestinatario,
    } = req.body;
    //Index
    const {
      FacultadID,
      CarreraID,
      PlanID,
      SemestreID,
      MateriaID,
      BloqueID,
      ContenidoID,
    } = req.body;

    console.log(Nombre);
    console.log(Descripcion);
    console.log(req.file?.filename);

    const Tipo = await ObtenerExtension(req.file?.filename + "");
    //Asociado normal

    const archivo = await prisma.materiales.create({
      data: {
        EsLocal: true,
        Titulo: Nombre,
        Descripcion: Descripcion,
        PalabrasClave: PalabrasClave,
        AuthorID: 1,
        TipoMaterialId: Tipo,
        LocalPath: req.file?.destination + "/" + req.file?.filename,
        NombreArchivo: req.file?.filename,
        Direccion: Dominio + req.file?.filename,
        //
        Catalogo: Catalogo,
        IDIdioma: parseInt(Idioma),
        Ambito: Ambito,
        Estructura: Estructura,
        IDNivelAgregacion: parseInt(NivelDeAgregacion),
        //Ciclo
        TipoContribucion: TipoContribucion,
        Version: Version,
        Estado: Estado,
        Contribucion: Contribucion,
        TipoConocimiento: parseInt(TipoConomiento),
        Entidad: Entidad,
        //Educativo
        RangoDeEdad: RangoDeEdad,
        TipoInteractividad: parseInt(tipoInteractividad),
        TipRecurso: parseInt(TipoRecurso),
        DensidadSemantica: DensidadSemantica,
        TiempoTipicoAprendizadje: TiempoAprendisaje,
        DescripcionRecurso: DescripcionRecurso,
        ConocimientoPrevio: ConocimientoPrevio,
        ObjetivosDidacticos: ObjetivosDidacticos,
        TipoDestinatario: parseInt(TipoDestinatario),
        ProcesoCognitivo: ProcesoCognitivo,
        IdiomaUtilizado: IdiomaUtilizado,
        //
        Proposito: Proposito,
        RutaTaxonomica:
          "" +
          FacultadID +
          CarreraID +
          PlanID +
          SemestreID +
          MateriaID +
          BloqueID +
          ContenidoID,
        Fuente: Fuente,
        Taxon: Taxon,
        Entrada: Entrada,
        //
        Dificultad: Dificultad,
        Contexto: Contexto,
      },
    });
    console.log(archivo);

    //VAlidar IDs
    const Validar = await prisma.contenidoBloque.findMany({
      where: {
        BloquePerteneciente: {
          is: {
            ID: parseInt(BloqueID),
            MateriaPerteneciente: {
              is: {
                ID: parseInt(MateriaID),
                SemestrePerteneciente: {
                  is: {
                    ID: parseInt(SemestreID),
                    PlanPerteneciente: {
                      is: {
                        ID: parseInt(PlanID),
                        CarreraPerteneciente: {
                          is: {
                            ID: parseInt(CarreraID),
                            FacultadID: parseInt(FacultadID),
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        ID: parseInt(ContenidoID),
      },
    });

    const contenido = await prisma.contenidoBloque.update({
      where: { ID: Validar[0].ID },
      data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
    });

    return res.json({
      status: "OK",
      uploaded: archivo?.Direccion,
      id: archivo.ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetFile(req: Request, res: Response) {
  try {
    const { Archivo } = req.params;
    console.log(Archivo);
    const material = await prisma.materiales.findFirst({
      where: {
        NombreArchivo: Archivo,
        EsLocal: true,
      },
    });
    let Resultado: any;

    Resultado = material;
    let Dire: string = material?.NombreArchivo + "";

    return res.sendFile(Dire, { root: "uploads" });
  } catch (error) {
    console.error(error);
    return res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}
export async function desactivarRecurso(req: Request, res: Response) {
  try {
    const { Identificador } = req.params;
    const Dato = await prisma.materiales.findFirstOrThrow({where:{ ID: parseInt(Identificador),}})
    let Env
    if(Dato.Estatus){
      Env =await prisma.materiales.update({
        where: {
          ID: Dato.ID,
        },data:{
          Estatus:false
        }
      });
    }else{
      Env =await prisma.materiales.update({
        where: {
          ID: Dato.ID,
        },data:{
          Estatus:true
        }
      });
    }

    return res.send(Env);
  } catch (error) {
    console.error(error);
    return res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}



export async function GetGroupIcon(req: Request, res: Response) {
  try {
    const { Archivo } = req.params;

    const material = await prisma.iconos.findFirst({
      where: {
        NombreArchivo: Archivo,
      },
    });
    let Dire: string = material?.NombreArchivo || "";

    return res.sendFile(Dire, { root: "Icons/Guides" });
  } catch (error) {
    console.error(error);
    return res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}

async function ObtenerExtension(Cadena: string): Promise<number> {
  let ExtensionArchivo = path.extname(Cadena);
  const terminacion = await prisma.tipo_Material.findFirst({
    where: { Terminaciones: { contains: ExtensionArchivo } },
  });
  const Reg = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
  //console.log(terminacion);

  let Tipo = terminacion?.ID;
  if (Reg.test(Cadena)) {
    Tipo = 3;
    return Tipo;
  } else if (Tipo == null) {
    Tipo = 5;
  }
  return Tipo;
}

export async function GetRecurso(req: Request, res: Response) {
  try {
    const { recurso } = req.params;
    const material = await prisma.materiales.findUnique({
      where: {
        ID: parseInt(recurso),
      },
      include: {
        IdiomaTabla: true,
        Agregacion: true,
        TipoRecursoEducativoTabla: true,
        TipoInteractividadTabla: true,
        Destinatario: true,
        TipoDeConocimiento: true,
      },
    });
    let Resultado: any;

    Resultado = await material;

    return res.send(material);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function EditRecurso(req: Request, res: Response) {
  try {
    const { Nombre, Descripcion } = req.body;
    const { recurso } = req.params;
    //Clasificacion

    const {
      PalabrasClave,
      Catalogo,
      Idioma,
      Ambito,
      Estructura,
      NivelDeAgregacion,
      //UsoEducativo
      RangoDeEdad,
      Version,
      Estado,
      Contribucion,
      TipoContribucion,
      Entidad,
      IdiomaUtilizado,
      Dificultad,
      Contexto,

      //
      tipoInteractividad,
      TipoRecurso, //Checar esto
      DensidadSemantica,
      TiempoAprendisaje,
      DescripcionRecurso,
      ConocimientoPrevio,
      ObjetivosDidacticos,
      TipoConomiento,
      ProcesoCognitivo,
      //
      Proposito,
      Fuente,
      Taxon,
      Entrada,
      TipoDestinatario,
    } = req.body;
    //Index


    const Tipo = await ObtenerExtension(URL + "");
    //Asociado normal

    const archivo = await prisma.materiales.update({
      where: { ID: parseInt(recurso) },

      data: {
        Titulo: Nombre,
        Descripcion: Descripcion,
        PalabrasClave: PalabrasClave,
        //
        Catalogo: Catalogo,
        IDIdioma: parseInt(Idioma),
        Ambito: Ambito,
        Estructura: Estructura,
        IDNivelAgregacion: parseInt(NivelDeAgregacion),
        //Ciclo
        TipoContribucion: TipoContribucion,
        Version: Version,
        Estado: Estado,
        Contribucion: Contribucion,
        TipoConocimiento: parseInt(TipoConomiento),
        Entidad: Entidad,
        //Educativo
        RangoDeEdad: RangoDeEdad,
        TipoInteractividad: parseInt(tipoInteractividad),
        TipRecurso: parseInt(TipoRecurso),
        DensidadSemantica: DensidadSemantica,
        TiempoTipicoAprendizadje: TiempoAprendisaje,
        DescripcionRecurso: DescripcionRecurso,
        ConocimientoPrevio: ConocimientoPrevio,
        ObjetivosDidacticos: ObjetivosDidacticos,
        TipoDestinatario: parseInt(TipoDestinatario),
        ProcesoCognitivo: ProcesoCognitivo,
        IdiomaUtilizado: IdiomaUtilizado,
        //
        Proposito: Proposito,

        Fuente: Fuente,
        Taxon: Taxon,
        Entrada: Entrada,
        //
        Dificultad: Dificultad,
        Contexto: Contexto,
      },
    });
    //console.log(archivo);

    return res.json({
      status: "OK",
      uploaded: archivo?.Direccion,
      id: archivo.ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al subir los datos" }]);
  }
}

export async function UploadRecursoToCurso(req: Request, res: Response) {
  try {
    //console.log("Eiii");
    const { Nombre, Descripcion } = req.body;
    //Clasificacion
    const { ContenidoID } = req.query;
    const {
      URL,
      PalabrasClave,
      Catalogo,
      Idioma,
      Ambito,
      Estructura,
      NivelDeAgregacion,
      //UsoEducativo
      RangoDeEdad,
      Version,
      Estado,
      Contribucion,
      TipoContribucion,
      Entidad,
      IdiomaUtilizado,
      Dificultad,
      Contexto,

      //
      tipoInteractividad,
      TipoRecurso, //Checar esto
      DensidadSemantica,
      TiempoAprendisaje,
      DescripcionRecurso,
      ConocimientoPrevio,
      ObjetivosDidacticos,
      TipoConomiento,
      ProcesoCognitivo,
      //
      Proposito,
      Fuente,
      Taxon,
      Entrada,
      TipoDestinatario,
    } = req.body;
    const token: any = req.headers["x-access-token"];
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);

    //Index
    // const {
    //   FacultadID,
    //   CarreraID,
    //   PlanID,
    //   SemestreID,
    //   MateriaID,
    //   BloqueID,
    //   ContenidoID,
    // } = req.body;
    console.log("Entro");

    if (
      req.file?.filename.length == undefined ||
      req.file?.filename.length == 0
    ) {
      const Tipo = await ObtenerExtension(URL + "");

      const archivo = await prisma.materiales.create({
        data: {
          EsPublica: false,
          EsLocal: true,
          Titulo: Nombre,
          Descripcion: Descripcion,
          PalabrasClave: PalabrasClave,
          AuthorID: parseInt(decoded.ID),
          TipoMaterialId: Tipo,
          Direccion: URL,
          //
          Catalogo: Catalogo,
          IDIdioma: parseInt(Idioma),
          Ambito: Ambito,
          Estructura: Estructura,
          IDNivelAgregacion: parseInt(NivelDeAgregacion),
          //Ciclo
          TipoContribucion: TipoContribucion,
          Version: Version,
          Estado: Estado,
          Contribucion: Contribucion,
          TipoConocimiento: parseInt(TipoConomiento),
          Entidad: Entidad,
          //Educativo
          RangoDeEdad: RangoDeEdad,
          TipoInteractividad: parseInt(tipoInteractividad),
          TipRecurso: parseInt(TipoRecurso),
          DensidadSemantica: DensidadSemantica,
          TiempoTipicoAprendizadje: TiempoAprendisaje,
          DescripcionRecurso: DescripcionRecurso,
          ConocimientoPrevio: ConocimientoPrevio,
          ObjetivosDidacticos: ObjetivosDidacticos,
          TipoDestinatario: parseInt(TipoDestinatario),
          ProcesoCognitivo: ProcesoCognitivo,
          IdiomaUtilizado: IdiomaUtilizado,
          //
          Proposito: Proposito,

          Fuente: Fuente,
          Taxon: Taxon,
          Entrada: Entrada,
          //
          Dificultad: Dificultad,
          Contexto: Contexto,
        },
      });

      const contenido = await prisma.contenidoBloqueCurso.update({
        where: { ID: parseInt(ContenidoID as string) },
        data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
      });
      return res.json({
        status: "OK",
        uploaded: archivo?.Direccion,
        id: archivo.ID,
      });
    } else {
      const Tipo = await ObtenerExtension(req.file?.filename);
      //Asociado normal

      const archivo = await prisma.materiales.create({
        data: {
          EsPublica: false,

          EsLocal: true,
          Titulo: Nombre,
          Descripcion: Descripcion,
          PalabrasClave: PalabrasClave,
          AuthorID: parseInt(decoded.ID),
          TipoMaterialId: Tipo,
          LocalPath: req.file?.destination + "/" + req.file?.filename,
          NombreArchivo: req.file?.filename,
          Direccion: Dominio + req.file?.filename,
          //
          Catalogo: Catalogo,
          IDIdioma: parseInt(Idioma),
          Ambito: Ambito,
          Estructura: Estructura,
          IDNivelAgregacion: parseInt(NivelDeAgregacion),
          //Ciclo
          TipoContribucion: TipoContribucion,
          Version: Version,
          Estado: Estado,
          Contribucion: Contribucion,
          TipoConocimiento: parseInt(TipoConomiento),
          Entidad: Entidad,
          //Educativo
          RangoDeEdad: RangoDeEdad,
          TipoInteractividad: parseInt(tipoInteractividad),
          TipRecurso: parseInt(TipoRecurso),
          DensidadSemantica: DensidadSemantica,
          TiempoTipicoAprendizadje: TiempoAprendisaje,
          DescripcionRecurso: DescripcionRecurso,
          ConocimientoPrevio: ConocimientoPrevio,
          ObjetivosDidacticos: ObjetivosDidacticos,
          TipoDestinatario: parseInt(TipoDestinatario),
          ProcesoCognitivo: ProcesoCognitivo,
          IdiomaUtilizado: IdiomaUtilizado,
          //
          Proposito: Proposito,
          // RutaTaxonomica:
          //   "" +
          //   FacultadID +
          //   CarreraID +
          //   PlanID +
          //   SemestreID +
          //   MateriaID +
          //   BloqueID +
          //   ContenidoID,
          Fuente: Fuente,
          Taxon: Taxon,
          Entrada: Entrada,
          //
          Dificultad: Dificultad,
          Contexto: Contexto,
        },
      });
      const contenido = await prisma.contenidoBloqueCurso.update({
        where: { ID: parseInt(ContenidoID as string) },
        data: { MaterialAsociado: { connect: [{ ID: archivo.ID }] } },
      });
      return res.json({
        status: "OK",
        uploaded: archivo?.Direccion,
        id: archivo.ID,
      });
    }
    //Asociado normal
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al subir los datos" }]);
  }
}

export async function UploadRecursoLibre(req: Request, res: Response) {
  try {
    console.log("Eiii");
    const { Nombre, Descripcion } = req.body;
    //Clasificacion
    const { ContenidoID } = req.query;
    const {
      URL,
      PalabrasClave,
      Catalogo,
      Idioma,
      Ambito,
      Estructura,
      NivelDeAgregacion,
      //UsoEducativo
      RangoDeEdad,
      Version,
      Estado,
      Contribucion,
      TipoContribucion,
      Entidad,
      IdiomaUtilizado,
      Dificultad,
      Contexto,

      //
      tipoInteractividad,
      TipoRecurso, //Checar esto
      DensidadSemantica,
      TiempoAprendisaje,
      DescripcionRecurso,
      ConocimientoPrevio,
      ObjetivosDidacticos,
      TipoConomiento,
      ProcesoCognitivo,
      //
      Proposito,
      Fuente,
      Taxon,
      Entrada,
      TipoDestinatario,
    } = req.body;
    const token: any = req.headers["x-access-token"];
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);

    //Index
    // const {
    //   FacultadID,
    //   CarreraID,
    //   PlanID,
    //   SemestreID,
    //   MateriaID,
    //   BloqueID,
    //   ContenidoID,
    // } = req.body;
    console.log("Entro");

    if (
      req.file?.filename.length == undefined ||
      req.file?.filename.length == 0
    ) {
      const Tipo = await ObtenerExtension(URL + "");

      const archivo = await prisma.materiales.create({
        data: {
          EsPublica: true,
          EsLocal: true,
          Titulo: Nombre,
          Descripcion: Descripcion,
          PalabrasClave: PalabrasClave,
          AuthorID: parseInt(decoded.ID),
          TipoMaterialId: Tipo,
          Direccion: URL,
          //
          Catalogo: Catalogo,
          IDIdioma: parseInt(Idioma),
          Ambito: Ambito,
          Estructura: Estructura,
          IDNivelAgregacion: parseInt(NivelDeAgregacion),
          //Ciclo
          TipoContribucion: TipoContribucion,
          Version: Version,
          Estado: Estado,
          Contribucion: Contribucion,
          TipoConocimiento: parseInt(TipoConomiento),
          Entidad: Entidad,
          //Educativo
          RangoDeEdad: RangoDeEdad,
          TipoInteractividad: parseInt(tipoInteractividad),
          TipRecurso: parseInt(TipoRecurso),
          DensidadSemantica: DensidadSemantica,
          TiempoTipicoAprendizadje: TiempoAprendisaje,
          DescripcionRecurso: DescripcionRecurso,
          ConocimientoPrevio: ConocimientoPrevio,
          ObjetivosDidacticos: ObjetivosDidacticos,
          TipoDestinatario: parseInt(TipoDestinatario),
          ProcesoCognitivo: ProcesoCognitivo,
          IdiomaUtilizado: IdiomaUtilizado,
          //
          Proposito: Proposito,

          Fuente: Fuente,
          Taxon: Taxon,
          Entrada: Entrada,
          //
          Dificultad: Dificultad,
          Contexto: Contexto,
        },
      });

      return res.json({
        status: "OK",
        uploaded: archivo?.Direccion,
        id: archivo.ID,
      });
    } else {
      const Tipo = await ObtenerExtension(req.file?.filename);
      //Asociado normal

      const archivo = await prisma.materiales.create({
        data: {
          EsPublica: true,

          EsLocal: true,
          Titulo: Nombre,
          Descripcion: Descripcion,
          PalabrasClave: PalabrasClave,
          AuthorID: parseInt(decoded.ID),
          TipoMaterialId: Tipo,
          LocalPath: req.file?.destination + "/" + req.file?.filename,
          NombreArchivo: req.file?.filename,
          Direccion: Dominio + req.file?.filename,
          //
          Catalogo: Catalogo,
          IDIdioma: parseInt(Idioma),
          Ambito: Ambito,
          Estructura: Estructura,
          IDNivelAgregacion: parseInt(NivelDeAgregacion),
          //Ciclo
          TipoContribucion: TipoContribucion,
          Version: Version,
          Estado: Estado,
          Contribucion: Contribucion,
          TipoConocimiento: parseInt(TipoConomiento),
          Entidad: Entidad,
          //Educativo
          RangoDeEdad: RangoDeEdad,
          TipoInteractividad: parseInt(tipoInteractividad),
          TipRecurso: parseInt(TipoRecurso),
          DensidadSemantica: DensidadSemantica,
          TiempoTipicoAprendizadje: TiempoAprendisaje,
          DescripcionRecurso: DescripcionRecurso,
          ConocimientoPrevio: ConocimientoPrevio,
          ObjetivosDidacticos: ObjetivosDidacticos,
          TipoDestinatario: parseInt(TipoDestinatario),
          ProcesoCognitivo: ProcesoCognitivo,
          IdiomaUtilizado: IdiomaUtilizado,
          //
          Proposito: Proposito,
          // RutaTaxonomica:
          //   "" +
          //   FacultadID +
          //   CarreraID +
          //   PlanID +
          //   SemestreID +
          //   MateriaID +
          //   BloqueID +
          //   ContenidoID,
          Fuente: Fuente,
          Taxon: Taxon,
          Entrada: Entrada,
          //
          Dificultad: Dificultad,
          Contexto: Contexto,
        },
      });

      return res.json({
        status: "OK",
        uploaded: archivo?.Direccion,
        id: archivo.ID,
      });
    }
    //Asociado normal
  } catch (error) {
    console.error(error);
    res.status(500).json([{ mensaje: "error al subir los datos" }]);
  }
}
