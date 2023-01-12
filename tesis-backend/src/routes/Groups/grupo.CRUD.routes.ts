import { Router } from "express";
import multer from "multer";
import { v4, v5 } from "uuid";

import {
  CambiarIconoGrupo,
  CreateBloque,
  CreateContenido,
  CreateCurso,
  CreateGrupo,
  CreateGuia,
  DeleteBloque,
  DeleteContenido,
  DeleteCurso,
  DeleteGrupo,
  DeleteGuia,
  EditBloque,
  EditContenido,
  EditCurso,
  EditGrupo,
  EditGuia,
  StorageGroupIcon,
  ViewBloque,
  ViewContenido,
  ViewCurso,
  ViewGrupo,
  ViewGuia,
} from "../../controllers/guides/curso.CRUD.controller";
import { VerifyTyoken } from "../../middlewares/BasicAuth";

const router = Router();

//CRUD Grupos
//order: Grupo/Guia/Curso....

const uploadIcono = multer({ storage: StorageGroupIcon });
//POST
router.post("/CREAR/Grupo", [VerifyTyoken], CreateGrupo);
router.post("/CREAR/Guia/:Identificador", [VerifyTyoken], CreateGuia);
router.post("/CREAR/Curso/:Identificador", [VerifyTyoken], CreateCurso);
router.post("/CREAR/Bloque/:Identificador", [VerifyTyoken], CreateBloque);
router.post("/CREAR/Contenido/:Identificador", [VerifyTyoken], CreateContenido);

//PUT
router.put("/EDITAR/Grupo/:Identificador", [VerifyTyoken], EditGrupo);
router.put(
  "/EDITAR/Grupo/Icono/:Identificador",
  [VerifyTyoken],
  uploadIcono.single("archivo"),
  CambiarIconoGrupo
); //
router.put("/EDITAR/Curso/:Identificador", [VerifyTyoken], EditCurso);
router.put("/EDITAR/Guia/:Identificador", [VerifyTyoken], EditGuia);
router.put("/EDITAR/Bloque/:Identificador", [VerifyTyoken], EditBloque);
router.put("/EDITAR/Contenido/:Identificador", [VerifyTyoken], EditContenido);
//Get
router.get("/VER/Grupo/:Identificador", [VerifyTyoken], ViewGrupo);
router.get("/VER/Curso/:Identificador", [VerifyTyoken], ViewCurso);
router.get("/VER/Guia/:Identificador", [VerifyTyoken], ViewGuia);
router.get("/VER/Bloque/:Identificador", [VerifyTyoken], ViewBloque);
router.get("/VER/Contenido/:Identificador", [VerifyTyoken], ViewContenido);

router.delete("/BORRAR/Grupo/:Identificador", [VerifyTyoken], DeleteGrupo);
router.delete("/BORRAR/Curso/:Identificador", [VerifyTyoken], DeleteCurso);
router.delete("/BORRAR/Guia/:Identificador", [VerifyTyoken], DeleteGuia);
router.delete("/BORRAR/Bloque/:Identificador", [VerifyTyoken], DeleteBloque);
router.delete(
  "/BORRAR/Contenido/:Identificador",
  [VerifyTyoken],
  DeleteContenido
);

export default router;
