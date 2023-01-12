import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Dominio } from "../../API/API";
import { Seguimiento } from "../../API/Types/Tipos";

export function SeguimientoGeneral() {
  const { data } = useQuery("Seguimiento-General", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: "/monitoreo/general",
    });
    console.log(data);
    return data as Seguimiento[];
  });
  const [Datos, setDatos] = useState<Seguimiento[]>([]);
  //   /console.log(Datos[0].Usuario.Nombre)
  return (
    <div style={{ height: "40rem", width: "100%" }}>
      <DataGrid
        rows={(data as Seguimiento[]) || []}
        columns={columns}
        pageSize={50}
        getRowId={(row) => row.ID}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

const columns: GridColDef<Seguimiento>[] = [
  { field: "ID", headerName: "Identificado", flex: 1 },

  {
    field: "Usuario",
    headerName: "Usua",
    flex: 1,
    valueGetter: (params) => params.row.Usuario.Nombre,
  },
  { field: "RecursoID", headerName: "RecursoID", flex: 1 },
  {
    field: "Recurso",
    headerName: "Recurso",
    flex: 1,
    valueGetter: (params) => params.row.Recurso.Titulo,
  },
  {
    field: "Porcentaje",
    headerName: "Porcentaje",
    flex: 1,
    valueGetter: (params) => params.row.PorcentajeVisto.toFixed(2) + "%",
  },
  {
    field: "Tiempo",
    headerName: "Tiempo",
    flex: 1,
    valueGetter: (params) => params.row.TiempoVisto.toFixed(2) + " s",
  },

  { field: "RutaVista", headerName: "Ruta", flex: 1 },
  { field: "PrimerVisto", headerName: "Primer Visto", flex: 1 },
  { field: "UltimaVisto", headerName: "Ultimo Visto", flex: 1 },


];
