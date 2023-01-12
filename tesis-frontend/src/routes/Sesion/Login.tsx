import * as React from "react";
import Avatar from "@mui/material/Avatar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Dominio } from "../../API/API";

import { useState } from "react";
import {
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { setToken } from "../../API/auth/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserState } from "../../store/counterSlice";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();
export default function Login() {
  const [Contra, setContra] = useState<string>("");
  const [Correo, setCorreo] = useState<string>("");
  const count = useAppSelector((state) => state.Token.Token);

  let Redirect = useNavigate();

  const dispatch = useAppDispatch();
  const ConfirmarLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const { data, status } = await axios({
        method: "post",
        baseURL: Dominio,
        url: "/usuarios/login",
        data: {
          Correo: Correo,
          Contrasena: Contra,
        },
      });

      dispatch(
        setUserState({
          Token: data.Token,
          Refresh: data.Refresh,
          Nivel: data.Nivel,
          Identificador: data.Identidador,
          UserInfo: data.UserInfo,
        })
      )
      console.log("SUcccess");
      //alert("Usted esta logeado ahora")
      
      Redirect("/");
    } catch (error) {
      alert("Ocurrio un error")
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={(e: any) => ConfirmarLogin(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={Correo}
              onChange={(e) => setCorreo(e.currentTarget.value)}
              id="email"
              label="correo electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={Contra}
              onChange={(e) => setContra(e.currentTarget.value)}
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdeme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Olvido su contraseña?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/register" >
                  {"No tiene cuenta?, Resgistrese aqui"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
