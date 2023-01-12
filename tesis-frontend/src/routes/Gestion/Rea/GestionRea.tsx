import { Container, Divider, Typography } from "@mui/material";
import { TablaGestionREA } from "../../../Components/REA/REAComponentes/GestionREA";

export function GestionREA() {
  return (
    <Container>
      <Divider>
        <Typography variant="h3"> Gestion de REAS</Typography>
      </Divider>

      <br></br>
      <Divider></Divider>
      <TablaGestionREA />
    </Container>
  );
}
