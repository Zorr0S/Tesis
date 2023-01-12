import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Input,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Dominio } from "../../API/API";
import EditIcon from "@mui/icons-material/Edit";
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
type ModalAddCarrera = {
  children: any;
  FacultadID: number | string;
  Actualizar?: any;
};
export function EditCarrera({
  children,
  FacultadID,
  Actualizar,
}: ModalAddCarrera) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar;
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar;
  };

  const [Respuesta, SetRespuesta] = useState<any>();

  const [NombreCarrera, SetNombreCarrera] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // e.preventDefault();
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/recursos/facultad/${FacultadID}/carrera`,
        data: {
          Nombre: NombreCarrera,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Error al subir los datos");
    }
  };
  //sx={style}

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => SetNombreCarrera(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Carrera"
            label="Nombre de la carrera"
            name="Carrera"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
type Materia = { ID: number; Nombre: string; Descripcion: string };

type ModalAddMateria = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  ID: number | string;
  Actualizar?: any;
};
export function EditMateria({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  ID,
  Actualizar,
}: ModalAddMateria) {
  const [posts, setPosts] = useState<Materia[]>([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar;
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar;
  };
  async function fetchData() {
    // let URLRest = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`;
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${ID}`,
    });
    setPosts(data);
    console.log("Busque Materia");
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    for (let index = 0; index < posts.length; index++) {
      SetNombreMateriae(posts[index].Nombre);
      SetDescripcion(posts[index].Descripcion);
    }
  }, [posts]);

  const [Respuesta, SetRespuesta] = useState<any>();

  const [NombreMateria, SetNombreMateriae] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const handleSubmit = () => {
    try {
      // e.preventDefault();

      const { data }: any = axios({
        method: "put",
        baseURL: Dominio,
        url: `/recursos/edit/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${ID}`,
        data: {
          Nombre: NombreMateria,
          Descripcion: Descripcion,
        },
      }).catch((data) => SetRespuesta(data));
      alert("Se edito con exito");
    } catch (error) {
      console.log(error);
      alert("Ocurrio u error");
      alert("Error al subir los datos");
    }
  };
  //sx={style}

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => SetNombreMateriae(e.target.value)}
            margin="normal"
            required
            fullWidth
            value={NombreMateria}
            id="Materia"
            label="Nombre de la materia"
            placeholder="Ej. Algebra linear"
            name="Materia"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
            value={Descripcion}
            multiline
            rows={4}
            id="Descripcion"
            label="Descripcion de la materia"
            placeholder="Lorem Ipsum"
            name="Descripcion"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

type Bloque = { ID: number; Nombre: string; Descripcion: string };

type ModalEditBloque = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;

  ID: number | string;
  Actualizar?: any;
};
export function EditBloque({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  ID,
  Actualizar,
}: ModalEditBloque) {
  const [posts, setPosts] = useState<Bloque[]>([]);
  const [NombreBloque, SetNombreBloque] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar;
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar;
  };
  async function fetchData() {
    // let URLRest = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`;
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${ID}`,
    });
    setPosts(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    for (let index = 0; index < posts.length; index++) {
      SetNombreBloque(posts[index].Nombre);
      SetDescripcion(posts[index].Descripcion);
    }
  }, [posts]);

  const [Respuesta, SetRespuesta] = useState<any>();

  const handleSubmit =  () => {
    try {
      // e.preventDefault();
      //const { data } =
        axios({
        method: "put",
        baseURL: Dominio,
        url: `/recursos/edit/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${ID}`,
        data: {
          Nombre: NombreBloque,
          Descripcion: Descripcion,
        },
      }).catch((data) => SetRespuesta(data));;
      alert("Se edito con exito");
    } catch (error) {
      console.log(error);
      alert("Ocurrio u error");
      alert("Error al subir los datos");
    }
  };
  //sx={style}

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => SetNombreBloque(e.target.value)}
            margin="normal"
            required
            fullWidth
            value={NombreBloque}
            id="Nombre"
            label="Nombre de la unidad"
            placeholder="Ej. Unidad 1- Ejemplos"
            name="Materia"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
            value={Descripcion}
            multiline
            rows={4}
            id="Descripcion"
            label="Descripcion de la unidad"
            placeholder="Lorem Ipsum"
            name="Descripcion"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

type Contenido = {
  ID: number;
  Titulo: string;
  Descripcion: string;
  MaterialAsociado: Material[];
};
type Material = {
  ID: number;
  Titulo: string;
  Descripcion: string;
  Direccion: string;
  TipoMaterial: { ID: number; Nombre_Tipo: string };
};
type ModalEditContenido = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  BloqueID: number | string;

  ID: number | string;
  Actualizar?: any;
};
export function EditContenido({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  BloqueID,
  ID,
  Actualizar,
}: ModalEditContenido) {
  const [posts, setPosts] = useState<Contenido[]>([]);
  const [Respuesta, SetRespuesta] = useState<any[]>([]);

  const [TituloBloque, SetTituloBloque] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar;
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar;
  };
  async function fetchData() {
    // let URLRest = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`;
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido/${ID}`,
    });
    setPosts(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    for (let index = 0; index < posts.length; index++) {
      SetTituloBloque(posts[index].Titulo);
      SetDescripcion(posts[index].Descripcion);
    }
  }, [posts]);

  const handleSubmit = () => {
    try {
      // e.preventDefault();
     // const { data } = await 
      axios({
        method: "put",
        baseURL: Dominio,
        url: `/recursos/edit/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido/${ID}`,
        data: {
          Titulo: TituloBloque,
          Descripcion: Descripcion,
        },
      }).catch((data) => SetRespuesta(data));;
      alert("Se edito con exito");
    } catch (error) {
      console.log(error);
      alert("Ocurrio u error");
      alert("Error al subir los datos");
    }
  };
  //sx={style}

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => SetTituloBloque(e.target.value)}
            margin="normal"
            required
            fullWidth
            value={TituloBloque}
            id="Titulo"
            label="Titulo de el Contenido"
            placeholder="Ej. 1.1- Ejemplos"
            name="Titulo"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
            value={Descripcion}
            multiline
            rows={4}
            id="Descripcion"
            label="Descripcion del contenido"
            placeholder="Lorem Ipsum"
            name="Descripcion"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
type ModalEditMaterial = {
  ID: number | string;
  children: any;
};
export function EditMaterial({ ID, children }: ModalEditMaterial) {
  const [posts, setPosts] = useState<MaterialDato | any>();
  const [Fomulario, SetFomulario] = useState<JSX.Element>(<></>);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  async function fetchData() {
    // let URLRest = `${Dominio}/recursos/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}`;
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/archivo/recurso/${ID}`,
    });
    setPosts(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    SetFomulario(<></>);
  }, [posts]);

  //sx={style}

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" ,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxheight: "90%",
            width: "80%",
            height: "95%",
            overflow: "scroll",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          <InterfazEditMaterial ID={ID} Datos={posts}></InterfazEditMaterial>
        </Box>
      </Modal>
    </div>
  );
}
interface TablasType {
  ID: number;
  Nombre: string;
}
interface MaterialDato {
  Titulo: string;
  Descripcion: string;
  PalabrasClave: string;

