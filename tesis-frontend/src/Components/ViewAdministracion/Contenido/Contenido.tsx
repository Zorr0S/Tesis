import {
  AccordionDetails,
  Avatar,
  Button,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useEffect, useState } from "react";
import { AddMaterial } from "../../ModalesAnadir/ModalesCrear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Dominio } from "../../../API/API";
import axios from "axios";
import { MaterialElemento } from "../../IconoVariable/IconoVariable";
import MediaViewer from "../../MediaViewer/MediaViewer";
import { EditContenido, EditMaterial } from "../../ModalesAnadir/ModalesEdit";
import { useQuery } from "react-query";
import { LinkMaterialToMateria } from "../../ModalesAnadir/ModalAsociar";

type Contenido = {
  ID: number;
  Titulo: string;
  Descripcion: string;
  MaterialAsociado: MaterialAsociado[];
};

type MaterialAsociado = {
  ID: number;
  Titulo: string;
  Descripcion: string;
  Direccion: string;
  TipoMaterial: { ID: number; Nombre_Tipo: string };
};
type ConenidoProps = {
  FacultadID: any;
  CarreraID: any;
  PlanID: any;
  SemestreID: any;
  MateriaID: any;
  BloqueID: any;
};
export function ContenidoViewAdmin({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  BloqueID,
}: ConenidoProps) {
  const [posts, setPosts] = useState<Contenido[]>([]);
  const { data, isError, isFetching ,refetch} = useQuery(
    `Contenido-Materia-ADMIN-/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido/`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido/`
     
      });
      return data ;
    }
  );
  if (data == undefined) return <></>;
  // async function fetchData() {
  //   let Prueaba = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido/`;
  //   const { data } = await axios.get(Prueaba);
  //   setPosts(data);
  // }
  // const [Updater, setUpdater] = useState<Contenido[]>([]);


  return (
    <>
      {data.map((post:any) => (
        <List>
          <Divider>
            {" "}
            <EditContenido
              FacultadID={FacultadID}
              CarreraID={CarreraID}
              PlanID={PlanID}
              SemestreID={SemestreID}
              MateriaID={MateriaID}
              BloqueID={FacultadID}
              ID={post.ID}
            >
              <LinkMaterialToMateria ContenidoID={post.ID} >
              <Typography>{post.Titulo}</Typography>
              </LinkMaterialToMateria>
            </EditContenido>
          </Divider>
          <AccordionDetails>
            <List>
              <Container sx={{ margin: "auto" }}>
                <Materiales Data={post.MaterialAsociado}></Materiales>

                <AddMaterial
                  FacultadID={FacultadID}
                  CarreraID={CarreraID}
                  PlanID={PlanID}
                  SemestreID={SemestreID}
                  MateriaID={MateriaID}
                  BloqueID={BloqueID}
                  ContenidoID={post.ID}
                  Actualizar={(e: any) => {
                    console.log("hey"), refetch();
                  }}
                >
                  <Button variant="contained" color="success">
                    <AddCircleIcon />
                    Añadir Material
                  </Button>
                </AddMaterial>
              </Container>
            </List>
          </AccordionDetails>
        </List>
      ))}
    </>
  );
}
type MateriaAux = {
  Data: MaterialAsociado[];
};
function Materiales({ Data }: MateriaAux) {
  return (
    <>
      {Data.map((dato) => (
        <>
          <Divider></Divider><EditMaterial ID={dato.ID}>
          <MediaViewer
            Direccion={dato.Direccion}
            Tipo={dato.TipoMaterial.Nombre_Tipo}
          >
            <ListItem>
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
            <Divider></Divider>
          </MediaViewer>
          </EditMaterial>
        </>
      ))}
    </>
  );
}
