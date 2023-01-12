import { Router } from "express";
import {
  CreateMateria,
  GetMateriaById,
  GetMateria,
  EditMateriaById
} from "../controllers/materia.controller";
import { RouteGetSemestre, RouteGetSemestreByID, RouteCreateSemestre, RouteEditSemestre } from "./semestre.routes";

const router = Router();
let RouteGetMateria = RouteGetSemestre + ":SemestreID/materia/";
let RouteGetMateriaByID = RouteGetSemestreByID + "/materia/:MateriaID"
let RouteCreateMateria = RouteCreateSemestre  + "/:SemestreID/materia"
let RouteEditMateria = RouteEditSemestre + "/materia/:MateriaID"


//COntenido
router.get(RouteGetMateria, GetMateria);
router.get( RouteGetMateriaByID, GetMateriaById);
router.put( RouteEditMateria, EditMateriaById);




router.post(RouteCreateMateria, CreateMateria);
export default router;
export {RouteGetMateria, RouteGetMateriaByID, RouteCreateMateria,RouteEditMateria}