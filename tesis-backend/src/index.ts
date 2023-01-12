import express, { Request, Response } from "express";

import cors from "cors";
import morgan from "morgan";
import { Prisma, PrismaClient } from "@prisma/client";

import EjemploRouter from "./routes/archivo.routes";
import Usuarios from "./routes/users.routes";

import Facultad from "./routes/facultad.routes";
import Carreras from "./routes/Carrera.routes";
import Planes from "./routes/planes.routes";
import Semestre from "./routes/semestre.routes";
import Materias from "./routes/materia.routes";
import Bloque from "./routes/bloque.routes";
import Contenido from "./routes/contenidoBloques.routes";
import Busqueda from "./routes/busqueda.routes";
import Clasificacion from "./routes/clasificacion.routes";
import Seguimiento from "./routes/seguimiento.routes";
import Guias from "./routes/Groups/guia.routes";
import Grupos from "./routes/Groups/grupo.routes";
import Materiales from "./routes/materiales.routes";
import GruposCRUD from "./routes/Groups/grupo.CRUD.routes";

import { json } from "stream/consumers";
import winston from "winston";
import Monitoreo from "./routes/monitoreo.routes";
import * as fs from "fs";
import morganBody from "morgan-body";
import path from "path";
import { verify } from "jsonwebtoken";
import { EsAdmin, VerifyTyoken } from "./middlewares/BasicAuth";
// import ShortUniqueId from "short-unique-id";
// const uuid = new ShortUniqueId({ length: 7 });
// const CodigoGenerado = uuid();
// console.log(CodigoGenerado);
const prisma = new PrismaClient();
const app = express();

//TODO: Facultad/Carreras/PlanDEEstudio/Semestre/MAterias/Bloque
app.use(express.json()); // application/json
app.use(express.static("public"));
app.use(cors());

// //Loggearodr
// const log = fs.createWriteStream(
//   path.join(__dirname, "./logs", "express.log"), { flags: "a" }
// );
//  morganBody(app)
// morganBody(app, {
//   // .. other settings
//  // logAllReqHeader:true,
//  includeNewLine:true,
//   prettify:false,
//   maxBodyLength:100000,
//   noColors: true,
//   stream: log,
// });

app.use("/archivo", EjemploRouter);
app.use("/monitoreo", Monitoreo);
app.use("/guias", Guias);
app.use("/grupo", Grupos, GruposCRUD);

app.use("/usuarios", Usuarios, Seguimiento);
app.use(
  "/recursos",
  Facultad,
  Carreras,
  Planes,
  Semestre,
  Materias,
  Bloque,
  Contenido,
  Materiales
);
app.use("/busqueda", Busqueda);
app.use("/clasificacion", Clasificacion);

app.get("/", [VerifyTyoken, EsAdmin], async (req: Request, res: Response) => {
  try {
    const Planes = await prisma.planEstudio.findMany({
      where: {
        CarreraPerteneciente: { is: { FacultadID: 1 } },
        CarreraID: 1,
      },
      orderBy: [{ ID: "desc" }],
      take: 1,
    });
    return res.send(Planes);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log("Servidor corriendo");
});
