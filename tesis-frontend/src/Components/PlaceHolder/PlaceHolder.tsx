/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Avatar,
  Button,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";

import { ContentCopy, Update } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Dominio } from "../../API/API";
import axios from "axios";
import { MaterialElemento } from "../IconoVariable/IconoVariable";
import MediaViewer from "../MediaViewer/MediaViewer";
import { jsx } from "@emotion/react";
import { usePagination } from "../../functions/functions";
const filterData = (query: string, data: any[]) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toLowerCase().includes(query));
  }
};

//TODO: Implementar busqueda con etiquetas como es debido
type Materiales = {
  Enumerador: number;
  ID: number;
  Titulo: string;
  Descripcion: string;
  Direccion: string;
  TipoMaterial: { ID: number; Nombre_Tipo: string };
};
export function BusquedaConEtiquetas() {
  const textInput = React.useRef<HTMLInputElement | null>(null);
  // const [posts, setPosts] = useState<Materiales[]>([]);
  const [Updater, setUpdater] = useState<Materiales[]>([]);

  const [inputGeneral, setInputGeneral] = useState("");
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [inputPalabrasClave, setInputPalabrasClave] = useState("");

  const [OpcionSelec, setOpcionesSelec] = useState<{
    ID: number;
    Opcion: string;
  } | null>();
  const [Lista, SetLista] = useState<JSX.Element>(<></>);

  const [TXT_Input, SetTXT_Input] = useState<JSX.Element>(<></>);

  let TXT_General = (
    <TextField
      onChange={(e) => setInputGeneral(e.target.value)}
      inputRef={textInput}
      label="Busqueda general"
      id="General"
      name="General"
      required
      fullWidth
    />
  );
  let TXT_Titulo = (
    <TextField
      onChange={(e) => setInputTitulo(e.target.value)}
      inputRef={textInput}
      label="Titulo"
      id="Titulo"
      name="Titulo"
      fullWidth
      // sx={{ m: 1, width: "80%" }}
    />
  );
  let TXT_Descripcion = (
    <TextField
      onChange={(e) => setInputDescripcion(e.target.value)}
      inputRef={textInput}
      label="Descripcion"
      id="Descripcion"
      name="Descripcion"
      fullWidth
      // sx={{ m: 1, width: "80%" }}
    />
  );
  let TXT_PalabrasClave = (
    <TextField
      onChange={(e) => setInputPalabrasClave(e.target.value)}
      inputRef={textInput}
      label="Buscar por palabras claves"
      id="Palabras Clave"
      placeholder="EJ. +Palabra1 +Palabra2 "
      name="Descripcion"
      fullWidth
      // sx={{ m: 1, width: "80%" }}
    />
  );

  const Buscar = async (e: any) => {
    try {
      e.preventDefault();
      console.log("Busco");
      const { data } = await axios({
        method: "post",
        baseURL: Dominio,
        url: "/busqueda/materiales",
        data: {
          Tipo: OpcionSelec?.ID,
          General: inputGeneral,
          Titulo: inputTitulo,
          Descripcion: inputDescripcion,
          PalabrasClave: inputPalabrasClave,
        },
      });
      // setPosts(data);
      setUpdater(data);
      console.log(data);
    } catch (error) {
      alert("Error");
      console.log(error);

      // setPosts([]);
    }
  };
  useEffect(() => {
    SetTXT_Input(TXT_General);
  }, []);
  useEffect(() => {
    console.log("Se acutalizo");
    // setUpdater(posts);
    // console.log(posts);
    for (let index = 0; index < Updater.length; index++) {
      Updater[index].Enumerador = index + 1;
    }

    if (Updater.length > 0) {
      SetLista(
        <Box>
          Numero de resultados: {Updater.length}
          {/* <ListaRenderer Data={Updater} /> */}
          <Paginador Data={Updater} />
        </Box>
      );
    } else {
      SetLista(
        <Box>
          No se encontraron resultados....
          {/* <ListaRenderer Data={Updater} /> */}
        </Box>
      );
    }
  }, [Updater]);
  useEffect(() => {
    if (OpcionSelec?.ID == 2) {
      SetTXT_Input(<></>);
      SetTXT_Input(TXT_Titulo);
    } else if (OpcionSelec?.ID == 3) {
      SetTXT_Input(<></>);

      SetTXT_Input(TXT_Descripcion);
    } else if (OpcionSelec?.ID == 4) {
      SetTXT_Input(<></>);

      SetTXT_Input(TXT_PalabrasClave);
    } else {
      SetTXT_Input(<></>);

      SetTXT_Input(TXT_General);
    }
  }, [OpcionSelec]);
  // useEffect(()=>{Buscar;},[])
  let Opciones = [
    { ID: 1, Opcion: "Busqueda General" },
    { ID: 2, Opcion: "Busqueda por titulo" },
    { ID: 3, Opcion: "Busqueda por descripcion" },
    { ID: 4, Opcion: "Busqueda por palabras Clave" },
  ];

  return (
    <Container>
      <Box
        component={"form"}
        sx={{ mt: 1 }}
        onSubmit={(e: any) => Buscar(e)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
          }}
        >
          {TXT_Input}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Autocomplete
              disablePortal
              id="CB-Opciones"
              options={Opciones}
              getOptionLabel={(option: any) => option.Opcion.toString()}
              defaultValue={Opciones[0]}
              isOptionEqualToValue={(option, value) => option.ID === value.ID}
              sx={{ width: "20rem", paddingInline: "0.5rem" }}
              onChange={(event, value: any) => {
                setOpcionesSelec(value);
                if (textInput.current != null) {
                  textInput.current.value = "";
                }
              }}
              renderInput={(params) => (
                <TextField {...params} required label="Opciones de busqueda" />
              )}
            />
            <Button type="submit" variant="contained">
              Buscar
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box margin={"auto"} alignItems="center">
        {Lista}
      </Box>
    </Container>
  );
}
type ListaBusqueda = {
  Data: Materiales[];
};
type PaginadorComodin = {
  Data: Array<any>;
  ComponenteRender?: JSX.Element;
};
function Paginador({ Data, ComponenteRender }: PaginadorComodin) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(Data.length / PER_PAGE);
  const _DATA = usePagination(Data, PER_PAGE);
  const handleChange = (e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Container>
      {" "}
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
     <List key={"hey"}><ListaRenderer Data={_DATA.currentData()} /></List> 
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Container>
  );
}
function ListaRenderer({ Data }: ListaBusqueda) {
  console.log("Lista:");
  console.log(Data);

  return (
    <>  
      {Data.map((post, index) => (
      <>
          <Divider />
          <ListItem                 key={post.Enumerador+ post.ID+ "item"}
>
            {post.Enumerador}

            <ListItemAvatar>
              <Avatar>
                <MaterialElemento tipo={post.TipoMaterial.Nombre_Tipo} />
              </Avatar>
            </ListItemAvatar>
            <MediaViewer
              Direccion={post.Direccion}
              Tipo={post.TipoMaterial.Nombre_Tipo}
            >
              <ListItemText
                sx={{ textAlign: "left" }}
                key={post.Enumerador+ post.ID+ "text"}
                primary={post.Titulo}
                secondary={post.Descripcion}
              />
            </MediaViewer>
          </ListItem>
          <Divider />
          </>
      ))}
        
    </>

  );
}

function BusquedaConEtiquetasa() {
  return (
    <Container>
      {/*BuscarTEXT*/}
      <Box></Box>
      <Container sx={{ width: "80%" }}></Container>
      {/* <Container sx={{ width: "80%" }}>
      <Pagination count={10} showFirstButton showLastButton />
      </Container> */}
    </Container>
  );
}

function LimitTags() {
  return (
    <Autocomplete
      multiple
      limitTags={5}
      id="Etiquetas"
      options={Etiquetas}
      getOptionLabel={(option) => option.title}
      defaultValue={[Etiquetas[0]]}
      renderInput={(params) => (
        <TextField {...params} label="Etiquetas" placeholder="tags" />
      )}
      sx={{ width: "50%" }}
    />
  );
}

const Etiquetas = [
  { title: "Ingenieria en software" },
  { title: "Geodesia" },
  { title: "Civil" },
];
