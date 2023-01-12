import { Router } from "express";

import { CreateFacultad, EditFacultadById, GetFacultad, GetFacultadById } from "../controllers/facultad.controller";

const router = Router();
//Cadenamas para las rutas usadas
let RouteFacultadGet ="/facultad/"
let RouteFacultadGetByID ="/facultad/:FacultadID"
let RouteCreateFacultad= "/create/facultad"
let RouteEditFacultad= "/edit/facultad/:FacultadID";



router.get(RouteFacultadGet, GetFacultad);
router.get(RouteFacultadGetByID, GetFacultadById);
router.put(RouteEditFacultad, EditFacultadById);




router.post(RouteCreateFacultad, CreateFacultad);
export default router;
export {RouteFacultadGet,RouteFacultadGetByID,RouteCreateFacultad,RouteEditFacultad}