import { Router } from "express";
import multer from "multer";
import { v4, v5 } from "uuid";
import * as fs from "fs";
import {
  desactivarRecurso,
  EditRecurso,
  GetFile,
  GetGroupIcon,
  GetRecurso,
  UploadFileAsociado,
  UploadRecurso,
  UploadRecursoLibre,
  UploadRecursoToCurso,
} from "../controllers/archivo.controller";
import { EsAdmin, EsProfesor } from "../middlewares/BasicAuth";

const router = Router();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let dir = await Direccion("uploads");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;

    cb(null, `${v4()}-${originalname}`);
  },
});
const upload = multer({ storage }); // or simply { dest: 'uploads/' }

// router.post("/subir",
//   upload.single("archivo"),
//   UploadFile
// );
router.delete("/toggle/:Identificador",desactivarRecurso)


router.post(
  "/subir/asociando",
  [EsAdmin],
  upload.single("archivo"),
  UploadFileAsociado
);
router.post(
  "/subir/recurso",
  upload.single("archivo"),

  UploadRecurso
);
router.post(
  "/subir/recursoToCurso",
  [EsProfesor],
  upload.single("archivo"),

  UploadRecursoToCurso
);
router.post(
  "/subir/recursoLibre",
  [EsAdmin],
  upload.single("archivo"),
  UploadRecursoLibre
);
router.put(
  "/editar/:recurso",
  upload.single("archivo"),

  EditRecurso
);
router.get(
  "/recurso/:recurso",

  GetRecurso
);

router.get("/ver/:Archivo", GetFile);
router.get("/icono/:Archivo", GetGroupIcon);

export default router;

async function Direccion(Root: string) {
  var dir = `${Root}`;

  await fs.promises.mkdir(dir, { recursive: true });
  return dir;
}
