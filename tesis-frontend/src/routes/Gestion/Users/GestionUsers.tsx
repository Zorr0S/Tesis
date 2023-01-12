import { Container, Divider, Typography } from "@mui/material";
import { TablaGestionUsers } from "../../../Components/Gestion/Users/TablaGestionUsers";

export function GestionUsers() {
  return (
    <Container>
      <Divider>
        <Typography variant="h2">Gestion de usuarios</Typography>
      </Divider>
      <TablaGestionUsers></TablaGestionUsers>
    </Container>
  );
}
