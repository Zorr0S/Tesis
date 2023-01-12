import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Link as LinkMaterial } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Dominio } from "../../../API/API";
import { Grupo, Roles, User } from "../../../API/Types/Tipos";
import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import { useAppSelector } from "../../../store/hooks";
import { Box, Chip, Container } from "@mui/material";
import { ModalMostrarMatricualados } from "../../ModalesCRUDCursos/ModalMatriculados";
import { EditRolUSer } from "./ModalCambioRol";

//import { createStyles, createTheme, makeStyles } from "@mui/material/styles";

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export function TablaGestionUsers() {
  let User = useAppSelector((state) => state.Token);

  const { data } = useQuery("GESTION-Users", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/usuarios/ListUser",

      headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
    });
    console.log(data);
    return data as User[];
  });
  //if(data==undefined)return (<>Cargando</>)

  return <QuickFilteringGrid data={data as User[]} />;
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

export default function QuickFilteringGrid({ data }: { data: User[] }) {
  const [selectedRows, setSelectedRows] = useState<GridValidRowModel[]>([]);

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<User[]>(data);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        if (
          field == "Nombre" ||
          field == "Apellidos" ||
          field == "Numero_Cuenta"
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
    <div style={{ height: 400, width: "100%" }}>
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
    </div>
  );
}
const columns: GridColDef<User>[] = [
  {
    field: "Usuario",
    headerName: "Usuario",
    flex: 0.4,

    renderCell(params) {
      return (
        <Chip
          avatar={<Avatar alt={"Icono"} src={params.row.Icono} />}
          label={`${params.row.Apellidos} ${params.row.Nombre}`}
          variant="outlined"
        />
      );
    },
  },
  {
    field: "Nombre",
    headerName: "Nombre",
    flex: 0.5,
    valueGetter(params) {
      return params.row.Nombre;
    },
  },
  {
    field: "Apellidos",
    headerName: "Apellidos",
    flex: 0.5,
    valueGetter(params) {
      return params.row.Apellidos;
    },
  },
  {
    field: "Genero",
    headerName: "Genero",
    flex: 0.3,
    valueGetter(params) {
      return params.row.Genero;
    },
  },
  {
    field: "Correo",
    headerName: "Correo",
    flex: 0.7,
    valueGetter(params) {
      return params.row.Correo;
    },
  },
  {
    field: "Rol",
    headerName: "Rol",
    flex: .7,
    renderCell(params) {
      return <IconoRolSelector ROL={params.row.Tipo_user || "INVITADO"} />;
    },
  },
  {
    field: "Cambiar",
    headerName: "Cambiar",
    flex: 1,
    renderCell(params) {
      return (
        <EditRolUSer
          RolDado={params.row.Tipo_user || "INVITADO"}
          IDUser={params.row.ID}
        ></EditRolUSer>
      );
    },
  },
];

function IconoRolSelector({ ROL }: { ROL: Roles }) {
  if (ROL == "ADMIN") {
    return (
      <Chip
        avatar={<AdminPanelSettingsIcon />}
        label={ROL}
        variant="outlined"
      />
    );
  } else if (ROL == "PROFESOR") {
    return (
      <Chip avatar={<SupervisorAccountIcon />} label={ROL} variant="outlined" />
    );
  } else if (ROL == "USER") {
    return <Chip avatar={<SchoolIcon />} label={ROL} variant="outlined" />;
  } else {
    return (
      <Chip avatar={<AccountCircleIcon />} label={ROL} variant="outlined" />
    );
  }
}
