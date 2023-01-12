import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Dominio } from "../../API/API";
import { useMutation } from "react-query";
import { Genero } from "../../API/Types/Tipos";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Register() {
  const DatosSexo = [
    { ID: 0, Name: "Hombre", Valor: "HOMBRE" as Genero },
    { ID: 1, Name: "Mujer", Valor: "MUJER" as Genero },
  ];
  const Redirect = useNavigate();

  const [Genero, setGenero] = useState<{ ID: number, Name: "Hombre", Valor: Genero }>({ ID: 0, Name: "Hombre", Valor: "HOMBRE" });
  const Registrar = useMutation({
    mutationFn: async (form:FormData) => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `${Dominio}/usuarios/signUp`,
        data: {
          Nombre: form.get("Nombre"),
          Apellidos: form.get("Apellidos"),
          Numero_Cuenta: form.get("NumeroDeCuenta"),
          Correo: form.get("Correo"),
          Contrasena: form.get("Contrasena"),
          FechaDeNacimiento: form.get("FechaNacimiento"),
          Sexo: Genero.Valor,
        },
      });
      return data;
    },
    onError: (error) => {
      alert("Error al registrase");
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Registro completado");
      Redirect("/login")  

      // window.location.reload();
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    
    Registrar.mutate(form)
    return false
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
            Registrar
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="Nombre"
                  required
                  fullWidth
                  id="Nombre"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Apellidos"
                  label="Apellidos"
                  name="Apellidos"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="NumeroDeCuenta"
                  label="Numero De Cuenta"
                  name="NumeroDeCuenta"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Correo"
                  label="Correo"
                  name="Correo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Contrasena"
                  label="Contrasena"
                  type="password"
                  id="Contrasena"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                Fecha de Nacimiento
                <TextField
                  required
                  fullWidth
                  onChange={(e) => console.log(new Date(e.target.value))}
                  name="FechaNacimiento"
                  type="date"
                  id="FechaNacimiento"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="CB-Sexo"
                  options={DatosSexo}
                  getOptionLabel={(option) => option.Name.toString()}
                  isOptionEqualToValue={(option, value) =>
                    option.ID === value.ID
                  }
                  onChange={(event, value) => {
                    setGenero(value as any);
                  }}
                  sx={{ width: "10rem", paddingInline: "0.5rem" }}
                  renderInput={(params) => (
                    <TextField {...params} required label="Sexo" />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Ya estas registrado?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
