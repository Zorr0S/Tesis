import { jsx } from "@emotion/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
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

import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Recurso, User } from "../../API/Types/Tipos";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { Dominio } from "../../API/API";
import { useConfirm } from "material-ui-confirm";
import { useAppSelector } from "../../store/hooks";

export function ModalMostrarMatricualados({
  Data,
  IDGrupo,
  children = <></>,
}: {
  Data: User[];
  IDGrupo: number;
  children?: JSX.Element;
}) {
  const [Fomulario, SetFomulario] = useState<JSX.Element>(<></>);

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
        >
          <TablaMatriculados data={Data} IDGrupo={IDGrupo} />
        </Box>
      </Modal>
    </div>
  );
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
function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function TablaMatriculados({
  data,
  IDGrupo,
}: {
  data: User[];
  IDGrupo: number;
}) {
  const columns: GridColDef<User>[] = [
    {
      field: "ID",
      renderCell: (params) => (
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
            alt={`${params.row.Nombre} ${params.row.Apellidos}`}
            src={params.row.Icono}
          />
        </Container>
      ),
    },

    {
      field: "Titulo",
      headerName: "Titulo",
      flex: 1,
      valueGetter: (params) => `${params.row.Nombre} ${params.row.Apellidos}`,
    },
    {
      field: "Numero_Cuenta",
      headerName: "Numero de Cuenta",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.row.Numero_Cuenta} color={"success"} />
      ),
    },

    {
      field: "Acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => (
        <ExpulsarAlumno IDAlumno={params.row.ID} IDGrupo={IDGrupo} />
      ),
    },
  ];
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
    <div style={{ height: "35rem", width: "100%" }}>
      <DataGrid
        disableColumnFilter
        density="comfortable"
        disableDensitySelector
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

function ExpulsarAlumno({
  IDGrupo,
  IDAlumno,
}: {
  IDGrupo: number;
  IDAlumno: number;
}): JSX.Element {
  let User = useAppSelector((state: { Token: any }) => state.Token);

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/${IDGrupo}/expulsar`,
        data: {
          AlumnoID: IDAlumno,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se expulso exitosamente");

      // window.location.reload();
    },
  });
  const confirm = useConfirm();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ title: "Esta seguro?" })
        .then(() => {
          AddGuia.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <Button onClick={handleSubmit}>
      <Chip label={"expulsar"} color={"error"} icon={<PersonRemoveIcon />} />
    </Button>
  );
}
// const Suscribirse = useMutation({
//   mutationFn: async () => {
//     const { data } = await axios({
//       method: "post",
//       baseURL: Dominio,
//       url: `/grupo/suscribe`,
//       params: { Codigo: CodigoGrupo },
//       headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
//     });
//     return data;
//   },
//   onError: (error) => {
//     alert(error);
//     // I will fire first
//   },
//   onSuccess(data, variables, context) {
//     alert("Te has unido al grupo exitosamente");
//     handleClose();
//     console.log(data);
//     // window.location.reload();
//   },
// });
