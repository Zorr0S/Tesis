import {
  Chip,
  Stack,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Input,
  Divider,
  Autocomplete,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { useAppSelector } from "../../store/hooks";

export function InterfazSubirArchivoLibre() {
  let User = useAppSelector((state) => state.Token);

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
  //hooks para leer los textfielfs
  const [inputValueTitulo, setInputValueTitulo] = useState<string>("");
  const [inputValueDescripcion, setInputValueDescripcion] =
    useState<string>("");
  const [inputValuePalabrasClave, setinputValuePalabrasClave] =
    useState<string>("");

  //-------------------------------------------------------------------------------------------
  ///Maneja la subida
  const AddMateria = useMutation({
    mutationFn: async () => {
      let Ruta = "/archivo/subir/asociando";
      let RutaRecurso = "/archivo/subir/recurso";
      const formData = new FormData();

      if ((TXT_URL == null || TXT_URL == "") && selectedFile == null) {
        alert("ERROR:\n Ingresa un recurso porfavor");
      } else {
        formData.append("archivo", selectedFile);

        formData.append("URL", TXT_URL);

        formData.append("Nombre", inputValueTitulo);
        formData.append("Descripcion", inputValueDescripcion);

        //Index
        //   formData.append("FacultadID", FacultadID + "");
        //   formData.append("CarreraID", CarreraID + "");
        //   formData.append("PlanID", PlanID + "");
        //   formData.append("SemestreID", SemestreID + "");
        //   formData.append("MateriaID", MateriaID + "");
        //   formData.append("BloqueID", BloqueID + "");
        //   formData.append("ContenidoID", ContenidoID + "");
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

        //const { data } = await
        //en el caso de que sea un URL
        const { data } = await axios({
          method: "post",
          baseURL: Dominio,
          url: "/archivo/subir/recursoLibre",
          data: formData,

          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": UndefinedTokenToEmptyString(User.Token),
          },
        });
        return data;
      }
    },
    onError: (error) => {
      setStatus(<Chip label="Problema al subir el archivo" color="warning" />);
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se ah subido el recuros exitosamente");
      setStatus(
        <>
          <Stack>
            <Chip label="Archivo Subido" color="success" />
          </Stack>
        </>
      );
      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      AddMateria.mutate();
    } catch (error) {
      console.log(error);
      setStatus(<Chip label="Problema al subir el archivo" color="warning" />);
    }
  };
  //maneja el input de archivo
  const handleFileSelect = (
    event: any | React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files[0]);
  };

  //******************************************************************************************* */
  //Use effect para obtener los datos de la API

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
            onChange={
              //(e)=>{}
              handleFileSelect
            }
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
          options={FetchIdioma || []}
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
        <br/>
        <br/>

        <Autocomplete
          disablePortal
          id="CB-TipoRecursoEducativo"
          options={FetchTipoRecursoEducativo || []}
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
        <br/>
        <br/>

        <Autocomplete
          disablePortal
          id="CB-Destinatario"
          options={FetchDestinatario || []}
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
