import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dominio } from "../../../API/API";
import { AddContenido } from "../../ModalesAnadir/ModalesCrear";
import { ContenidoViewAdmin } from "../Contenido/Contenido";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { EditBloque } from "../../ModalesAnadir/ModalesEdit";

type BloqueProps = {
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
};
export function BloqueViewAdmin({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
}: BloqueProps) {
  const [posts, setPosts] = useState<
    { ID: number; Nombre: string; Descripcion: string }[]
  >([]);
  const [postsCatch, setpostsCatch] = useState<
    { ID: number; Nombre: string; Descripcion: string }[]
  >([]);

  const DatosIniciale = {
    FacultadID: FacultadID,
    CarreraID: CarreraID,
    PlanID: PlanID,
    SemestreID: SemestreID,
    MateriaID: MateriaID,
    Data: posts,
  };

  const [BloqueRenderVista, SetBloqueRenderVista] = useState<JSX.Element>(
    <BloqueRender {...DatosIniciale} />
  );
  const [Modal, SetModal] = useState<JSX.Element>(<></>);

  async function fetchData() {
    let Prueaba = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque`;
    const { data } = await axios.get(Prueaba);
    setPosts(data);

    setpostsCatch(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const Datos = {
      FacultadID: FacultadID,
      CarreraID: CarreraID,
      PlanID: PlanID,
      SemestreID: SemestreID,
      MateriaID: MateriaID,
      Data: postsCatch,
    };

    SetBloqueRenderVista(<BloqueRender {...Datos} />);
    const Modal = {
      FacultadID: FacultadID,
      CarreraID: CarreraID,
      PlanID: PlanID,
      SemestreID: SemestreID,
      MateriaID: MateriaID,
      Data: postsCatch,
    };
  }, [postsCatch]);

  return <Container>{BloqueRenderVista}</Container>;
}
type ViewBloqueRender = {
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  Data: { ID: number; Nombre: string; Descripcion: string }[];
};
function BloqueRender({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  Data,
}: ViewBloqueRender) {
  return (
    <>
      {Data.map((data, index) => (
        <>
          <Accordion key={"Acordeon" + data.Nombre + data.ID + index} expanded>
            <EditBloque
              FacultadID={FacultadID}
              CarreraID={CarreraID}
              PlanID={PlanID}
              SemestreID={SemestreID}
              MateriaID={MateriaID}
              ID={data.ID}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                key={"AcordeonSum" + data.Nombre + data.ID + index}
                id={`panel1a-header ${index}`}
              >
                <Typography variant="h4">{data.Nombre}</Typography>
              </AccordionSummary>
            </EditBloque>
            <AccordionDetails key={"AcordeonDet" + data.Nombre + data.ID + index}>
              <Typography>{data.Descripcion}</Typography>
            </AccordionDetails>
            <ContenidoViewAdmin
              FacultadID={FacultadID}
              CarreraID={CarreraID}
              PlanID={PlanID}
              SemestreID={SemestreID}
              MateriaID={MateriaID}
              BloqueID={data.ID}
            />
            <AddContenido
              FacultadID={FacultadID}
              CarreraID={CarreraID}
              PlanID={FacultadID}
              SemestreID={FacultadID}
              MateriaID={MateriaID}
              BloqueID={data.ID}
              Actualizar={(e: any) => {
                console.log("Entro Refeetch de bloque");
              }}
            >
              <Button variant="contained" color="success">
                <AddCircleIcon />
                Añadir Unidad
              </Button>
            </AddContenido>
          </Accordion>
        </>
      ))}
    </>
  );
}
