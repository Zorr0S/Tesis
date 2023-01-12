import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddCircleIcon from "@mui/icons-material/AddCircle";

import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Dominio } from "../../../API/API";
import EditIcon from "@mui/icons-material/Edit";

import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import {
  Bloque,
  ContenidoBloque,
  Grupo,
  Guia,
  materia,
  Recurso,
  Seguimiento,
} from "../../../API/Types/Tipos";
import { useAppSelector } from "../../../store/hooks";
import { MaterialElemento } from "../../IconoVariable/IconoVariable";
import MediaViewer from "../../MediaViewer/MediaViewer";
import { MaterialEstatus } from "../../REA/MaterialEstatus";
import {
  AddBloque,
  AddContenido,
  AddCurso,
  AddCursoMaterial,
  AddGuia,
} from "../../ModalesCRUDCursos/ModalesCursosCrear";
import { LinkMaterialToCurso } from "../../ModalesCRUDCursos/ModalesCursosAsociar";
import {
  CambiarIcono,
  EditBloque,
  EditContenido,
  EditCurso,
  EditGrupo,
  EditGuia,
  EditMaterial,
} from "../../ModalesCRUDCursos/ModalesCursosEdit";
import {
  DeleteBloque,
  DeleteContenido,
  DeleteCurso,
  DeleteGuia,
} from "../../ModalesCRUDCursos/ModalesCursosDelete";
// import { Dominio } from "../../API/API";
// import { Grupo, Guia } from "../../API/Types/Tipos";
// import { CursoPlantillaRender } from "../../Components/REA/GroupComponents/GroupRender";
// import { SeguimientoButton } from "../../Components/REA/GroupComponents/SeguimientoButton";

export function AdminGrupos() {
  let { ID } = useParams();
  const [GrupoRender, setGrupoRender] = useState<JSX.Element>(<></>);
  const { data, isError, isFetching, refetch } = useQuery(
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
      return data as Grupo;
    },
    { refetchInterval: 3000 }
  );
  if (data == undefined) {
    return <></>;
  }

  return (
    <>
      <Container
        sx={
          {
            //   marginTop: 8,
            //      display: "flex",
            //    flexDirection: "column",
            //    alignItems: "center",
            //bgcolor: "green",
          }
        }
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
          <Stack>
            <Avatar
              sx={{ width: "15rem", height: "15rem", alignItems: "left" }}
              variant="rounded"
              alt="Icono"
              src={data.Icono || "https://source.unsplash.com/random"}
            />
            <Container>
              {" "}
              <CambiarIcono IDGrupo={data.ID} />
            </Container>
          </Stack>

          <Box
            sx={{
              width: 1,
              //bgcolor: "lightpink",
            }}
          >
            <Stack>
              <EditGrupo IDGrupo={data.ID} Refresh={refetch}>
                <Typography variant="h1" component="div" gutterBottom>
                  {data?.Nombre}
                </Typography>
              </EditGrupo>

              <Typography variant="h5" component="div" gutterBottom>
                {data?.Descripcion}
              </Typography>
              <Typography variant="h6" component="div" gutterBottom>
                Autor: {data?.Creador.Apellidos} {data?.Creador.Nombre}
              </Typography>

              {/* <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <SeguimientoButton CodigoGrupo={ID as string} />
              </Box> */}
            </Stack>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ width: "100%", height: "30rem" }}>
          <AddGuia GrupoID={data.ID}>
            <Button
              variant="contained"
              size="large"
              color="success"
              startIcon={<AddCircleIcon />}
            >
              Agregar Tematica
            </Button>
          </AddGuia>
          <AdminCursoPlantillaRender Data={data?.CursoGuia as Guia[]} />
        </Box>
      </Container>
    </>
  );
}

function AdminCursoPlantillaRender({
  Data,
  GrupoID,
}: {
  Data: Guia[];
  GrupoID?: number;
}) {
  return (
    <>
      {Data.map((data, index) => (
        <Container>
          <Typography variant="h3" component="div" gutterBottom>
            <EditGuia IDGuia={data.ID}>
              {" "}
              {data.Nombre}
              <DeleteGuia IDGuia={data.ID} />{" "}
            </EditGuia>
          </Typography>
          {/* <Divider /> */}
          <Typography variant="h5" component="div" gutterBottom>
            {/* {Data.} */}
          </Typography>
          <AdminCursoRender Data={data.Plantilla} />
          <AddCurso GuiaID={data.ID}>
            <Button
              variant="contained"
              size="large"
              color="success"
              startIcon={<AddCircleIcon />}
            >
              Nueva Unidad
            </Button>
          </AddCurso>
        </Container>
      ))}
    </>
  );
}

