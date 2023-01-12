import React from "react";
//import './App.css';

import ListaCarreras from "../../Components/ListaCarreras/ListaCarreras";
import { Box, Container, Typography } from "@mui/material";
import { SuscribedGroupsBar } from "../../Components/GuideBar/GuideBar";
import { ShowIfLogged } from "../../Components/PermisonRedirect/ShowIfLogged";

function Inicio() {
  return (
    <Container sx={{ backgroundColor: "lightcyan" }}>
      <Typography variant="h3">
      Bienvenido al Sistema de Búsqueda de Recursos Educativos Abiertos
      </Typography>
      {/* <BarraCursos /> */}
      <br />
      <br />
      <br />
      <br />
      <Box margin={"auto"} sx={{ width: "80%" }}>
        {" "}
        <ListaCarreras ID={1} />
      </Box>
      <ShowIfLogged>
        <>
          <Typography variant="h5">Tus grupos:</Typography>

          <SuscribedGroupsBar />
        </>
      </ShowIfLogged>
    </Container>
  );
}

export default Inicio;
