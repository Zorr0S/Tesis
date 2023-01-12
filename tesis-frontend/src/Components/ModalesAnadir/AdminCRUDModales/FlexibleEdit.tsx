import { jsx } from "@emotion/react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Dominio } from "../../../API/API";
import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import { Recurso } from "../../../API/Types/Tipos";

export function EditMaterial({
  Data,
  MaterialID,
 children=(<></>),
}: {
  MaterialID: number;
  Data:Recurso
 children?: JSX.Element;
}) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
        {children}
        {/* <EditIcon /> */}
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
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
        >a
        <InterfazEditMaterial ID={MaterialID} Datos={Data}/>
          {/* {Interfaz} */}
        </Box>
      </Modal>
    </div>
  );
}

export function InterfazEditMaterial({ ID, Datos }: { ID: number; Datos?: Recurso }) {

  if(Datos==undefined)return <>Cargando</>
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

  
  const { data: FetchIdioma } = useQuery(`FetchAPIIdioma`, async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: `/clasificacion/idiomas/`,
    });
    return data as { ID: number; nombre: string }[];
  });
 
  const [SelectNivelAgregacion, SetSelectNivelAgregacion] = useState<{
    ID: number;
    Nombre: string;
  }>();

  const { data: FetchNivelAgregacion } = useQuery(
    `FetchAPINivelAgregacio`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/clasificacion/nivel-agregacion/",
      });
      return data as { ID: number; Nombre: string }[];
    }
  );


  //Nivel de interactividad
  const [SelectNivelInteractividad, SetSelectNivelInteractividad] = useState<{
    ID: number;
    Nombre: string;
  }>();


  const { data: FetchNivelInteractividad } = useQuery(
    `FetchAPIInteractividad`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "clasificacion/nivel-interactividad/",
      });
      return data as { ID: number; Nombre: string }[];
    }
  );

  //Destinatario
  const [SelectDestinatario, SetSelectDestinatario] = useState<{
    ID: number;
    Nombre: string;
  }>();


  const { data: FetchDestinatario } = useQuery(
    `FetchAPIDestinatario`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/clasificacion/destinatario/",
      });
      return data as { ID: number; Nombre: string }[];
    }
  );


  //Tipo de conocimiento
  const [SelectTipoConocimiento, SetSelectTipoConocimiento] = useState<{
    ID: number;
    Nombre: string;
  }>();


  const { data: FetchTipoConocimiento } = useQuery(
    `FetchAPITipoConocimiento`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/clasificacion/tipos-conocimientos/",
      });
      return data as { ID: number; Nombre: string }[];
    }
  );

  const [SelectTipoRecursoEducativo, SetSelectTipoRecursoEducativo] = useState<{
    ID: number;
    Nombre: string;
  }>();

 
  const { data: FetchTipoRecursoEducativo } = useQuery(
    `FetchAPITipoRecursoEducativo`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/clasificacion/tipo-recurso/",
      });
      return data as { ID: number; Nombre: string }[];
    }
  );

  const [inputValueTitulo, setInputValueTitulo] = useState<string>("");
  const [inputValueDescripcion, setInputValueDescripcion] =
    useState<string>("");
  const [inputValuePalabrasClave, setinputValuePalabrasClave] =
    useState<string>("");

  //-------------------------------------------------------------------------------------------
  ///Maneja la subida
  const FuncionSubir = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
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
        }
      });
      return data;
    },
    onError: (error) => {
      setStatus(
          <Chip label="Problema al subir el archivo" color="warning" />
      );
      alert(error);
     
      // I will fire first
    },
    onSuccess(data, variables, context) {
      setStatus(
      <Chip label="Archivo Editado" color="success" />
      );
      alert("se logro Editar el documento");
        console.log(data)
        
        // window.location.reload(); 
    },
  });
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    FuncionSubir.mutate()
    return false;

  };


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
          options={FetchIdioma || []}
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
          options={FetchNivelAgregacion || []}
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
          options={FetchNivelInteractividad || []}
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
          options={FetchTipoRecursoEducativo || []}
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
          options={FetchDestinatario || []}
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
          options={FetchTipoConocimiento || []}
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
