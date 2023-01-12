import { Container, Divider, Typography } from "@mui/material";
import { TablaGestionREA } from "../../../Components/REA/REAComponentes/GestionREA";
import { TablaGestionREAPersonal } from "../../../Components/REA/REAComponentes/REAPersonal";

export function GestionPersonalREA() {
  return (
    <Container>
      <Divider>
        <Typography variant="h3"> Gestiona tus REA(s)</Typography>
      </Divider>

      <br></br>
      <Divider></Divider>
      <TablaGestionREAPersonal />
    </Container>
  );
}
