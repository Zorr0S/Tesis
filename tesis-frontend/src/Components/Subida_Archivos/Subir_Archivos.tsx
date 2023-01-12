import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  Fade,
  Input,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useEffect, useState } from "react";
import axios from "axios";
import { Dominio } from "../../API/API";
function Subir_ArchivoAsociado() {
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
    console.log(data);
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
    console.log(data);
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

  //Hooks para los llenar los combobox
  const [FetchFacultad, SetFetchFacultad] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  const [FetchCarrera, SetFetchCarrera] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  const [FetchPlan, SetFetchPlan] = useState<{ ID: number; Nombre: string }[]>(
    []
  );
  const [FetchSemestre, SetFetchSemestre] = useState<
    { ID: number; Nombre: string }[]
  >([]);
  const [FetchMateria, SetFetchMateria] = useState<
    { ID: number; Nombre: string }[]
  >([]);
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

  // --------------------Template del comboBox-----------------------
  let ComboBoxCarrera = (
    <Autocomplete
      disablePortal
      id="CB-Carrera"
      options={FetchCarrera}
      getOptionLabel={(option: any) => option.Nombre.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "11rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        SetCarrera(value);
        SetSemestre(null);
      }}
      renderInput={(params) => (
        <TextField {...params} multiline required label="Carrera" />
      )}
    />
  );
  let ComboBoxPlan = (
    <Autocomplete
      disablePortal
      id="CB-Plan"
      options={FetchPlan}
      getOptionLabel={(option: any) => option.Nombre.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "12rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        SetPlan(value);
        SetSemestre(null);
      }}
      renderInput={(params) => <TextField {...params} multiline required label="Plan" />}
    />
  );
  let ComboBoxSemestre = (
    <Autocomplete
      disablePortal
      id="CB-Semestre"
      options={FetchSemestre}
      getOptionLabel={(option: any) => option.Nombre.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "12rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        SetSemestre(value);
        SetMateria(null);
      }}
      renderInput={(params) => (
        <TextField {...params} multiline required label="Semestre" />
      )}
    />
  );
  let ComboBoxMateria = (
    <Autocomplete
      disablePortal
      id="CB-Materia"
      options={FetchMateria}
      getOptionLabel={(option: any) => option.Nombre.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "13rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        SetMateria(value);
        SetBloque(null);
      }}
      renderInput={(params) => (
        <TextField {...params} multiline required label="Materia" />
      )}
    />
  );
  let ComboBoxBloque = (
    <Autocomplete
      disablePortal
      id="CB-Bloque"
      options={FetchBloque}
      getOptionLabel={(option: any) => option.Nombre.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "13rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        SetBloque(value);
        SetContenido(null);
      }}
      renderInput={(params) => (
        <TextField {...params} multiline required label="Bloque" />
      )}
    />
  );
  let ComboBoxContenido = (
    <Autocomplete
      disablePortal
      id="CB-Contenido"
      options={FetchContenido}
      getOptionLabel={(option) => option.Titulo.toString()}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      sx={{ width: "10rem", paddingInline: "0.5rem" }}
      onChange={(event, value: any) => {
        console.log("Conetenido----");
        SetContenido(value);
        console.log(value);
        console.log("----Conetenido");
      }}
      renderInput={(params) => (
        <TextField {...params} multiline required label="Contenido?" />
      )}
    />
  );

  //-------------------------------------------------------------------------------------------
  ///Maneja la subida
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        formData.append("FacultadID", Facultad?.ID + "");
        formData.append("CarreraID", Carrera?.ID + "");
        formData.append("PlanID", Plan?.ID + "");
        formData.append("SemestreID", Semestre?.ID + "");
        formData.append("MateriaID", Materia?.ID + "");
        formData.append("BloqueID", Bloque?.ID + "");
        formData.append("ContenidoID", Contenido?.ID + "");
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
          console.log(formData)
          
          if(TXT_URL.length>0){
            const { data } = await axios({
              method: "post",
              baseURL: Dominio,
              url: RutaRecurso,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
        setRespuesta(data);

          }else{
            const { data } = await axios({
              method: "post",
              baseURL: Dominio,
              url: Ruta,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
        setRespuesta(data);

          }
        alert("Se ha subido el recurso exitosamente")

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
  //******************************Funciones para traer datos de la APi****************************
  async function FetchAPIFacultad() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: "/recursos/facultad/",
    });
    SetFetchFacultad(data);
  }

  async function FetchAPICarrera() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID}/carrera/`,
    });
    SetFetchCarrera(data);
  }
  async function FetchAPIPlan() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
        Carrera?.ID
      }/plan/`,
    });
    SetFetchPlan(data);
  }
  async function FetchAPISemestre() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
        Carrera?.ID
      }/plan/${Plan?.ID}/semestre/`,
    });
    SetFetchSemestre(data);
  }

  async function FetchAPIMateria() {
    const { data } = await axios({
      method: "get",
      baseURL: Dominio,
      url: `/recursos/facultad/${Facultad?.ID + ""}/carrera/${
        Carrera?.ID
      }/plan/${Plan?.ID}/semestre/${Semestre?.ID}/materia/`,
    });
    SetFetchMateria(data);
  }
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

  //******************************************************************************************* */
  //Use effect para obtener los datos de la API

  useEffect(() => {
    FetchAPIFacultad();
  }, []);
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

  //Actualizar Busquedas
  useEffect(() => {
    console.log(":===========:");
    //Actualizar Carrera
    if (FetchCarrera.length != 0 && Facultad != null) {
      SetCBCarrera(ComboBoxCarrera);
    } else {
      SetCBCarrera(<></>);
    }
    //Actualizar Plan
    if (FetchPlan.length != 0 && Carrera != null) {
      SetCBPlan(ComboBoxPlan);
    } else {
      SetCBPlan(<></>);
    }
    //Actualizar Semestre
    if (FetchSemestre.length != 0 && Plan != null) {
      SetCBSemestre(ComboBoxSemestre);
    } else {
      SetCBSemestre(<></>);
    }
    //Actualizar Materia
    if (FetchMateria.length != 0 && Semestre != null) {
      SetCBMateria(ComboBoxMateria);
    } else {
      SetCBMateria(<></>);
    }
    //Actualizar Bloque
    if (FetchBloque.length != 0 && Materia != null) {
      SetCBBloque(ComboBoxBloque);
    } else {
      SetCBBloque(<></>);
    }
    //Actualizar Contenido
    if (FetchContenido.length != 0 && Bloque != null) {
      SetCBContenido(ComboBoxContenido);
    } else {
      SetCBContenido(<></>);
    }

    console.log(":===========:");
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
    if (Materia != null) {
      FetchAPIBloque();
      SetCBBloque(ComboBoxBloque);
    } else {
      SetCBMateria(<></>);
    }
    if (Bloque != null) {
      FetchAPIContenido();
      SetCBContenido(ComboBoxBloque);
    } else {
      SetCBContenido(<></>);
    }
  }, [Facultad, Carrera, Plan, Semestre, Materia, Bloque]);

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
          <Autocomplete
            disablePortal
            id="CB-Facultad"
            options={FetchFacultad}
            getOptionLabel={(option: any) => option.Nombre.toString()}
            isOptionEqualToValue={(option, value) => option.ID === value.ID}
            sx={{ width: "13rem", paddingInline: "0.5rem" }}
            onChange={(event, value) => {
              SetFacultad(value);
              SetMateria(null);
            }}
            renderInput={(params) => (
              <TextField {...params} multiline required label="Facultad" />
            )}
          />
          {CBCarrera}
          {CBPlan}
          {CBSemestre}
          {CBMateria}
         
        </Box>
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        {CBBloque}
          {CBContenido}
          </Box>
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
            console.log(value);
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

function Subir_unico() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [respuesta, setRespuesta] = useState<any>();
  const [Status, setStatus] = useState<any>(<Chip label="" color="default" />);

  //hooks para leer los textfielfs
  const [inputValueTitulo, setInputValueTitulo] = useState<string>("");
  const [inputValueDescripcion, setInputValueDescripcion] =
    useState<string>("");
  const [inputValuePalabrasClave, setinputValuePalabrasClave] =
    useState<string>("");

  ///Maneja la subida
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData();

      formData.append("archivo", selectedFile);
      formData.append("Nombre", inputValueTitulo);
      formData.append("Descripcion", inputValueDescripcion);
      //Clasificacion
      formData.append("PalabrasClave", inputValuePalabrasClave);

      const { data } = await axios({
        method: "post",
        baseURL: Dominio,
        url: "/archivo/subir",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRespuesta(data);
      if (respuesta.status === "OK") {
        setStatus(
          <>
            <Stack>
              <Chip label="Archivo Subido" color="success" />
              <Link href={respuesta.uploaded}>Ver Archivo</Link>
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
    } catch (error) {
      console.log(error);
      setStatus(
        <>
          <Chip label="Problema al subir el archivo" color="warning" />
        </>
      );
    }
  };
  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
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
          Subir Recursos
        </Typography>
        <TextField
          onChange={(e) => setInputValueTitulo(e.target.value)}
          margin="normal"
          required
          fullWidth
          id="titulo"
          label="Titulo de recurso"
          name="titulo"
          autoFocus
        />
        <TextField
          onChange={(e) => setInputValueDescripcion(e.target.value)}
          margin="normal"
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
          id="PalabraClave"
          label="Palabras clave "
          name="PalabraClave"
        />
        <Input
          type={"file"}
          required
          id="archivo"
          name="archivo"
          onChange={handleFileSelect}
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

//   function Prueba(){
//     const [Contenido, SetContenido] = useState<{ ID: number; Titulo: string;  }| null>(null);
//     const [FetchContenido, SetFetchContenido] = useState<{ ID: number; Titulo: string;  }[]>([]);
//     const [CBContenido, SetCBContenido] = useState<JSX.Element>();
//     async function FetchAPIContenido() {
//         const { data } = await axios({
//           method: "get",
//           baseURL: Dominio,
//           url: `/recursos/facultad/${1}/carrera/${1}/plan/${1}/semestre/${1}/materia/${1}/bloque/${1}/contenido/ `,
//         });
//         SetFetchContenido(data);
//         console.log(FetchContenido)
//       }
//       let ComboBoxContenido = (
//         <Autocomplete
//           disablePortal
//           id="CB-Contenido"
//           options={FetchContenido}
//           getOptionLabel={(option) => option.Titulo.toString()}
//           isOptionEqualToValue={(option, value) => option.ID === value.ID}
//           sx={{ width: "10rem", paddingInline: "0.5rem" }}
//           onChange={(event, value: any) => {
//             SetContenido(value);
//           }}
//           renderInput={(params) => <TextField {...params}  label="Contenido?" />}
//         />
//       );
//       useEffect(() => {
//         FetchAPIContenido();
//         SetCBContenido(ComboBoxContenido)
//       }, []);
//       useEffect(()=>{
//         console.log(Contenido)
//       },[Contenido])
//       return(
//         <Autocomplete
//         disablePortal
//         id="CB-Contenido"
//         options={FetchContenido}
//         getOptionLabel={(option) => option.Titulo.toString()}
//         isOptionEqualToValue={(option, value) => option.ID === value.ID}
//         sx={{ width: "10rem", paddingInline: "0.5rem" }}
//         onChange={(event, value: any) => {
//           SetContenido(value);
//         }}
//         renderInput={(params) => <TextField {...params}  label="Contenido?" />}
//       />)
//   }

export { Subir_ArchivoAsociado, Subir_unico };
