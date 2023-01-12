import { Router } from "express";
import {
  CreateContenido,
  EditContenidoByID,
  GetContenido,
  GetContenidoByID,
} from "../controllers/contenidoBloque.controller";
import {
  RouteGetBloque,
  RouteGetBloqueByID,
  RouteCreateBloque,
  RouteEditBloque,
} from "./bloque.routes";

const router = Router();
let RouteGetContenido = RouteGetBloque + ":BloqueID/contenido/";
let RouteGetContenidoByID = RouteGetBloqueByID + "/contenido/:ContenidoID";
let RouteCreateContenido = RouteCreateBloque + "/:BloqueID/contenido";
let RouteEditContenido = RouteEditBloque + "/contenido/:ContenidoID";


//COntenido
router.get(RouteGetContenido, GetContenido);
router.get(RouteGetContenidoByID, GetContenidoByID);
router.put(RouteEditContenido, EditContenidoByID);


router.post(RouteCreateContenido, CreateContenido);
export default router;
