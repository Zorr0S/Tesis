import { Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PersmisonRender } from "../../PermisonRedirect/PermisonRedirect";

export function SeguimientoButton({ CodigoGrupo }: { CodigoGrupo: string }) {
  if (CodigoGrupo == null) {
    return <>cargando...</>;
  }
  let LinkString: string = `/Grupo/${CodigoGrupo}/Seguimiento`;
  let Redirect = useNavigate();

  return (
      <Button
        onClick={() => Redirect(LinkString)}
        variant="contained"
        size="large"
        color="success"
      >
        Desempeño
      </Button>
  );
}
