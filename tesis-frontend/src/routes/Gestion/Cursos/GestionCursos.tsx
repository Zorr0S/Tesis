import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { TablaGestionGrupos } from "../../../Components/ViewAdministracion/Grupos/TablaAdminCursos";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddGrupo } from "../../../Components/ModalesCRUDCursos/ModalesCursosCrear";

export function GestionGrupos() {
  return (
    <Container
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Divider>
        <Typography variant="h3">Gestion de cursos y grupos</Typography>
      </Divider>

      <Divider></Divider>
      <Box sx={{ width: 1, flexDirection: "row", alignItems: "flex-start" }}>
        <AddGrupo>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleIcon />}
          >
            Crear grupo
          </Button>
        </AddGrupo>
      </Box>

      <TablaGestionGrupos />
    </Container>
  );
}
