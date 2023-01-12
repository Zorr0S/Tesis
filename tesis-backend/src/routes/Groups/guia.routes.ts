import { Router } from "express";
import { GetGuides, GetMyGuides } from "../../controllers/guides/guia.controller";

const router = Router();

router.get("/guia", GetGuides);
router.get("/myguia", GetMyGuides);

export default router;