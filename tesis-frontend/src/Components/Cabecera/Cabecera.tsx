import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as LinkMaterial } from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { Ruta, UserInfo } from "../../API/Types/Tipos";
import { green, grey } from "@mui/material/colors";
import IMGLogo from "../../assets/logo.png";
import { useQuery } from "react-query";
import axios from "axios";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { setUserState } from "../../store/counterSlice";
import { MenuPopupState } from "../MenuAccion/MenuButton";
import { PersmisonRender } from "../PermisonRedirect/PermisonRedirect";
const Rutas: Ruta[] = [
  { Nombre: "Materiales", Ruta: "/Materias/1" },
  { Nombre: "Busqueda", Ruta: "/Buscar" },

  //{ Nombre: "Conservar Recursos", Ruta: "/subir_Archivos" },
  //{ Nombre: "Administracion", Ruta: "/administracion" },
  ///{ Nombre: "Seguimiento", Ruta: "/seguimiento" },
];
// const pages = ["Materiales", "Materias", "Blog"];
const settings: Ruta[] = [
  //{ Nombre: "Perfil", Ruta: "/perfil" },
  // { Nombre: "Cuenta", Ruta: "" },
  //{ Nombre: "Dashboard", Ruta: "" },
  //{ Nombre: "Cerrar", Ruta: "" },
  //{ Nombre: "Login", Ruta: "/Login" },
  //{ Nombre: "Register", Ruta: "/register" },
];

function BarraSup({ Data }: { Data: Ruta[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      key="Hola"
      className="Prueaba"
    >
      {Data.map((Dato: Ruta, index: number) => (
        <Button
          key={Dato.Nombre + Dato.Ruta + "Cab2" + index + index * 7}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          <LinkMaterial
            key={Dato.Nombre + Dato.Ruta + "Cab" + index}
            color="inherit"
            underline="none"
            component={RouterLink}
            to={Dato.Ruta}
          >
            {Dato.Nombre}
          </LinkMaterial>
        </Button>
      ))}
    </Box>
  );
}

function BarraMenu({ Data }: { Data: Ruta[] }) {
  return (
    <Box key="MenusSim">
      {Data.map((Dato: Ruta, index: number) => (
        <MenuItem key={Dato.Nombre + Dato.Ruta + "Menu" + index + index * 7}>
          <Typography
            key={Dato.Nombre + "Testo" + index}
            textAlign="left"
            component={RouterLink}
            to={Dato.Ruta}
          >
            {Dato.Nombre}
          </Typography>
        </MenuItem>
      ))}
    </Box>
  );
}

export function Cabecera() {
  let User = useAppSelector((state) => state.Token);

  // const { data } = useQuery(
  //   "GetOrRefreshToken",
  //   async () => {
  //     if (User.Token != undefined) {
  //       const { data } = await axios({
  //         baseURL: Dominio,
  //         method: "get",
  //         url: "/usuarios/ping",
  //         headers: {
  //           "x-access-token": UndefinedTokenToEmptyString(User.Token),
  //         },
  //       });
  //       return data;
  //     } else {
  //       console.log("No logeado");
  //       return undefined;
  //     }
  //   },
  //   { refetchInterval: 10000 }
  // );
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [IconoColor, setIconoColor] = useState<string>(grey[700]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    if (User.Token != undefined) {
      if (User.Token.length > 0) {
        console.log("Entro 2");
        setIconoColor(green[500]);
      } else {
        setIconoColor(grey[700]);
      }
    } else {
      console.log("User tokeen undefined");
    }
  }, [User.Token]);
  const dispatch = useAppDispatch();
  const Redirect = useNavigate();

  function LogOut() {
    dispatch(
      setUserState({
        Identificador: "",
        Nivel: "INVITADO",
        Refresh: "",
        Token: "",
        UserInfo: {
          ID: 0,
          Nombre: "",
          Apellidos: "",
          Genero: "HOMBRE",
          Numero_Cuenta: "",
          Icono: "",
        },
      })
    );
    Redirect("/");
  }
  function RegisterOrLogIn(Funcion: any) {
    let User = useAppSelector((state) => state.Token);

    const AUX = [
      <MenuItem key={"Logister"} onClick={Funcion}>
        <LinkMaterial
          color="inherit"
          underline="none"
          component={RouterLink}
          to={"/Login"}
        >
          Login
        </LinkMaterial>
      </MenuItem>,
      <MenuItem key={"Register"} onClick={Funcion}>
        <LinkMaterial
          color="inherit"
          underline="none"
          component={RouterLink}
          to={"/Register"}
        >
          Registrarse
        </LinkMaterial>
      </MenuItem>,
    ];
    if (User.Token.length == 0)
      return [
        <MenuItem key={"Logister"} onClick={Funcion}>
          <LinkMaterial
            color="inherit"
            underline="none"
            component={RouterLink}
            to={"/Login"}
          >
            Login
          </LinkMaterial>
        </MenuItem>,
        <MenuItem key={"REgister"} onClick={Funcion}>
          <LinkMaterial
            color="inherit"
            underline="none"
            component={RouterLink}
            to={"/Register"}
          >
            Registrarse
          </LinkMaterial>
        </MenuItem>,
      ];
    //{ Nombre: "Login", Ruta: "/Login" }
    return [
      <MenuItem key={"LogOut"}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={LogOut}
          color="error"
        >
          Salir
        </Button>
      </MenuItem>,
    ];
  }
  return (
    <>
      {/* {User.Token} */}
      <AppBar position="static">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Logo />

          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              key={"Menu-Cab"}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <BarraMenu Data={Rutas} />
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <BarraSup Data={Rutas} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <PersmisonRender
              RolNecesario="PROFESOR"
              Componente={<MenuPopupState />}
            />
            {"   "}
            {NombreAvatar(User)}

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    borderStyle: "solid",
                    borderWidth: "0.4rem",
                    borderColor: IconoColor,
                  }}
                  alt="Remy Sharp"
                  src="https://source.unsplash.com/random"
                />
              </IconButton>
            </Tooltip>

            {/**/}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {RegisterOrLogIn(handleCloseUserMenu)}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
function NombreAvatar(User: UserInfo) {
  if (User.Token == undefined || User.Token.length == 0) return "";
  return `${User.UserInfo.Nombre} ${User.UserInfo.Apellidos} [${User.UserInfo.Numero_Cuenta}]  `;
}
function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "10rem",
      }}
    >
      <Typography variant="h4">
        <LinkMaterial
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/"
        >
          UAS
        </LinkMaterial>
        <LinkMaterial component={RouterLink} to="/">
          <Box
            sx={{ width: 0.27, paddingTop: 0.2 }}
            component="img"
            src={IMGLogo}
          ></Box>
        </LinkMaterial>
      </Typography>
    </Box>
  );
}

// const avatarStyle = {
//   color: "green",
//   fontSize: "1.5rem",
//   boxShadow: 20,
//   backgroundColor: "rgb(210,180,140)",
//   border: "1.1rem solid green",
// };
