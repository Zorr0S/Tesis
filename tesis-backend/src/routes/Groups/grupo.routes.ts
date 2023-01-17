import { Router } from "express";
import { ExpulsarAlumno, GetGroup, GetGroupAdmin, GetMonitoreoDelGrupo, GetMyGroups, GetSuscribedGroups, SuscribeTo } from "../../controllers/guides/groups.controller";
import { EsProfesor } from "../../middlewares/BasicAuth";

const router = Router();

router.get("/GruposSuscritos", GetSuscribedGroups);
router.get("/mygrupos", GetMyGroups);
router.get("/", GetGroup);
router.get("/admin", GetGroupAdmin);

router.post("/suscribe", SuscribeTo);
router.get("/seguimiento", GetMonitoreoDelGrupo);
router.put("/:Identificador/expulsar",[EsProfesor], ExpulsarAlumno);



//CRUD Grupos



export default router;