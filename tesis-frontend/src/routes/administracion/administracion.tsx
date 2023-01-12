import {
  Autocomplete,
  Box,
  Button,
  Container,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dominio } from "../../API/API";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  AddCarrera,
  AddMateria,
  AddPlan,
  AddSemestre,
} from "../../Components/ModalesAnadir/ModalesCrear";
import { MateriaAdminView } from "../../Components/ViewAdministracion/ViewAdministracion";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
function PantallaAdmin() {
  //Hooks para los llenar los combobox
  // const [FetchFacultad, SetFetchFacultad] = useState< { ID: number; Nombre: string }[]
  // >([]);
  // const [FetchCarrera, SetFetchCarrera] = useState<
  //   { ID: number; Nombre: string }[]
  // >([]);
  // const [FetchPlan, SetFetchPlan] = useState<{ ID: number; Nombre: string }[]>(
  //   []
  // );
  // const [FetchSemestre, SetFetchSemestre] = useState<
  //   { ID: number; Nombre: string }[]
  // >([]);
  // const [FetchMateria, SetFetchMateria] = useState<
  //   { ID: number; Nombre: string }[]
  // >([]);
  const [FetchBloque, SetFetchBloque] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  const [FetchContenido, SetFetchContenido] = useState<
    { ID: number; Titulo: string }[]
  >([]);

  //hooks para renderear los combox
  const [CBFacultad, SetCBFacultad] = useState<JSX.Element>();
  const [CBCarrera, SetCBCarrera] = useState<JSX.Element>();
  const [CBPlan, SetCBPlan] = useState<JSX.Element>();
  const [CBSemestre, SetCBSemestre] = useState<JSX.Element>();
  const [CBMateria, SetCBMateria] = useState<JSX.Element>();
  const [CBBloque, SetCBBloque] = useState<JSX.Element>();
  const [CBContenido, SetCBContenido] = useState<JSX.Element>();

  const [Vista, SetVista] = useState<JSX.Element>(<></>);
  //hooks para obtner el elemento seleccionado
  const [Facultad, SetFacultad] = useState<{
    ID: number;
    Nombre: string;
  } | null>(null);
  const [Carrera, SetCarrera] = useState<{ ID: number; Nombre: string } | null>(
    null
  );
  const [Plan, SetPlan] = useState<{ ID: number; Nombre: string } | null>(null);
  const [Semestre, SetSemestre] = useState<{
    ID: number;
    Nombre: string;
  } | null>(null);
  const [Materia, SetMateria] = useState<{ ID: number; Nombre: string } | null>(
    null
  );
  const [Bloque, SetBloque] = useState<{ ID: number; Nombre: string } | null>(
    null
  );
  const [Contenido, SetContenido] = useState<{
    ID: number;
    Titulo: string;
  } | null>(null);

  const { data: FetchFacultad, refetch: FetchAPIFacultad } = useQuery(
    "GetFetchFacultad",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: "/recursos/facultad/",
      });
      return data as { ID: number; Nombre: string }[];
    },{enabled:false}
  );
  const { data: FetchCarrera, refetch: FetchAPICarrera } = useQuery(
    "GetFetchCarrera",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/recursos/facultad/${Facultad?.ID}/carrera/`,
      });
      return data as { ID: number; Nombre: string }[];
    },{enabled:false}
  );
  // async function FetchAPICarrera() {
  //   const { data } = await axios({
  //     method: "get",
  //     baseURL: Dominio,
  //     url: `/recursos/facultad/${Facultad?.ID}/carrera/`,
  //   });
  //   SetFetchCarrera(data);
  // }
  const { data: FetchPlan, refetch: FetchAPIPlan } = useQuery(
    "FetchAPIPlan",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
          Carrera?.ID
        }/plan/`,
      });
      return data as { ID: number; Nombre: string }[];
    },{enabled:false}
  );
  // async function FetchAPIPlan() {
  //   const { data } = await axios({
  //     method: "get",
  //     baseURL: Dominio,
  //     url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
  //       Carrera?.ID
  //     }/plan/`,
  //   });
  //   SetFetchPlan(data);
  // }
  const { data: FetchSemestre, refetch: FetchAPISemestre } = useQuery(
    "FetchAPISemestre",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
          Carrera?.ID
        }/plan/${Plan?.ID}/semestre/`,
      });
      return data as { ID: number; Nombre: string }[];
    },{enabled:false}
  );
  // async function FetchAPISemestre() {
  //   const { data } = await axios({
  //     method: "get",
  //     baseURL: Dominio,
  //     url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
  //       Carrera?.ID
  //     }/plan/${Plan?.ID}/semestre/`,
  //   });
  //   SetFetchSemestre(data);
  // }
  const { data: FetchMateria, refetch: FetchAPIMateria } = useQuery(
    "FetchAPIMateria",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
          Carrera?.ID
        }/plan/${Plan?.ID}/semestre/${Semestre?.ID}/materia/`,
      });
      return data as { ID: number; Nombre: string }[];
    },{enabled:false}
  );
  // async function FetchAPIMateria() {
  //   const { data } = await axios({
  //     method: "get",
  //     baseURL: Dominio,
  //     url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
  //       Carrera?.ID
  //     }/plan/${Plan?.ID}/semestre/${Semestre?.ID}/materia/`,
  //   });
  //   SetFetchMateria(data);
  // }
  async function FetchAPIBloque() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
        Carrera?.ID
      }/plan/${Plan?.ID}/semestre/${Semestre?.ID}/materia/${
        Materia?.ID
      }/bloque `,
    });
    SetFetchBloque(data);
  }
  async function FetchAPIContenido() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
        Carrera?.ID
      }/plan/${Plan?.ID}/semestre/${Semestre?.ID}/materia/${
        Materia?.ID
      }/bloque/${Bloque?.ID}/contenido/ `,
    });
    SetFetchContenido(data);
  }
  //ComboBox
  let ComboBoxFacultad = (
    <>
      <Box>
        <Autocomplete
          disablePortal
          id="CB-Facultad"
          options={FetchFacultad || []}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value) => {
            SetFacultad(value);
            SetMateria(null);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Facultad" />
          )}
        />
      </Box>
    </>
  );
  let ComboBoxCarrera = (
    <>
      <Box>
        <Autocomplete
          disablePortal
          id="CB-Carrera"
          options={FetchCarrera || []}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetCarrera(value);
            SetSemestre(null);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Carrera" />
          )}
        />
        <AddCarrera FacultadID={Facultad?.ID + ""} Actualizar={FetchAPICarrera}>
          <AddCircleIcon />
        </AddCarrera>
      </Box>
    </>
  );
  let ComboBoxPlan = (
    <>
      <Box>
        <Autocomplete
          disablePortal
          id="CB-Plan"
          options={FetchPlan||[]}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetPlan(value);
            SetSemestre(null);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Plan" />
          )}
        />
        <AddPlan
          FacultadID={Facultad?.ID + ""}
          CarreraID={Carrera?.ID + ""}
          Actualizar={FetchAPIPlan}
        >
          <AddCircleIcon />
        </AddPlan>
      </Box>
    </>
  );
  let ComboBoxSemestre = (
    <>
      <Box>
        <Autocomplete
          disablePortal
          id="CB-Semestre"
          options={FetchSemestre||[]}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSemestre(value);
            SetMateria(null);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Semestre" />
          )}
        />
        <AddSemestre
          FacultadID={Facultad?.ID + ""}
          CarreraID={Carrera?.ID + ""}
          PlanID={Plan?.ID + ""}
          Actualizar={FetchAPISemestre}
        >
          <AddCircleIcon />
        </AddSemestre>
      </Box>
    </>
  );
  let ComboBoxMateria = (
    <>
      <Box>
        <Autocomplete
          disablePortal
          id="CB-Materia"
          options={FetchMateria||[]}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetMateria(value);
            SetBloque(null);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Materia" />
          )}
        />
        <AddMateria
          FacultadID={Facultad?.ID + ""}
          CarreraID={Carrera?.ID + ""}
          PlanID={Plan?.ID + ""}
          SemestreID={Semestre?.ID + ""}
          Actualizar={FetchAPIMateria}
        >
          <AddCircleIcon />
        </AddMateria>
      </Box>
    </>
  );

  //Actualizar Busquedas
  //******************************************************************************************* */
  //Use effect para obtener los datos de la API

  useEffect(() => {
    SetCBFacultad(ComboBoxFacultad);

    FetchAPIFacultad();
  }, []);

  //Actualizar Busquedas
  useEffect(() => {
    //Actualizar Carrera
    if (FetchCarrera?.length != 0 && Facultad != null) {
      SetCBCarrera(ComboBoxCarrera);
    } else {
      SetCBCarrera(<></>);
    }
    //Actualizar Plan
    if (Carrera != null) {
      SetCBPlan(ComboBoxPlan);
    } else {
      SetCBPlan(<></>);
    }
    //Actualizar Semestre
    if (Plan != null) {
      SetCBSemestre(ComboBoxSemestre);
    } else {
      SetCBSemestre(<></>);
    }
    //Actualizar Materia
    if (Semestre != null) {
      SetCBMateria(ComboBoxMateria);
    } else {
      SetCBMateria(<></>);
    }
  }, [
    Facultad,
    FetchCarrera,
    Carrera,
    Plan,
    FetchPlan,
    Semestre,
    FetchSemestre,
    Materia,
    FetchMateria,
    Bloque,
    FetchBloque,
    Contenido,
    FetchContenido,
  ]);
  //Maneja la buqqueda de los combobox de acuerdo a lo elejido
  useEffect(() => {
    //Acutalizar Carrera
    if (Facultad != null) {
      FetchAPICarrera();
    } else {
      SetCarrera(null);
      SetCBCarrera(<></>);
    }
    //Actualizar Plan
    if (Carrera != null) {
      FetchAPIPlan();
    } else {
      SetPlan(null);
      SetCBPlan(<></>);
    }
    //Actualizar Semestre
    if (Plan != null) {
      FetchAPISemestre();
      SetCBSemestre(ComboBoxSemestre);
    } else {
      SetCBSemestre(<></>);
    }

    if (Semestre != null) {
      FetchAPIMateria();
      SetCBMateria(ComboBoxMateria);
    } else {
      SetCBMateria(<></>);
    }
    //Rendererar vista de administrador
    if (
      Facultad != null &&
      Carrera != null &&
      Plan != null &&
      Semestre != null &&
      Materia != null
    ) {
      SetVista(
        <Navigate
          to={`/administracion/Facultad/${Facultad?.ID + ""}/Carrera/${
            Carrera?.ID + ""
          }/Plan/${Plan?.ID + ""}/Semestre/${Semestre?.ID + ""}/Materia/${
            Materia?.ID + ""
          }`}
        />
      );
      //Navigate({to:`/administracion/Facultad/${Facultad?.ID+""}/Carrera/${Carrera?.ID+""}/Plan/${Plan?.ID+""}/Semestre/${Semestre?.ID+""}/Materia/${Materia?.ID+""}`})
    } else {
      SetVista(<></>);
    }
  }, [Facultad, Carrera, Plan, Semestre, Materia]);

  return (
    <Container>
      <Box
        sx={{
          margin: "2rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {ComboBoxFacultad}
        {CBCarrera}
        {CBPlan}
        {CBSemestre}
        {CBMateria}
      </Box>
      <Container>{Vista}</Container>
    </Container>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxheight: "90%",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
type ModalAddFacultad = {
  children: any;
  onClick?: any;
};
function AddFacultad({ children, onClick }: ModalAddFacultad) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </div>
  );
}

export { PantallaAdmin };
