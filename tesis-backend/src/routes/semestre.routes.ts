import { Router } from "express";
import { CreateSemestre, GetSemestreById, GetSemestre, EditSemestreById   } from "../controllers/semestre.controller";
import { RouteCreatePlan, RouteEditPlan, RouteGetPlanes, RouteGetPlanesByID } from "./planes.routes";

const router = Router();

let RouteGetSemestre = RouteGetPlanes + ":PlanID/semestre/";
let RouteGetSemestreByID= RouteGetPlanesByID + "/semestre/:SemestreID"
let RouteCreateSemestre = RouteCreatePlan  + "/:PlanID/semestre"
let RouteEditSemestre = RouteEditPlan  +"/semestre/:SemestreID"


router.get(RouteGetSemestre, GetSemestre);
router.get(RouteGetSemestreByID, GetSemestreById);
router.put(RouteEditSemestre, EditSemestreById);



router.post(RouteCreateSemestre, CreateSemestre);
export default router;

export {RouteGetSemestre,RouteGetSemestreByID,RouteCreateSemestre,RouteEditSemestre}