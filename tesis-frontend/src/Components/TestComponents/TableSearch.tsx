import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,

  GridValidRowModel,
} from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dominio } from "../../API/API";
import { Recurso } from "../../API/Types/Tipos";
import { Button } from "@mui/material";
import { MaterialElemento } from "../IconoVariable/IconoVariable";
import { EditMaterial } from "../ModalesAnadir/AdminCRUDModales/FlexibleEdit";
//import { createStyles, createTheme, makeStyles } from "@mui/material/styles";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// const defaultTheme = createTheme();
// const useStyles = makeStyles(
//   (theme: any) =>
//     createStyles({
//       root: {
//         padding: theme.spacing(0.5, 0.5, 0),
//         justifyContent: "space-between",
//         display: "flex",
//         alignItems: "flex-start",
//         flexWrap: "wrap",
//       },
//       textField: {
//         [theme.breakpoints.down("xs")]: {
//           width: "100%",
//         },
//         margin: theme.spacing(1, 0.5, 1.5),
//         "& .MuiSvgIcon-root": {
//           marginRight: theme.spacing(0.5),
//         },
//         "& .MuiInput-underline:before": {
//           borderBottom: `1px solid ${theme.palette.divider}`,
//         },
//       },
//     }),
//   { defaultTheme }
// );
export function RenderMaterial() {
  const { data } = useQuery("GESTION-REA", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/recursos/MaterialesDisponibles",
      params: {
        ContenidoID: 1,
      },
    });
    console.log(data);
    return data as Recurso[];
  });
  if (data == undefined) return <></>;

  return <QuickFilteringGrid data={data} />;
}

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

export default function QuickFilteringGrid({ data }: { data: Recurso[] }) {
  const [selectedRows, setSelectedRows] = useState<GridValidRowModel[]>([]);

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<Recurso[]>(data);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
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
        getRowId={(row) => row.ID}
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows || []}
        columns={columns}
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = data.filter((row: any) =>
            selectedIDs.has(row.id)
          );

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
      <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedRows, null, 4)}
      </pre>
    </div>
  );
}
const columns: GridColDef<Recurso>[] = [
  { field: "ID", headerName: "Identificador", flex: 1 },

  {
    field: "Titulo",
    headerName: "Titulo",
    flex: 1,
    valueGetter: (params) => params.row.Titulo,
  },
  {
    field: "Descripcion",
    headerName: "Descripcion",
    flex: 1,
    valueGetter: (params) => params.row.Descripcion,
  },
  {
    field: "Tipo",
    headerName: "Tipo",
    flex: 1,
    valueGetter: (params) => params.row.TipoMaterial.Nombre_Tipo,
  },
  {
    field: "IconoTipo",
    headerName: "IconoTipo",
    flex: 1,
    //  valueGetter: (params) => params.row.TipoMaterial.Nombre_Tipo,
    renderCell: (params) => (
      <MaterialElemento
        tipo={params.row.TipoMaterial.Nombre_Tipo}
      ></MaterialElemento>
    ),
  },
  {
    field: "Acciones",
    headerName: "Acciones",
    flex: 1,
    renderCell: (params) => (
      <>
        {/* <IconButton>
          <FileUploadIcon />
        </IconButton> */}
        <EditMaterial MaterialID={params.row.ID} Data={params.row}>
          <EditIcon />
        </EditMaterial>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];
