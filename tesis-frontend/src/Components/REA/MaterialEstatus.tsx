import { Chip } from "@mui/material";
import { Seguimiento } from "../../API/Types/Tipos";

export function MaterialEstatus({ Data }: { Data: Seguimiento[] }) {
    if (Data == undefined) {
      return <>undefined</>;
    }
    if (Data.length < 1) {
      return <></>;
    }
    return (
      <>
        {Data.map((data, index) => (
          <Chip
            label={`${(data?.PorcentajeVisto).toFixed(2)} %`}
            color="success"
          />
        ))}
      </>
    );
  }