import { Request, Response } from "express";
// import { EjemploService as userService } from "../services/users.services";

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
// const CursoService = new userService();
//Get functions
export async function GetContenido(req: Request, res: Response) {
  try {
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID, BloqueID } =
      req.params;
    const Contenido = await prisma.contenidoBloque.findMany({
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
      },
      include: {
        MaterialAsociado: {
          include: { TipoMaterial: true },
        },
      },
    });
    res.json(Contenido);
  } catch (error) {
    console.log(error);

    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetContenidoByID(req: Request, res: Response) {
  try {
    const {
      FacultadID,
      CarreraID,
      PlanID,
      SemestreID,
      MateriaID,
      BloqueID,
      ContenidoID,
    } = req.params;
    const Contenido = await prisma.contenidoBloque.findMany({
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
      include: {
        MaterialAsociado: {
          include: { TipoMaterial: true },
        },
      },
    });
    res.send(Contenido);
  } catch (error) {
    console.log(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
export async function EditContenidoByID(req: Request, res: Response) {
  try {
    const {
      FacultadID,
      CarreraID,
      PlanID,
      SemestreID,
      MateriaID,
      BloqueID,
      ContenidoID,
    } = req.params;
    const { Titulo, Descripcion } = req.body;

    const Index = await prisma.contenidoBloque.findMany({
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
      include: {
        MaterialAsociado: {
          include: { TipoMaterial: true },
        },
      },
    });
    const Contenido = await prisma.contenidoBloque.update({
      where: {
        
        ID: parseInt(ContenidoID),
      },
      data:{
        Titulo:(Titulo),
        Descripcion:(Descripcion)
      }
    });
    res.send(Contenido);
  } catch (error) {
    console.log(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreateContenido(req: Request, res: Response) {
  try {
    const { Titulo, Descripcion } = req.body;
    const { FacultadID, CarreraID, PlanID, SemestreID, MateriaID, BloqueID } =
      req.params;
    const ContenidoBusqueda = await prisma.contenidoBloque.findMany({
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
      },
    });
    const Contenido = await prisma.contenidoBloque.create({
      data: { Titulo:(Titulo),Descripcion:Descripcion,BlqueID:(parseInt(BloqueID)) },
    });

    //const {var1} =req.body;

    // const Contenido= await prisma.contenidoBloque.create({

    //   data:{
    //     Titulo:Titulo,
    //     Descripcion: Descripcion,
    //     BlqueID:parseInt(BloqueID),

    //   },

    // });
    res.status(200).send({ staus: "ok", response: { Contenido } });
  } catch (error) {
    console.log(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
