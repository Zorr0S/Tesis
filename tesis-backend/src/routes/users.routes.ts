import { NextFunction, Router } from "express";
import { Request, Response } from "express";

import {
  GetUsers,
  GetUsersByID,
  CreateUser,
  Login,
  ChangeUserRole,
} from "../controllers/users.controller";
import { EsAdmin, VerifyTyoken } from "../middlewares/BasicAuth";

const router = Router();
router.post("/login", Login);
router.get("/ping", VerifyTyoken, (req, res) => {
  return res.status(200).send({ Estatus: "Success" });
});

router.post("/refresh", Login);

router.get("/", (req, res, next: NextFunction) => {}, GetUsers);
// router.get("/:id", GetUsersByID);
router.post("/signUp", CreateUser);

//
router.get("/user", Login);

//Cambiar ROl
router.get("/ListUser",[EsAdmin], GetUsers);

router.put("/cambiarRol",[EsAdmin], ChangeUserRole);


export default router;
