import { Request, Response } from "express";
import { EjemploService as userService } from "../services/users.services";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";

import { Prisma, PrismaClient, Roles, usuarios } from "@prisma/client";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../globlal";

const prisma = new PrismaClient();
//El controlador se encarga del cuerpo del la funcion Rest
const UserService = new userService();
//Get functions
export async function GetUsers(req: Request, res: Response) {
  try {
    const UserList = await prisma.usuarios.findMany({
      select: {
        ID: true,
        Icono: true,
        Nombre: true,
        Apellidos: true,
        Numero_Cuenta: true,
        Genero: true,
        Correo: true,
        Tipo_user: true,
      },
    });
    res.json(UserList);
  } catch (error) {
    res.status(500).json([{ mensaje: "error al obtner los datos" }]);
  }
}

export async function GetUsersByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    //const {var1} =req.body;
    const user = await prisma.usuarios.findMany({
      where: { ID: parseInt(id) },
      select: {
        ID: true,
        Tipo_user: true,
        Nombre: true,
        Apellidos: true,
        Numero_Cuenta: true,
        Correo: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function CreateUser(req: Request, res: Response) {
  try {
    const {
      Nombre,
      Apellidos,
      Numero_Cuenta,
      Correo,
      Contrasena,
      Sexo,
      FechaDeNacimiento,
    } = req.body;
    //const {var1} =req.body;

    const HashedPassword = await bcrypt.hash(Contrasena, 10);
    console.log(HashedPassword);

    let user = await prisma.usuarios.create({
      data: {
        Nombre: Nombre,
        Apellidos: Apellidos,
        Genero: Sexo,
        Numero_Cuenta: Numero_Cuenta,
        Correo: Correo,
        Tipo_user: "USER",
        Contrasena: HashedPassword,
        FechaDeNacimiento: new Date(FechaDeNacimiento),
      },
      select: {
        ID: true,
        Tipo_user: true,
        Nombre: true,
        Apellidos: true,
        Numero_Cuenta: true,
        Correo: true,
      },
    });
    console.log(user);

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Error al registrar" }]);
  }
}

export async function Login(req: Request, res: Response) {
  try {
    const { Correo, Contrasena } = req.body;

    let login = await prisma.usuarios.findFirst({
      where: {
        Correo: Correo,
      },
    });
    let UserInfo = await prisma.usuarios.findFirst({
      where: {
        Correo: Correo,
      },
      select: {
        Nombre: true,
        Apellidos: true,
        Numero_Cuenta: true,
      },
    });

    if (await bcrypt.compare(Contrasena, login?.Contrasena + "")) {
      let Token = jwt.sign(
        { Correo: login?.Correo, ID: login?.ID },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "7 day" }
      );
      //refreshToken
      let Refresh = jwt.sign(
        { Correo: login?.Correo, ID: login?.ID },
        REFRESH_TOKEN_SECRET
      );

      res.status(200).json({
        estado: "Success",
        Token,
        Nivel: login?.Tipo_user,
        Refresh: Refresh,
        Identidador: login?.ID,
        UserInfo,
      });
    } else {
      console.log(Correo, Contrasena);

      res.status(400).json({ estado: "login failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}

export async function ChangeUserRole(req: Request, res: Response) {
  try {
    const { UserID, RolNuevo } = req.body;

    const User = await prisma.usuarios.update({
      where: { ID: parseInt(UserID) },
      data: { Tipo_user: RolNuevo },
      select: { Nombre: true, Apellidos: true, Correo: true, Tipo_user: true },
    });
    res.status(200).json(User);
  } catch (error) {
    console.error(error);
    res.status(404).json([{ mensaje: "Elemento no encontrado/inexistente" }]);
  }
}
