import { Router } from "express";
import { GetMonitoreoGeneral, GetSeguimientoMaterial } from "../controllers/seguimiento.controller copy";
const router = Router();

router.get("/general",GetMonitoreoGeneral)
router.get("/material",GetSeguimientoMaterial)

export default router;