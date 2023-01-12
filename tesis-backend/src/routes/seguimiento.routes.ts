import { Router } from "express";
import { VerifyTyoken } from "../middlewares/BasicAuth";
import { Seguimiento } from "../controllers/seguimiento.controller";

const router = Router();



router.put("/seguimiento",[VerifyTyoken],Seguimiento)
export default router;
