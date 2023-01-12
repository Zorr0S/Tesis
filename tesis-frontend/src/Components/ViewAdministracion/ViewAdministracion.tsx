import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dominio } from "../../API/API";
import { MaterialElemento } from "../../Components/IconoVariable/IconoVariable";
import {
  AddBloque,
  AddContenido,
  AddMaterial,
} from "../ModalesAnadir/ModalesCrear";
import { BloqueViewAdmin } from "./Bloque/Bloque";
import { Update } from "@mui/icons-material";
import { EditMateria } from "../ModalesAnadir/ModalesEdit";

type ViewAdminMateria = {
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
};
type Materia = { ID: number; Nombre: string; Descripcion: string };

export function MateriaAdminView({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
}: ViewAdminMateria) {
  const [posts, setPosts] = useState<Materia[]>([]);

  const [Updater, setUpdater] = useState<Materia[]>([]);

  const Data = {
    FacultadID: FacultadID,
    CarreraID: CarreraID,
    PlanID: PlanID,
    SemestreID: SemestreID,
    MateriaID: MateriaID,
    Data: posts,
  };
  const [Bloque, SetBloque] = useState<JSX.Element>(
    <MateriaRenderer {...Data} />
  );

  async function fetchData() {
    // let URLRest = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`;
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`,
    });
    setPosts(data);
    setUpdater(data); 
  }

  useEffect(() => {
    fetchData();
  }, []);
  function Rerender() {
    const Data = {
      FacultadID: FacultadID,
      CarreraID: CarreraID,
      PlanID: PlanID,
      SemestreID: SemestreID,
      MateriaID: MateriaID,
      Data: Updater,
    };
    SetBloque(<><MateriaRenderer {...Data} /></>);
  }

  const [Contador, SetContador] = useState(0);
  useEffect(() => {
    fetchData();
    Rerender();
  }, [Contador]);
  useEffect(() => {
    Rerender();
  }, [Updater]);

  return (
    <div>
      <span></span>
      <Container>
        {Bloque}
        <AddBloque
          FacultadID={FacultadID}
          CarreraID={CarreraID}
          PlanID={PlanID}
          SemestreID={SemestreID}
          MateriaID={MateriaID}
          Actualizar={() => {
            SetContador(Contador + 1);
            Rerender();
          }}
        >
          <Button variant="contained" color="success">
            <AddCircleIcon />
            Añadir Bloque
          </Button>
        </AddBloque>
        {Contador}
      </Container>
    </div>
  );
}
type ViewMateriaRender = {
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  Data: { ID: number; Nombre: string; Descripcion: string }[];
};

function MateriaRenderer({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  Data,
}: ViewMateriaRender) {
  const Datos = {
    FacultadID: FacultadID,
    CarreraID: CarreraID,
    PlanID: PlanID,
    SemestreID: SemestreID,
    MateriaID: MateriaID,
  };
  const [BloqueVista, SetBloqueVista] = useState<JSX.Element>(
    <BloqueViewAdmin {...Datos}></BloqueViewAdmin>
  );

  return (
    <>
      {Data.map((post, Index) => (
        <>
          <Container>
            <Grid>
            <EditMateria FacultadID={FacultadID} CarreraID={CarreraID} PlanID={PlanID} SemestreID={SemestreID} ID={MateriaID}>
              <Typography variant="h2" component="div" gutterBottom>
                {post.Nombre}
              </Typography>
              </EditMateria>

              <Divider />
              <Typography variant="h5" component="div" gutterBottom>
                {post.Descripcion}
              </Typography>
        
              <Grid>{BloqueVista}</Grid>
            </Grid>
          </Container>
        </>
      ))}
    </>
  );
}
export function AdminMateria() {
  let { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = useParams();

  return (
    <MateriaAdminView
      FacultadID={FacultadID + ""}
      CarreraID={CarreraID + ""}
      PlanID={PlanID + ""}
      SemestreID={SemestreID + ""}
      MateriaID={MateriaID + ""}
    />
  );
}

// const Ejemplo = () => {
//   return (
//     <List>
//       <ListItem>
//         <ListItemAvatar>
//           <Avatar>
//             <PictureAsPdfIcon />
//           </Avatar>
//         </ListItemAvatar>
//         <ListItemText
//           primary="EJEMPLO DE ARCHIVO"
//           secondary="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
//         />
//       </ListItem>
//     </List>
//   );
// };
