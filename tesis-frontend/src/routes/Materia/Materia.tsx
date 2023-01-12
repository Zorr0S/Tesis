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
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dominio } from "../../API/API";
import { MaterialElemento } from "../../Components/IconoVariable/IconoVariable";
import MediaViewer from "../../Components/MediaViewer/MediaViewer";
import { useQuery } from "react-query";
import { materia, Seguimiento } from "../../API/Types/Tipos";
import { useAppSelector } from "../../store/hooks";
import { CursoBloqueRender } from "../../Components/REA/GroupComponents/GroupRender";
import { MateriaBloqueRender } from "../../Components/REA/MateriaComponents/MateriaRender";
type MateriaDatos = { ID: number; Nombre: string; Descripcion: string };

export function Materia() {
  let { FacultadID, CarreraID, PlanID, SemestreID, MateriaID } = useParams();
  // const [posts, setPosts] = useState<MateriaDatos[]>([]);

  const [Updater, setUpdater] = useState<MateriaDatos[]>([]);
  const { data, isError, isFetching } = useQuery("Vista-Materia", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: `/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`,
    });
 //   console.log(data);
    return data as materia[];
  });
  if(data==undefined){
    return(<></>)
  }

  return (
    <div>
      <span></span>
    <Container><MateriaRender Data={data as materia[]}></MateriaRender></Container>
    </div>
  );
}

function MateriaRender({ Data }: { Data: materia[] }) {
  return (
    <>
      {Data.map((data, index) => (
        <Container key={`${data.ID}-Materia`}>
          <Grid  key={`${data.ID}-Materia-grid`}>
            <Typography variant="h2" component="div" gutterBottom  key={`${data.ID}-Materia-typo`}>
              {data.Nombre}
            </Typography>
            <Divider />
            <Typography variant="h5" component="div" gutterBottom  key={`${data.ID}-Materia-desc`}>
              {data.Descripcion}
            </Typography>

            <Grid>
              {/* {BloqueVista} */}
              <MateriaBloqueRender Data={data.Bloques} />
            </Grid>
          </Grid>
        </Container>
      ))}
    </>
  );
}