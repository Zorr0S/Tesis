import { Router } from "express";
import { CreatePlanes, GetPlanesById, GetPlanes, EditPlanesById,  } from "../controllers/planes.controller";
import { RouteCreateCarrera, RouteEditCarrera, RouteGetCarrera, RouteGetCarreraByID } from "./Carrera.routes"
const router = Router();

let RouteGetPlanes= RouteGetCarrera + ":CarreraID/plan/";
let RouteGetPlanesByID= RouteGetCarreraByID + "/plan/:PlanID"
let RouteCreatePlan = RouteCreateCarrera  + "/:CarreraID/plan"
let RouteEditPlan=RouteEditCarrera+ "/plan/:PlanID"
router.get(RouteGetPlanes, GetPlanes);
router.get(RouteGetPlanesByID, GetPlanesById);
router.put(RouteEditPlan, EditPlanesById);



router.post(RouteCreatePlan, CreatePlanes);
export default router;

export {RouteGetPlanes,RouteGetPlanesByID,RouteCreatePlan,RouteEditPlan}