import { Router } from "express";
import { CreateBloque, EditBloqueById, GetBloqueById, GetBloques } from "../controllers/bloque.controller";
import { RouteGetMateria, RouteGetMateriaByID, RouteCreateMateria, RouteEditMateria } from "./materia.routes";

const router = Router();
let  RouteGetBloque= RouteGetMateria + ":MateriaID/bloque/";
let RouteGetBloqueByID = RouteGetMateriaByID + "/bloque/:BloqueID"
let  RouteCreateBloque= RouteCreateMateria  + "/:MateriaID/bloque"
let  RouteEditBloque= RouteEditMateria  + "/bloque/:BloqueID"


//COntenido
router.get(RouteGetBloque, GetBloques);
router.get(RouteGetBloqueByID, GetBloqueById);

router.put(RouteEditBloque, EditBloqueById);




router.post(RouteCreateBloque, CreateBloque);
export default router;
export {RouteGetBloque,RouteGetBloqueByID,RouteCreateBloque,RouteEditBloque}