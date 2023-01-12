import { Router } from "express";
import { CreateCarrera, EditCarreraById, GetCarreraById, GetCarreras } from "../controllers/Carreras.controller";
import { RouteCreateFacultad, RouteEditFacultad, RouteFacultadGet, RouteFacultadGetByID } from "./facultad.routes"
const router = Router();

let RouteGetCarrera= RouteFacultadGet+ ":FacultadID/carrera/";
let RouteGetCarreraByID= RouteFacultadGetByID + "/carrera/:CarreraID";
let RouteCreateCarrera= RouteCreateFacultad + "/:FacultadID/carrera"
let RouteEditCarrera= RouteEditFacultad+"/carrera/:CarreraID";

router.get(RouteGetCarrera, GetCarreras);
router.get(RouteGetCarreraByID, GetCarreraById);
router.put(RouteEditCarrera, EditCarreraById);




router.post(RouteCreateCarrera, CreateCarrera);
export default router;
export {RouteCreateCarrera,RouteGetCarreraByID,RouteGetCarrera,RouteEditCarrera}