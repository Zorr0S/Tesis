import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { Box, Button, Modal, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Dominio } from "../../API/API";
import { Recurso } from "../../API/Types/Tipos";
import { MaterialElemento } from "../IconoVariable/IconoVariable";
import MediaViewer from "../MediaViewer/MediaViewer";

 function RenderAsociarAMateria({
  ContenidoID,
}: {
  ContenidoID: number;
}) {
  const {
    data: dataContenido,
    error: errorContenido,
    isLoading: isLoadingContenido,
    isSuccess: isSuccessContenido,
  } = useQuery("Material-asociado", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/recursos/MaterialesContenido",
      params: {
        ContenidoID: ContenidoID,
      },
    });
    console.log(data);
    return data as Recurso[];
  });
  const {
    data,

    error,
    isLoading,
    isSuccess,
  } = useQuery("Materiales-General", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/recursos/MaterialesDisponibles",
      params: {
        ContenidoID: 1,
      },
    });
    return data as Recurso[];
  });

  if (dataContenido == undefined) return <>undefined</>;
  if (isLoadingContenido) return <>cargando</>;

  if (isSuccess == true && isSuccessContenido == true) {
    return (
      <Tabla
        data={data}
        iniciadores={dataContenido}
        ContenidoID={ContenidoID}
      />
    );
  } else {
    return <>cargando...</>;
  }
}

function Tabla({
  data,
  iniciadores,
  ContenidoID,
}: {
  data: Recurso[];
  iniciadores: Recurso[];
  ContenidoID: number;
}) {
  const Asociar = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/recursos/ascociar/material/${ContenidoID}`,
        data: {
          Recursos: TransformarSelection(selectedRows as Recurso[]),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
        alert("se logro asociar los recurso");
        console.log(data)
        // window.location.reload(); 
    },
  });
  //Texto a buscar
  const [searchText, setSearchText] = useState("");

  ///Datos de la tabla
  const [Rows, setRows] = useState<Recurso[]>(data);
  //Datos seleccionados al iniciar
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>(() =>
    iniciadores.map((r) => r.ID)
  );
  //datos seleccionados por usuarios
  const [selectedRows, setSelectedRows] = useState<GridValidRowModel>([]);

  //Funcion de busqueda
  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      /// return searchRegex.test(row.PalabrasClavetoString());

      return Object.keys(row).some((field) => {
        if (
          field == "Titulo" ||
          field == "Descripcion" ||
          field == "PalabrasClave"
        )
          return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };
  useEffect(() => {
    setRows(data);
  }, [data]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        checkboxSelection
        getRowId={(row) => row.ID}
        rows={Rows || []}
        columns={columns}
        components={{ Toolbar: QuickSearchToolbar }}
        selectionModel={selectionModel}
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
          const selectedIDs = new Set(ids);
          const selectedRows = data.filter((row) => selectedIDs.has(row.ID));

          setSelectedRows(selectedRows);
        }}
        componentsProps={{
          toolbar: {
            value: searchText,

            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
      <Button
        onClick={() => {
          Asociar.mutate();
        }}
        variant="contained"
        size="large"
        color="success"
      >
        Link Recursos seleccionado
      </Button>
      {/* <pre style={{ fontSize: 10 }}>
        {JSON.stringify(
          selectedRows.map((r: any) => r.ID),
          null,
          4
        )}
      </pre> */}
    </div>
  );
}
function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function TransformarSelection(arreglo: Array<Recurso>) {
  let aux: Array<{ ID: number }> = [];
  arreglo.forEach((element) => {
    aux.push({ ID: element.ID });
  });
  return aux;
}
const columns: GridColDef<Recurso>[] = [
  { field: "ID", headerName: "Identificador", flex: .5 },
  {
    field: "IconoTipo",
    headerName: "Recurso",
    flex: 1,
    //  valueGetter: (params) => params.row.TipoMaterial.Nombre_Tipo,
    renderCell: (params) => (
      <MediaViewer
        Direccion={params.row.Direccion}
        Tipo={params.row.TipoMaterial.Nombre_Tipo}
      >
        <MaterialElemento
          tipo={params.row.TipoMaterial.Nombre_Tipo}
        ></MaterialElemento>
        {params.row.Titulo}
      </MediaViewer>
    ),
  },
  // {
  //   field: "Titulo",
  //   headerName: "Titulo",
  //   flex: 1,
  //   valueGetter: (params) => params.row.Titulo,
  // },
  {
    field: "Descripcion",
    headerName: "Descripcion",
    flex: 1,
    valueGetter: (params) => params.row.Descripcion,
  },
  {
    field: "Palabras",
    headerName: "Palabras clave",
    flex: 1,
    valueGetter: (params) => params.row.PalabrasClave,
  },
];
interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  return (
    <div>
    
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Buscar.."
        //className={classes.textField}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxheight: "90%",
  width: .95,
  height:  .98,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
export function LinkMaterialToMateria({
  children,
  ContenidoID,
}: {
  ContenidoID: number;
  children: JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
       
        {children}
        <Button onClick={handleOpen}>
          <AttachFileIcon />
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={`modal-modal-title-${ContenidoID}`}
        aria-describedby={`modal-modal-description-${ContenidoID}`}
      >
        <Box sx={style}>
          <RenderAsociarAMateria ContenidoID={ContenidoID} />
        </Box>
      </Modal>
    </div>
  );
}
