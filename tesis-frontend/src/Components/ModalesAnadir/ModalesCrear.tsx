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
function AddCarrera({ children, FacultadID, Actualizar }: ModalAddCarrera) {
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

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera`,
        data: {
          Nombre: NombreCarrera,
        },
      }).then(() => {
        alert("Te has unido exitosamente");

        location.reload();
      });

      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
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

type ModalAddPlan = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  Actualizar?: any;
};
function AddPlan({
  children,
  FacultadID,
  Actualizar,
  CarreraID,
}: ModalAddPlan) {
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

  const [NombrePlan, SetNombrePlan] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      //const { data } = await
      axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera/${CarreraID}/plan`,
        data: {
          Nombre: NombrePlan,
        },
      }).then(() => {
        alert("Se ah creado el plan exitosamente");

        location.reload();
      });
      //   console.log(data)
      // location.reload();
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
            onChange={(e) => SetNombrePlan(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Plan"
            label="Nombre del plan de estudio"
            placeholder="Ej. Plan de estudios 4 - 2018"
            name="Plan"
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
type ModalAddSemestre = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  Actualizar?: any;
};
function AddSemestre({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  Actualizar,
}: ModalAddSemestre) {
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

  const [NombreSemestre, SetNombreSemestre] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      //const { data } =
      await axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre`,
        data: {
          Nombre: NombreSemestre,
        },
      }).then(() => {
        alert("Se ah creado el semestre exitosamente");

        location.reload();
      });
      // location.reload();
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
            onChange={(e) => SetNombreSemestre(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Semestre"
            label="Nombre del plan de estudio"
            placeholder="Ej. Semestre 1"
            name="Semestre"
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
type ModalAddMateria = {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  Actualizar?: any;
};
function AddMateria({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  Actualizar,
}: ModalAddMateria) {
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

  const [NombreMateria, SetNombreMateriae] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      //const { data } =
      await axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia`,
        data: {
          Nombre: NombreMateria,
          Descripcion: Descripcion,
        },
      }).then(() => {
        alert("Se ah creado el la materia exitosamente");

        location.reload();
      });
      // location.reload();
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
            onChange={(e) => SetNombreMateriae(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Materia"
            label="Nombre de la materia"
            placeholder="Ej. Algebra linear"
            name="Materia"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
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

interface ModalAddBloque {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  Actualizar?: any;
}
function AddBloque({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  Actualizar,
}: ModalAddBloque) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar();
  };

  const [Respuesta, SetRespuesta] = useState<any>();

  const [NombreMateria, SetNombreMateriae] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      //const { data } =
      await axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque `,
        data: {
          Nombre: NombreMateria,
          Descripcion: Descripcion,
        },
      }).then(() => {
        alert("Se ah creado el bloque exitosamente");

        location.reload();
      });
      alert("Se ah creado el semestre exitosamente");
      handleClose();
      //location.reload();
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => {
            handleSubmit(e);
          }}
        >
          <TextField
            onChange={(e) => SetNombreMateriae(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Bloque"
            label="Nombre de la Unidad"
            placeholder="Ej. Unidad 1- Numeros y letas"
            name="Bloque"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
            id="Bloque"
            label="Descripcion de la unidad"
            placeholder="Lorem Ipsum"
            name="Bloque"
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
interface ModalAddContenido {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  BloqueID: number | string;
  Actualizar?: any;
}
function AddContenido({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  BloqueID,
  Actualizar,
}: ModalAddContenido) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar();
  };
  const handleClose = () => {
    setOpen(false);
    Actualizar();
  };

  const [Respuesta, SetRespuesta] = useState<any>();

  const [NombreMateria, SetNombreMateriae] = useState<string>("");
  const [Descripcion, SetDescripcion] = useState<string>("");

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      //const { data } =
      await axios({
        method: "post",
        baseURL: Dominio,
        url: `/recursos/create/facultad/${FacultadID}/carrera/${CarreraID}/plan/${PlanID}/semestre/${SemestreID}/materia/${MateriaID}/bloque/${BloqueID}/contenido `,
        data: {
          Titulo: NombreMateria,
          Descripcion: Descripcion,
        },
      }).then(() => {
        alert("Se ah creado el Contenido exitosamente");

        location.reload();
      });
      // location.reload();
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => {
            handleSubmit(e);
          }}
        >
          <TextField
            onChange={(e) => SetNombreMateriae(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Titulo"
            label="Titulo del contenido"
            placeholder="Ej. Unidad 1- Numeros y letas"
            name="Titulo"
          />
          <TextField
            onChange={(e) => SetDescripcion(e.target.value)}
            margin="normal"
            fullWidth
            id="Descripcion"
            label="Descripcion del contenido de la unidad"
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

function AddMaterial({
  children,
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  BloqueID,
  ContenidoID,
  Actualizar,
}: ModalAddMaterial) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    Actualizar();
  };
  const handleClose = () => {
    setOpen(false);
    location.reload();
    Actualizar();
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
        <Box
          sx={{
            position: "absolute" as "absolute",
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
          <InterfazSubirArchivo
            FacultadID={FacultadID}
            CarreraID={CarreraID}
            PlanID={PlanID}
            SemestreID={SemestreID}
            MateriaID={MateriaID}
            BloqueID={BloqueID}
            ContenidoID={ContenidoID}
          />
        </Box>
      </Modal>
    </div>
  );
}

interface ModalAddMaterial {
  children: any;
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  BloqueID: number | string;
  ContenidoID: number | string;
  Actualizar?: any;
}
interface MaterialDatos {
  FacultadID: number | string;
  CarreraID: number | string;
  PlanID: number | string;
  SemestreID: number | string;
  MateriaID: number | string;
  BloqueID: number | string;
  ContenidoID: number | string;
  Actualizar?: any;
}

function InterfazSubirArchivo({
  FacultadID,
  CarreraID,
  PlanID,
  SemestreID,
  MateriaID,
  BloqueID,
  ContenidoID,
}: MaterialDatos) {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [TXT_URL, setTXT_URL] = useState<string>("");

  const [respuesta, setRespuesta] = useState<{
    status: string;
    uploaded: string;
  } | null>(null);
  //const [value, setValue] = React.useState<Date | null>(null);

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      let Ruta = "/archivo/subir/asociando";
      let RutaRecurso = "/archivo/subir/recurso";
      const formData = new FormData();

      event.preventDefault();
      if ((TXT_URL == null || TXT_URL == "") && selectedFile == null) {
        alert("ERROR:\n Ingresa un recurso porfavor");
      } else {
        formData.append("archivo", selectedFile);

        formData.append("URL", TXT_URL);

        formData.append("Nombre", inputValueTitulo);
        formData.append("Descripcion", inputValueDescripcion);

        //Index
        formData.append("FacultadID", FacultadID + "");
        formData.append("CarreraID", CarreraID + "");
        formData.append("PlanID", PlanID + "");
        formData.append("SemestreID", SemestreID + "");
        formData.append("MateriaID", MateriaID + "");
        formData.append("BloqueID", BloqueID + "");
        formData.append("ContenidoID", ContenidoID + "");
        //
        //Clasificacion
        formData.append("PalabrasClave", inputValuePalabrasClave);
        formData.append("Catalogo", Catalogo);
        formData.append("Idioma", SelectIdioma?.ID + "");
        formData.append("Ambito", Ambito);
        formData.append("Estructura", Estructura);
        formData.append("NivelDeAgregacion", SelectNivelAgregacion?.ID + "");
        ///
        formData.append("RangoDeEdad", Edad);
        formData.append("Version", Version);
        formData.append("Estado", Estado);
        formData.append("Contribucion", Contribucion);
        formData.append("TipoContribucion", TipoContribucion);
        formData.append("Entidad", Entidad);
        formData.append("IdiomaUtilizado", IdiomaUsado);
        //
        formData.append(
          "tipoInteractividad",
          SelectNivelInteractividad?.ID + ""
        );
        formData.append("TipoRecurso", SelectTipoRecursoEducativo?.ID + "");
        formData.append("DensidadSemantica", DensidadSemantica);
        formData.append("TiempoAprendisaje", TiempoTipico);
        formData.append("DescripcionRecurso", Descripcion);
        formData.append("ConocimientoPrevio", ConocimientoPrevio);
        formData.append("ObjetivosDidacticos", ObjetivosDidacticos);
        formData.append("TipoConomiento", SelectTipoConocimiento?.ID + "");
        formData.append("ProcesoCognitivo", ProcesoCognitivo);
        //
        formData.append("Proposito", Proposito);
        formData.append("Fuente", Fuente);
        formData.append("Taxon", Taxon);
        formData.append("Entrada", Entrada);
        formData.append("Dificultad", Dificultad);
        formData.append("Contexto", Contexto);
        formData.append("TipoDestinatario", SelectDestinatario?.ID + "");
        formData.append("TipoRecurso", SelectTipoRecursoEducativo?.ID + "");

        if (TXT_URL.length > 0) {
          //const { data } = await
          axios({
            method: "post",
            baseURL: Dominio,
            url: RutaRecurso,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(({ data }) => {
            setRespuesta(data);
            alert("Se ah creado el semestre exitosamente");
          });
        } else {
          //const { data } = await
          axios({
            method: "post",
            baseURL: Dominio,
            url: Ruta,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(({ data }) => {
            setRespuesta(data);
            alert("Se ah creado el semestre exitosamente");
          });
          //setRespuesta(data);
        }
        alert("Se ha subido el recurso exitosamente");
      }
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
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

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
              <Chip label="Archivo Subido" color="success" />
              <Link href={respuesta?.uploaded}>Ver Archivo</Link>
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
          <Input
            type={"file"}
            id="archivo"
            name="archivo"
            onChange={handleFileSelect}
            sx={{ padding: "2rem" }}
          />
          <TextField
            onChange={(e) => setTXT_URL(e.target.value)}
            value={TXT_URL}
            multiline
            margin="normal"
            placeholder="Direccion del recurso"
            id="URL"
            label="URL"
            name="URL"
          />
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
          getOptionLabel={(option: any) => option.nombre.toString()}
          isOptionEqualToValue={(option, value) => option.ID === value.ID}
          sx={{ width: "10rem", paddingInline: "0.5rem" }}
          onChange={(event, value) => {
            SetSelectIdioma(value as { ID: number; nombre: string });
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
export {
  AddCarrera,
  AddPlan,
  AddSemestre,
  AddMateria,
  AddBloque,
  AddContenido,
  AddMaterial,
};
