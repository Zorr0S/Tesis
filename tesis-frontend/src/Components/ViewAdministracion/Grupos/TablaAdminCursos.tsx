import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Link as LinkMaterial } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dominio } from "../../../API/API";
import { Grupo } from "../../../API/Types/Tipos";
import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import { useAppSelector } from "../../../store/hooks";
import { Box, Chip, Container } from "@mui/material";
import { ModalMostrarMatricualados } from "../../ModalesCRUDCursos/ModalMatriculados";
import { DeleteGrupo } from "../../ModalesCRUDCursos/ModalesCursosDelete";
import { PanoramaSharp } from "@mui/icons-material";

//import { createStyles, createTheme, makeStyles } from "@mui/material/styles";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function TablaGestionGrupos() {
  let User = useAppSelector((state) => state.Token);

  const { data } = useQuery("GESTION-Grupos", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/grupo/mygrupos",
      params: {
        ContenidoID: 1,
      },
      headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
    });
    console.log(data);
    return data as Grupo[];
  });
  //if(data==undefined)return (<>Cargando</>)

  return <QuickFilteringGrid data={data as Grupo[]} />;
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

export default function QuickFilteringGrid({ data }: { data: Grupo[] }) {
  const [selectedRows, setSelectedRows] = useState<GridValidRowModel[]>([]);

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<Grupo[]>(data);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        if (
          field == "Nombre" ||
          field == "Descripcion"
          // ||          field == "PalabrasClave"
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
    <Box sx={{height:400,width:1}}>
      Tus Grupos:
      <DataGrid
        disableColumnFilter
        disableDensitySelector
        density="comfortable"
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
      {/* <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedRows, null, 4)}
      </pre> */}
    </Box>
  );
}
const columns: GridColDef<Grupo>[] = [
  {
    field: "Icono",
    headerName: "Icono",
    flex: 0.8,

    renderCell(params) {
      return (
        <Container>
          <Box
            component="img"
            sx={{
              height: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            alt="The house from the offer."
            src={params.row.Icono}
          />
        </Container>
      );
    },
  },
  {
    field: "Titulo",
    headerName: "Titulo",
    flex: 1,
    valueGetter: (params) => params.row.Nombre,
  },
  {
    field: "Descripcion",
    headerName: "Descripcion",
    flex: 1,
    valueGetter: (params) => params.row.Descripcion,
  },
  {
    field: "Codigo",
    headerName: "Codigo",
    flex: 1,
    valueGetter: (params) => params.row.Codigo,
  },
  {
    field: "Matriculados",
    headerName: "Matriculados",
    flex: 1,
    renderCell(params) {
      return (
        <ModalMostrarMatricualados
          Data={params.row.Matriculados}
          IDGrupo={params.row.ID}
        >
          <Chip label={"Matriculados"} color={"success"} />
        </ModalMostrarMatricualados>
      );
    },
  },
  {
    field: "Monitoreo",
    headerName: "Monitoreo",
    flex: 1,
    renderCell(params) {
      return <RedirecToSeguimiento Codigo={params.row.Codigo} />;
    },
  },
  {
    field: "Acciones",
    headerName: "Acciones",
    flex: 1,
    renderCell(params) {
      return (
        <Container>
          <LinkMaterial
            color="inherit"
            underline="none"
            component={RouterLink}
            to={`/Gestion/Grupo/Admin/${params.row.Codigo}`}
          >
            <EditIcon color="action" />
          </LinkMaterial>

          <DeleteGrupo IDGrupo={params.row.ID} />
        </Container>
      );
    },
  },
];

function RedirecToSeguimiento({ Codigo }: { Codigo: string }) {
  const Redirect = useNavigate();

  function handleSubmit() {
    Redirect(`/Grupo/${Codigo}/Seguimiento`);
  }
  return (
    <Button onClick={handleSubmit}>
      <Chip
        label={"Monitereo"}
        //  color={"success"}
        icon={<ScreenSearchDesktopIcon />}
      />
    </Button>
  );
}