function AdminCursoRender({ Data }: { Data: materia[] }) {
  return (
    <>
      {Data.map((data, index) => (
        <Container>
          <Grid>
            <EditCurso IDCurso={data.ID}>
              <Typography variant="h2" component="div" gutterBottom>
                {data.Nombre}
              </Typography>
              <DeleteCurso IDCurso={data.ID} />
            </EditCurso>

            <Divider />
            <Typography variant="h5" component="div" gutterBottom>
              {data.Descripcion}
            </Typography>

            <Grid>
              {/* {BloqueVista} */}

              <AdminCursoBloqueRender Data={data.Bloques} />
              <AddBloque CursoID={data.ID}>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  startIcon={<AddCircleIcon />}
                >
                  Nuevo Tema
                </Button>
              </AddBloque>
            </Grid>
          </Grid>
        </Container>
      ))}
    </>
  );
}

function AdminCursoBloqueRender({ Data }: { Data: Bloque[] }) {
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
              <EditBloque IDBloque={data.ID}>
                <Typography variant="h4" key={`${data.ID}-Bloque-nomb`}>
                  {data.Nombre}
                </Typography>
                <DeleteBloque IDBloque={data.ID} />
              </EditBloque>
            </AccordionSummary>
            <AccordionDetails key={"AcordeonDet" + data.Nombre + data.ID}>
              <Typography key={`${data.ID}-Bloque-desc`}>
                {data.Descripcion}
              </Typography>
            </AccordionDetails>

            <AdminCursoContenidoRender
              Data={data.Contenido}
              key={`${data.ID}-Bloque-Conte`}
            />
            <AddContenido BloqueID={data.ID}>
              <Button
                variant="contained"
                size="large"
                color="success"
                startIcon={<AddCircleIcon />}
              >
                Nuevo subtema
              </Button>
            </AddContenido>
          </Accordion>
        </>
      ))}
    </>
  );
}
function AdminCursoContenidoRender({ Data }: { Data: ContenidoBloque[] }) {
  return (
    <>
      {Data.map((post, index) => (
        <>
          <List>
            <Divider key={`Div-post-${post.ID}_${index}`}>
              <EditContenido IDContenido={post.ID}>
                <LinkMaterialToCurso
                  ContenidoID={post.ID}
                  key={`LINK-${post.ID}_${index}`}
                >
                  <Typography key={`Titulo-Link-${post.ID}_${index}`}>
                    {post.Titulo}
                  </Typography>
                </LinkMaterialToCurso>
                <DeleteContenido IDContenido={post.ID} />
              </EditContenido>
            </Divider>
            {/* <Typography justifyContent={"center"}>{post.Descripcion}</Typography>  */}
            <AccordionDetails>
              <List key={`List-Cont-${post.ID}_${index}`}>
                <Container
                  sx={{ margin: "auto" }}
                  key={`Conte-Cont-${post.ID}_${index}`}
                >
                  {post.MaterialAsociado.length > 0 ? (
                    <Cortador MaterialID={post.ID} />
                  ) : (
                    <></>
                  )}
                </Container>
              </List>
              <Box textAlign="center">
                <AddCursoMaterial ContenidoID={post.ID}>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    startIcon={<NoteAddIcon />}
                  >
                    Nuevo recurso
                  </Button>
                </AddCursoMaterial>
              </Box>
            </AccordionDetails>
          </List>
        </>
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
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
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
      <AdminCursoMaterialesRender Data={data} />
      {/* {Expansor} */}
    </>
  );
}

function AdminCursoMaterialesRender({ Data }: { Data: Recurso[] }) {
  const [Aux, setAux] = useState<any>();
  // if(Data.length>6){
  //   setAux(Data.slice(0,6))
  // }
  if (Data.length == 0) {
    return <>Datos nullos</>;
  }

  return (
    <>
      {Data.map((dato, index) => (
        <>
          <Divider></Divider>
          <EditMaterial IDMaterial={dato.ID}>
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
                <ListItemAvatar >
                  <Avatar sizes="2">
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
          </EditMaterial>
        </>
      ))}
    </>
  );
}
