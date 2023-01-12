import { Router } from "express";
import { GetDestinatario, GetIdiomas, GetNivelDeAgregacion, GetNivelDeInteractividad, GetTipoConocimiento, GetTipoRecursoEducativo } from "../controllers/clasificacion.controller";

const router = Router();

//COntenido
router.get("/idiomas/", GetIdiomas);
router.get("/nivel-agregacion/", GetNivelDeAgregacion);
router.get("/nivel-interactividad/", GetNivelDeInteractividad);
router.get("/destinatario/", GetDestinatario);
router.get("/tipos-conocimientos/", GetTipoConocimiento);
router.get("/tipo-recurso/", GetTipoRecursoEducativo);







export default router;
