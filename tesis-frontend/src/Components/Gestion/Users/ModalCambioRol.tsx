import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Dominio } from "../../../API/API";
import { UndefinedTokenToEmptyString } from "../../../API/auth/auth";
import { Roles, User } from "../../../API/Types/Tipos";
import { Jeraquia } from "../../../functions/functions";
import { useAppSelector } from "../../../store/hooks";
import { Container } from "@mui/system";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxheight: "90%",
  width: "auto",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
export function EditRolUSer({
  RolDado,
  IDUser,
}: {
  RolDado: Roles;
  IDUser: number;
}) {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [RolUser, setRolUser] = useState<Roles>(RolDado);
  const EditGrupo = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/usuarios/cambiarRol`,
        data: {
          UserID: IDUser,
          RolNuevo: RolUser,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as { Codigo: string };
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se cambio el rol al usuario");
      handleClose();

      // window.location.reload();
    },
  });
  const RolesDeUsuarios: { Rol: Roles; ID: number }[] = [
    { Rol: "ADMIN", ID: 0 },
    { Rol: "PROFESOR", ID: 1 },
    { Rol: "USER", ID: 2 },
    { Rol: "INVITADO", ID: 3 },
  ];
  const RolDefault = RolesDeUsuarios.filter((value) => value.Rol == RolDado);
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      EditGrupo.mutate();
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" startIcon={<EditIcon />}>
        Cambiar Rol
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
          sx={style}
        >
          <Container>
            <Typography>Cambiar rol a usuario</Typography>
            <br/>
          <Autocomplete
            disablePortal
            id="CB-ROL"
            options={RolesDeUsuarios}
            defaultValue={RolDefault[0]}
            getOptionLabel={(option) => option.Rol.toString()}
            isOptionEqualToValue={(option, value) => option.ID === value.ID}
            sx={{ width: "10rem", paddingInline: "0.5rem" }}
            onChange={(event, value) => {
              setRolUser(value?.Rol || RolDado);
            }}
            renderInput={(params) => (
              <TextField {...params} required label="Rol de usuario" />
            )}
          />
          {/* {Interfaz} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cambiar
          </Button>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
