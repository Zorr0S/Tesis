import { Avatar, Chip, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { Grupo, Seguimiento } from "../../API/Types/Tipos";
import { useAppSelector } from "../../store/hooks";
import { MaterialElemento } from "../IconoVariable/IconoVariable";
import MediaViewer from "../MediaViewer/MediaViewer";

export function SeguimientoGrupo() {
  let { ID } = useParams();
  let User = useAppSelector((state) => state.Token);
  const { data: DatoGrupo } = useQuery("Grupo-Vista", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/grupo/",
      params: {
        Codigo: ID as string,
      },
    });
    return data as Grupo;
  });

  const { data, error, isLoading } = useQuery(
    "Seguimiento-General",
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: "/grupo/seguimiento",
        params: {
          Codigo: ID,
        },
        headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
      });
      console.log(data)
      return data as Seguimiento[];
    }
  );

  const [Datos, setDatos] = useState<Seguimiento[]>([]);

  //   /console.log(Datos[0].Usuario.Nombre)
  return (
    <Container style={{ height: "40rem" }}>
      <Typography variant="h3" component="div" gutterBottom>
        {DatoGrupo?.Nombre || ""}
        <Typography variant="h6" component="div" gutterBottom>
          Codigo:({DatoGrupo?.Codigo || ""})
        </Typography>
      </Typography>

      <DataGrid
      density="comfortable"
        rows={(data as Seguimiento[]) || []}
        columns={columns}
        pageSize={50}
        getRowId={(row) => row.ID}
        rowsPerPageOptions={[25]}
        disableSelectionOnClick
      />
    </Container>
  );
}

const columns: GridColDef<Seguimiento>[] = [
  {
    field: "Usuario",
    headerName: "Usuario",
    flex: 1,
    renderCell(params) {
      return (
        <Chip
          avatar={<Avatar alt={"Icono"} src={params.row.Usuario.Icono} />}
          label={`${params.row.Usuario.Apellidos} ${params.row.Usuario.Nombre}`}
          variant="outlined"
        />
      );
    },
  },

  {
    field: "Recurso",
    headerName: "Recurso",
    
    flex: 1.5,
    
    renderCell: (params) => (
      <MediaViewer
        Direccion={params.row.Recurso.Direccion}
        Tipo={params.row.Recurso.TipoMaterial.Nombre_Tipo}
      >
        <MaterialElemento
          tipo={params.row.Recurso.TipoMaterial.Nombre_Tipo}
        ></MaterialElemento>{params.row.Recurso.Titulo}
      </MediaViewer>
    ),
  },
  {
    field: "Porcentaje",
    headerName: "Porcentaje",
    flex: 0.6,
    valueGetter: (params) => params.row.PorcentajeVisto.toFixed(2) + "%",
  },
  {
    field: "Tiempo",
    headerName: "Tiempo",
    flex: 0.7,
    valueGetter: (params) => params.row.TiempoVisto.toFixed(2) + " s",
  },

  { field: "RutaVista", headerName: "Ruta", flex: 1 },
  {
    field: "PrimerVisto",
    headerName: "Primer Visto",
    flex: 1,
    renderCell(params) {
      return (
        format(parseISO(params.row.PrimerVisto), 'HH:mm \n yyyy-MM-dd  ')
      );
    },
    
  },
  {
    field: "UltimaVisto",
    headerName: "Ultimo Visto",
    flex: 1,
    renderCell(params) {
      return (
        format(parseISO(params.row.UltimaVisto), 'HH:mm \n yyyy-MM-dd  ')
      );
    },
  },
];