  TipoMaterialId: number | string;
  //
  Catalogo: string;
  IDIdioma: number | string;
  Ambito: string;
  Estructura: number | string;
  IDNivelAgregacion: number | string;
  //Ciclo
  Version: string;
  Estado: string;
  Contribucion: string;

  TipoContribucion: string;
  Entidad: string;
  TipoInteractividad: number | string;
  DensidadSemantica: string;
  TipoDestinatario: number | string;
  Contexto: string;
  RangoDeEdad: string;
  Dificultad: string;
  TiempoTipicoAprendizadje: string;
  DescripcionRecurso: string;
  ConocimientoPrevio: string;
  ObjetivosDidacticos: string;

  TipoConocimiento: string | number;
  IdiomaUtilizado: string;
  Proposito: string;
  Fuente: string;
  Taxon: string;
  Entrada: string;

  //Educativo
  TipRecurso: number | string;
  ProcesoCognitivo: string;
  //
  IdiomaTabla: { ID: number; nombre: string };
  Agregacion: TablasType;
  TipoRecursoEducativoTabla: TablasType;
  TipoInteractividadTabla: TablasType;
  Destinatario: TablasType;
  TipoDeConocimiento: TablasType;
}

interface MaterialDatosModal {
  ID: number | string;
  Datos: MaterialDato;
}
function InterfazEditMaterial({ ID, Datos }: MaterialDatosModal) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [TXT_URL, setTXT_URL] = useState<string>("");

  const [respuesta, setRespuesta] = useState<{
    status: string;
    uploaded: string;
  } | null>(null);
  //const [value, setValue] = React.useState<Date | null>(null);
  useEffect(() => {
    setInputValueTitulo(Datos.Titulo);
    setInputValueDescripcion(Datos.Descripcion);
    setinputValuePalabrasClave(Datos.PalabrasClave);
    //URL
    SetCatalogo(Datos.Catalogo);
    //Idioma
    SetSelectIdioma(Datos.IdiomaTabla);
    SetAmbito(Datos.Ambito);

    SetEstructura(Datos.Estructura + "");
    SetSelectNivelAgregacion(Datos.Agregacion);
    SetVersion(Datos.Version);
    SetEstado(Datos.Estado);
    SetContribucion(Datos.Contribucion);
    SetTipoContribucion(Datos.TipoContribucion);
    SetEntidad(Datos.Entidad);
    SetSelectNivelInteractividad(Datos.TipoInteractividadTabla);
    SetSelectTipoRecursoEducativo(Datos.TipoRecursoEducativoTabla);
    SetSelectDestinatario(Datos.Destinatario);
    SetContexto(Datos.Contexto);
    SetEdad(Datos.RangoDeEdad);
    SeDificultad(Datos.Dificultad);
    SeTiempoTipico(Datos.TiempoTipicoAprendizadje);
    SetDescripcion(Datos.Descripcion);
    SetConocimientoPrevio(Datos.ConocimientoPrevio);
    SetObjetivosDidacticos(Datos.ObjetivosDidacticos);
    SetSelectTipoConocimiento(Datos.TipoDeConocimiento);
    SetIdiomaUsado(Datos.IdiomaUtilizado);
    SetProcesoCognitivo(Datos.ProcesoCognitivo);
    SetProposito(Datos.Proposito);
    SetFuente(Datos.Fuente);
    SetEntrada(Datos.Entrada);
    SetTaxon(Datos.Taxon);
  }, []);

  const [Status, setStatus] = useState<JSX.Element>(
    <Chip label="" color="default" />
  );

  //Textfields
  const [Ambito, SetAmbito] = useState<string>("");
  const [Catalogo, SetCatalogo] = useState<string>("");
  const [Estructura, SetEstructura] = useState<string>("");
  const [Version, SetVersion] = useState<string>("");
  const [Estado, SetEstado] = useState<string>("");
  const [Contribucion, SetContribucion] = useState<string>("");
  const [TipoContribucion, SetTipoContribucion] = useState<string>("");
  const [Entidad, SetEntidad] = useState<string>("");
  const [Contexto, SetContexto] = useState<string>("");
  const [Edad, SetEdad] = useState<string>("");
  const [Dificultad, SeDificultad] = useState<string>("");
  const [TiempoTipico, SeTiempoTipico] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");
  const [ConocimientoPrevio, SetConocimientoPrevio] = useState<string>("");
  const [ObjetivosDidacticos, SetObjetivosDidacticos] = useState<string>("");
  const [IdiomaUsado, SetIdiomaUsado] = useState<string>("");
  const [ProcesoCognitivo, SetProcesoCognitivo] = useState<string>("");
  const [Proposito, SetProposito] = useState<string>("");
  const [Fuente, SetFuente] = useState<string>("");
  const [Entrada, SetEntrada] = useState<string>("");
  const [DensidadSemantica, SetDensidadSemantica] = useState<string>("Eii");
  const [Taxon, SetTaxon] = useState<string>("");

  //Datos Api Clasificacion
  ////Idiomas
  const [SelectIdioma, SetSelectIdioma] = useState<{
    ID: number;
    nombre: string;
  }>();

  const [FetchIdioma, SetFetchIdioma] = useState<
    { ID: number; nombre: string }[]
  >([]);
  async function FetchAPIIdioma() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/idiomas/",
    });
    SetFetchIdioma(data);
  }
  useEffect(() => {
    FetchAPIIdioma();
  }, []);
  ////Nivel de agregacion
  const [SelectNivelAgregacion, SetSelectNivelAgregacion] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const [FetchNivelAgregacion, SetNivelAgregacion] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  async function FetchAPINivelAgregacio() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/nivel-agregacion/",
    });
    SetNivelAgregacion(data);
  }
  useEffect(() => {
    FetchAPINivelAgregacio();
  }, []);

  //Nivel de interactividad
  const [SelectNivelInteractividad, SetSelectNivelInteractividad] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const [FetchNivelInteractividad, SetFetchNivelInteractividad] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  async function FetchAPIInteractividad() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/nivel-interactividad/",
    });
    SetFetchNivelInteractividad(data);
  }
  useEffect(() => {
    FetchAPIInteractividad();
  }, []);
  //Destinatario
  const [SelectDestinatario, SetSelectDestinatario] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const [FetchDestinatario, SetFetchDestinatario] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  async function FetchAPIDestinatario() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/destinatario/",
    });
    SetFetchDestinatario(data);
  }
  useEffect(() => {
    FetchAPIDestinatario();
  }, []);

  //Tipo de conocimiento
  const [SelectTipoConocimiento, SetSelectTipoConocimiento] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const [FetchTipoConocimiento, SetFetchTipoConocimiento] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  async function FetchAPITipoConocimiento() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/tipos-conocimientos/",
    });
    SetFetchTipoConocimiento(data);
  }
  useEffect(() => {
    FetchAPITipoConocimiento();
  }, []);
  //TipoRecursoEducativo
  const [SelectTipoRecursoEducativo, SetSelectTipoRecursoEducativo] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const [FetchTipoRecursoEducativo, SetTipoRecursoEducativo] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  async function FetchAPITipoRecursoEducativo() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/clasificacion/tipo-recurso/",
    });
    SetTipoRecursoEducativo(data);
  }
  useEffect(() => {
    FetchAPITipoRecursoEducativo();
  }, []);
  //hooks para leer los textfielfs
  const [inputValueTitulo, setInputValueTitulo] = useState<string>("");
  const [inputValueDescripcion, setInputValueDescripcion] =
    useState<string>("");
  const [inputValuePalabrasClave, setinputValuePalabrasClave] =
    useState<string>("");

  //-------------------------------------------------------------------------------------------
  ///Maneja la subida
  const handleSubmit =  () => {
    try {
      // event.preventDefault();

      //const { data } = await 
      axios({
        method: "put",
        baseURL: Dominio,
        url: `/archivo/editar/${ID}`,
        data: {
          Nombre: inputValueTitulo,
          Descripcion: inputValueDescripcion,
          PalabrasClave: inputValuePalabrasClave,
          Catalogo: Catalogo,
          Idioma: SelectIdioma?.ID,
          Ambito: Ambito,
          Estructura: Estructura,
          NivelDeAgregacion: SelectNivelAgregacion?.ID,
          RangoDeEdad: Edad,
          Version: Version,
          Estado: Estado,
          Contribucion: Contribucion,
          TipoContribucion: TipoContribucion,
          Entidad: Entidad,
          IdiomaUtilizado: IdiomaUsado,
          tipoInteractividad: SelectNivelInteractividad?.ID,
          TipoRecurso: SelectTipoRecursoEducativo?.ID,
          DensidadSemantica: DensidadSemantica,
          TiempoAprendisaje: TiempoTipico,
          DescripcionRecurso: Descripcion,
          ConocimientoPrevio: ConocimientoPrevio,
          ObjetivosDidacticos: ObjetivosDidacticos,
          TipoConomiento: SelectTipoConocimiento?.ID,
          ProcesoCognitivo: ProcesoCognitivo,
          Proposito: Proposito,
          Fuente: Fuente,
          Taxon: Taxon,
          Entrada: Entrada,
          Dificultad: Dificultad,
          Contexto: Contexto,
          TipoDestinatario: SelectDestinatario?.ID,
        },
      }).catch((data)=>setRespuesta(data));

      

      alert("Se edito el recurso exitosamente");
    } catch (error) {
      console.log(error);
      setStatus(
        <>
          <Chip label="Problema al subir el archivo" color="warning" />
        </>
      );
    }
  };
  //maneja el input de archivo

  //******************************************************************************************* */
  //Use effect para obtener los datos de la API

  useEffect(() => {
    if (respuesta == null) {
      setStatus(<Chip label="" color="default" />);
    } else {
      if (respuesta?.status === "OK") {
        setStatus(
          <>
            <Stack>
              <Chip label="Archivo Editado" color="success" />
            </Stack>
          </>
        );
      } else {
        setStatus(
          <>
            <Chip label="Problema al subir el archivo" color="warning" />
          </>
        );
      }
    }
  }, [respuesta]);

  return (
    <Container component={"main"} maxWidth="md">
      <CssBaseline />
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Subir y Asociar Recurso
        </Typography>
        <TextField
          onChange={(e) => setInputValueTitulo(e.target.value)}
          margin="normal"
          required
          fullWidth
          value={inputValueTitulo}
          id="titulo"
          label="Titulo de recurso"
          name="titulo"
          autoFocus
        />
        <TextField
          onChange={(e) => setInputValueDescripcion(e.target.value)}
          margin="normal"
          value={inputValueDescripcion}
          multiline
          rows={3}
          required
          fullWidth
          id="descripcion"
          label="descripcion"
          name="descripcion"
        />
        <TextField
          onChange={(e) => {
            setinputValuePalabrasClave(e.target.value);
          }}
          margin="normal"
          required
          value={inputValuePalabrasClave}
          fullWidth
          multiline
          id="PalabraClave"
          label="Palabras clave"
          name="PalabraClave"
        />
        {/**Contenedor de comboxes */}
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Input
            type={"file"}
            id="archivo"
            name="archivo"
            onChange={handleFileSelect}
            sx={{ padding: "2rem" }}
          />
          <TextField
            onChange={(e) => setTXT_URL(e.target.value)}
            value={TXT_URL}
            disabled
            multiline
            margin="normal"
            placeholder="Direccion del recurso"
            id="URL"
            label="URL"
            name="URL"
          /> */}
        </Box>
        <br></br>
        <br></br>
        <Divider>Clasificacion general</Divider>
        <TextField
          onChange={(e) => SetCatalogo(e.target.value)}
          margin="normal"
          value={Catalogo}
          required
          multiline
          fullWidth
          id="Catalogo"
          label="Catalogo"
          name="Catalogo"
        />
        <Autocomplete
          disablePortal
          id="CB-Idioma"
          options={FetchIdioma}
          defaultValue={Datos.IdiomaTabla}
          getOptionLabel={(option: any) => option.nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectIdioma(value);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Idioma" />
          )}
        />
        <TextField
          onChange={(e) => SetAmbito(e.target.value)}
          margin="normal"
          value={Ambito}
          multiline
          fullWidth
          id="Ambito"
          label="Ambito"
          name="Ambito"
        />
        <TextField
          onChange={(e) => SetEstructura(e.target.value)}
          margin="normal"
          value={Estructura}
          multiline
          fullWidth
          required
          id="Estructura"
          label="Estructura"
          name="Estructura"
        />
        <Autocomplete
          disablePortal
          id="CB-NivelDeAgregacion"
          options={FetchNivelAgregacion}
          defaultValue={Datos.Agregacion}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "15rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectNivelAgregacion(value);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Nivel De Agregacion" />
          )}
        />
        <Divider>Clasificacion Ciclo de Vida</Divider>
        <TextField
          onChange={(e) => SetVersion(e.target.value)}
          margin="normal"
          multiline
          value={Version}
          fullWidth
          id="Version"
          label="Version"
          name="Version"
        />
        <TextField
          onChange={(e) => SetEstado(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          value={Estado}
          id="Estado"
          label="Estado"
          name="Estado"
        />
        <TextField
          onChange={(e) => SetContribucion(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          required
          value={Contribucion}
          id="Contribucion"
          label="Contribucion"
          name="Contribucion"
        />
        <TextField
          onChange={(e) => SetTipoContribucion(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          required
          value={TipoContribucion}
          id="TipoDeContribucion"
          label="Tipo De Contribucion"
          name="Tipo De eContribucion"
        />
        <TextField
          onChange={(e) => SetEntidad(e.target.value)}
          margin="normal"
          multiline
          fullWidth
          value={Entidad}
          required
          id="Entidad"
          label="Entidad | Informacion de la entidad"
          name="Tipo De eContribucion"
        />
        <Autocomplete
          disablePortal
          id="CB-NivelDeInteractividad"
          options={FetchNivelInteractividad}
          defaultValue={Datos.TipoInteractividadTabla}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "15rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectNivelInteractividad(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Nivel De Interactividad" />
          )}
        />
        <Autocomplete
          disablePortal
          id="CB-TipoRecursoEducativo"
          options={FetchTipoRecursoEducativo}
          defaultValue={Datos.TipoRecursoEducativoTabla}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "15rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectTipoRecursoEducativo(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de recurso educativos" />
          )}
        />
        <Autocomplete
          disablePortal
          id="CB-Destinatario"
          options={FetchDestinatario}
          defaultValue={Datos.Destinatario}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "15rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectDestinatario(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Destinatario" />
          )}
        />
        <TextField
          onChange={(e) => SetContexto(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          required
          value={Contexto}
          id="Contexto"
          label="Contexto"
          placeholder="Entorno principal donde se debe usar"
          name="Contexto"
        />
        <TextField
          onChange={(e) => SetEdad(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          required
          value={Edad}
          id="Rango de edad"
          label="Rango de edad"
          placeholder="15 anos - 18 anos"
          name="Rango de edad"
        />
        <TextField
          onChange={(e) => SeDificultad(e.target.value)}
          margin="normal"
          multiline
          fullWidth
          value={Dificultad}
          id="NivelDificulad"
          label="Nivel de dificulad"
          placeholder="Baja, media, alta ,etc"
          name="NivelDificulad"
        />
        <TextField
          onChange={(e) => SeTiempoTipico(e.target.value)}
          margin="normal"
          multiline
          fullWidth
          value={TiempoTipico}
          id="Tiempo de tipico de aprendizaje"
          label="Tiempo de tipico de aprendizaje"
          placeholder="4 hrs -  6 hrs"
          name="Tiempo de tipico de aprendizaje"
        />
        <TextField
          onChange={(e) => SetDescripcion(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          value={Descripcion}
          required
          id="Descripcion"
          label="Descripcion"
          placeholder="Comentarios de como debe usarse este objeto"
          name="Tiempo de tipico de aprendizaje"
        />
        <TextField
          onChange={(e) => SetConocimientoPrevio(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          required
          value={ConocimientoPrevio}
          id="Conocimiento Previo"
          label="Conocimiento Previo"
          name="Tiempo de tipico de aprendizaje"
        />{" "}
        <TextField
          onChange={(e) => SetObjetivosDidacticos(e.target.value)}
          margin="normal"
          fullWidth
          required
          multiline
          value={ObjetivosDidacticos}
          id="Objetivos Didácticos"
          label="Objetivos Didácticos"
          name="Objetivos Didácticos"
        />
        <Autocomplete
          disablePortal
          id="CB-TipoConocimientoo"
          options={FetchTipoConocimiento}
          defaultValue={Datos.TipoDeConocimiento}
          getOptionLabel={(option: any) => option.Nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "15rem", paddingInline: "0.5rem" }}
          onChange={(event, value: any) => {
            SetSelectTipoConocimiento(value);
          }}
          renderInput={(params) => (
            <TextField {...params} required label="Tipo de Conocimientos" />
          )}
        />
        <TextField
          onChange={(e) => SetIdiomaUsado(e.target.value)}
          margin="normal"
          fullWidth
          required
          value={IdiomaUsado}
          multiline
          id="Idioma"
          label="Idioma"
          placeholder="Idioma utilizado por el destinatario"
          name="Idioma"
        />
        <TextField
          onChange={(e) => SetProcesoCognitivo(e.target.value)}
          margin="normal"
          value={ProcesoCognitivo}
          multiline
          fullWidth
          required
          id="Proceso Cognitivo"
          label="Proceso Cognitivo"
          placeholder="Actividad provocada en el usuario"
          name="Proceso Cognitivo"
        />
        <Divider>Clasificacion</Divider>
        <TextField
          onChange={(e) => SetProposito(e.target.value)}
          margin="normal"
          fullWidth
          required
          multiline
          value={Proposito}
          id="Proposito"
          label="Proposito"
          name="Proposito"
        />
        <TextField
          onChange={(e) => SetFuente(e.target.value)}
          margin="normal"
          fullWidth
          required
          multiline
          value={Fuente}
          id="Fuente"
          label="Fuente"
          name="Fuente"
        />
        <TextField
          onChange={(e) => SetEntrada(e.target.value)}
          margin="normal"
          fullWidth
          required
          multiline
          value={Entrada}
          id="Entrada"
          label="Entrada"
          name="Entrada"
        />
        <TextField
          onChange={(e) => SetTaxon(e.target.value)}
          margin="normal"
          fullWidth
          required
          multiline
          value={Taxon}
          id="Taxon"
          label="Taxon"
          name="Taxon"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Subir
        </Button>
        {Status}
      </Box>
    </Container>
  );
}
