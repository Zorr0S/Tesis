import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Dominio } from "../../API/API";
import { Grupo, Guia } from "../../API/Types/Tipos";
import { PersmisonRender } from "../../Components/PermisonRedirect/PermisonRedirect";
import { CursoPlantillaRender } from "../../Components/REA/GroupComponents/GroupRender";
import { SeguimientoButton } from "../../Components/REA/GroupComponents/SeguimientoButton";

export function Grupos() {
  let { ID } = useParams();
  const { data, isError, isFetching } = useQuery(
    "Seguimiento-General",
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/grupo/",
        params: {
          Codigo: ID as string,
        },
      });
     // console.log(data);
      return data as Grupo;
    }
  );
  if (data == undefined) {
    return <></>;
  }
  if ( data?.Creador == undefined) {
    return <></>;
  }
 
  return (
    <>
      <Container
        sx={{
          //   marginTop: 8,
          //      display: "flex",
          //    flexDirection: "column",
          //    alignItems: "center",
          //bgcolor: "green",
          width: "95%",
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            //    alignItems: "center",
            bgcolor: "lightgray",
          }}
        >
          <Avatar
            sx={{ width: "15rem", height: "15rem", alignItems: "left" }}
            variant="rounded"
            alt="Icono"
            src={data.Icono}
          />
          <Box
            sx={{
              width: 1,
              //   bgcolor: "lightpink"
            }}
          >
            <Stack>
              <Typography variant="h1" component="div" gutterBottom>
                {data?.Nombre}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                {data?.Descripcion}
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                Autor: {data?.Creador.Apellidos || ""} {data?.Creador.Nombre|| ""}
              </Typography>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <PersmisonRender
                  RolNecesario="PROFESOR"
                  Componente={<SeguimientoButton CodigoGrupo={ID as string} />}
                />
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider />
        <Box sx={{ width: "100%", height: "30rem" }}>
          <CursoPlantillaRender Data={data?.CursoGuia as Guia[]} />
        </Box>
      </Container>
    </>
  );
}
