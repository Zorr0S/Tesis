import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useEffect } from "react";
import {
  Guia,
  materia,
  Bloque,
  ContenidoBloque,
  Recurso,
  Seguimiento,
} from "../../../API/Types/Tipos";
import { MaterialElemento } from "../../IconoVariable/IconoVariable";
import MediaViewer from "../../MediaViewer/MediaViewer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useQuery } from "react-query";
import { Dominio } from "../../../API/API";
import { MaterialEstatus } from "../MaterialEstatus";
import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import { useAppSelector } from "../../../store/hooks";

export function CursoPlantillaRender({ Data }: { Data: Guia[] }) {
  return (
    <>
      {Data.map((data, index) => (
        <Container>
          <Typography variant="h3" component="div" gutterBottom>
            {data.Nombre + ""}
          </Typography>
          {/* <Divider /> */}
          <Typography variant="h5" component="div" gutterBottom>
            {/* {Data.} */}
          </Typography>
          <Box>
            {/* Plantilla Curso */}
            <CursoRender Data={data.Plantilla} />
          </Box>
        </Container>
      ))}
    </>
  );
}

export function CursoRender({ Data }: { Data: materia[] }) {
  return (
    <>
      {Data.map((data, index) => (
        <Container>
          <Grid>
            <Typography variant="h2" component="div" gutterBottom>
              {data.Nombre}
            </Typography>
            <Divider />
            <Typography variant="h5" component="div" gutterBottom>
              {data.Descripcion}
            </Typography>

            <Grid>
              {/* Curso */}
              {/* {BloqueVista} */}
              <CursoBloqueRender Data={data.Bloques} />
            </Grid>
          </Grid>
        </Container>
      ))}
    </>
  );
}

export function CursoBloqueRender({ Data }: { Data: Bloque[] }) {
  return (
    <>
      {Data.map((data, index) => (
        <>
          <Accordion key={"Acordeon" + data.Nombre + data.ID} expanded>
            <AccordionSummary
              aria-controls="panel1a-content"
              key={"AcordeonSum" + data.Nombre + data.ID}
              id={`panel1a-header ${index}`}
            >
              <Typography variant="h4" key={`${data.ID}-Bloque-nomb`}>
                {data.Nombre}
              </Typography>
            </AccordionSummary>
            <AccordionDetails key={"AcordeonDet" + data.Nombre + data.ID}>
              <Typography key={`${data.ID}-Bloque-desc`}>
                {data.Descripcion}
              </Typography>
            </AccordionDetails>
            <CursoContenidoRender
              Data={data.Contenido}
              key={`${data.ID}-Bloque-Conte`}
            />
          </Accordion>
        </>
      ))}
    </>
  );
}
export function CursoContenidoRender({ Data }: { Data: ContenidoBloque[] }) {
  return (
    <>
      {Data.map((post) => (
        <List>
          <Divider>
            <Typography>{post.Titulo}</Typography>
          </Divider>
          {/* <Typography justifyContent={"center"}>{post.Descripcion}</Typography>  */}
          <AccordionDetails>
            <List>
              <Container sx={{ margin: "auto" }}>
                {post.MaterialAsociado.length > 0 ? (
                  <Cortador MaterialID={post.ID} />
                ) : (
                  <></>
                )}
              </Container>
            </List>
          </AccordionDetails>
        </List>
      ))}
    </>
  );
}

 function Cortador({ MaterialID }: { MaterialID: number }) {
  let User = useAppSelector((state) => state.Token);
  const { data, isError, isFetching } = useQuery(
    `Contenido-Curso-${MaterialID}`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/recursos/MaterialesListaGrupo",
        params: {
          MaterialID: MaterialID,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token) ,
        },
      });
      return data as Recurso[];
    }
  );
  if (data == undefined) return <></>;
  // const [DataParte1, setDataParte1] = useState<Recurso[]>([]);
  // //const [Segunda, setSegunda] = useState<Recurso[]>([]);

  // const [Expansor, SetExpansor] = useState<JSX.Element>(
  //   <ExpandMoreIcon fontSize="large" />
  // );
  // for (let index = 0; index < data.length; index++) {
  //   data[index].Indice = index + 1;
  // }
  // let Botton = (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //     }}
  //   >
  //     <IconButton
  //       onClick={() => {
  //         SetExpansor(<MaterialesRender Data={data.slice(6, data.length)} />);
  //       }}
  //     >
  //       <Avatar>
  //         <ExpandMoreIcon fontSize="large" />
  //       </Avatar>
  //     </IconButton>
  //   </Box>
  // );
  // useEffect(() => {
  //   if (data.length > 5) {
  //     SetExpansor(Botton);
  //     //setSegunda(data.slice(6, data?.length));
  //     setDataParte1(data.slice(0, 5));
  //   } else {
  //     setDataParte1(data);
  //     SetExpansor(<></>);
  //   }
  // }, []);

  return (
    <>
      <CursoMaterialesRender Data={data} />
      {/* {Expansor} */}
    </>
  );
}

export function CursoMaterialesRender({ Data }: { Data: Recurso[] }) {
  const [Aux, setAux] = useState<any>();
  // if(Data.length>6){
  //   setAux(Data.slice(0,6))
  // }
  if (Data.length == 0) {
    return <>Datos nullos</>;
  }
  ///console.log(Data);

  return (
    <>
      {/* Lista */}
      {Data.map((dato, index) => (
        <>
          <Divider></Divider>
          <MediaViewer
            Direccion={dato.Direccion}
            Tipo={dato.TipoMaterial.Nombre_Tipo}
          >
            {dato.Indice}

            <ListItem
            //divider={true}
            // secondaryAction={
            //   <IconButton edge="end" aria-label="delete">
            //     <DeleteIcon />
            //   </IconButton>
            // }
            >
              <ListItemAvatar>
                <Avatar>
                  <MaterialElemento tipo={dato.TipoMaterial.Nombre_Tipo} />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={dato.Titulo}
                secondary={dato.Descripcion}
              />
            </ListItem>

            <MaterialEstatus Data={dato.Seguimiento as Seguimiento[]} />
            <Divider></Divider>
          </MediaViewer>
        </>
      ))}
    </>
  );
}
