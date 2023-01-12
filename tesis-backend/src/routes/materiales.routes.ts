import { Router } from "express";
import { GetListaMaterialesCurso, GetListaMaterialesMateria, getMaterialesDisponible, getMaterialesCurso, getMaterialesMateria, LinkMateriralToCurso, LinkMateriralToMateria, getMateriales, GetPersonalRecurso } from "../controllers/materiales.controller";
import { EsProfesor } from "../middlewares/BasicAuth";
const router = Router();

router.get("/Materiales",getMateriales)
router.get("/MaterialesDisponibles",getMaterialesDisponible)
router.get("/MaterialesPersonales",[EsProfesor],GetPersonalRecurso)


router.get("/Material",getMaterialesDisponible)


router.get("/MaterialesLista",GetListaMaterialesMateria)
router.get("/MaterialesListaGrupo",GetListaMaterialesCurso)


router.get("/MaterialesContenido",getMaterialesMateria)
router.get("/MaterialesContenidoCurso",getMaterialesCurso)

router.get("/MaterialesContenidoCurso",getMaterialesCurso)


//CRUD
router.put("/ascociar/material/:IDContenidoMateria",LinkMateriralToMateria)
router.put("/ascociar/materialCurso/:IDContenidoMateria",LinkMateriralToCurso)


export default router;
