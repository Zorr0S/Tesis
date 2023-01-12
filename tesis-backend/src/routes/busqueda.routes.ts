import { Router } from "express";
import { SearchMaterials } from "../controllers/busqueda.controller";

const router = Router();

router.post("/materiales", SearchMaterials);

export default router;