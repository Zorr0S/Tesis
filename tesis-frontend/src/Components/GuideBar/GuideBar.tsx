import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Dominio } from "../../API/API";
import { useAppSelector } from "../../store/hooks";
import { useMutation, useQuery } from "react-query";
import { Grupo } from "../../API/Types/Tipos";
import { IMGFallback } from "../../functions/functions";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
export function SuscribedGroupsBar() {
  let User = useAppSelector((state) => state.Token);
  const { data } = useQuery("GruposSuscritos", async () => {
    const { data } = await axios({
      baseURL: Dominio,
      method: "get",
      url: `/grupo/GruposSuscritos`,

      headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
    });
    console.log(data);
    return data as Grupo[];
  });
  if (User.Token == null) {
    return <></>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",

        alignItems: "center",
        //  overflow: "scroll",
        bgcolor: "background.paper",
        width: "100%",
        border: "2px solid #000",
        boxShadow: 24,
        mb: 2,

        overflowX: "auto",
      }}
    >
      <UnirseAGuia>
        <Stack>
          <Container>
            <AddCircleIcon sx={{ width: "7rem", height: "7rem" }} />
          </Container>

          <Container>
            Matricularse <br /> con un codigo
          </Container>
        </Stack>
      </UnirseAGuia>

      <IconoGuia Data={data as Grupo[]} />
    </Box>
  );
}

function UnirseAGuia({ children }: { children: any }) {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Respuesta, SetRespuesta] = useState<any>();

  const [CodigoGrupo, SetCodigoGrupo] = useState<string>("");
  const Suscribirse = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        method: "post",
        baseURL: Dominio,
        url: `/grupo/suscribe`,
        params: { Codigo: CodigoGrupo },
        headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Te has unido al grupo exitosamente");
      handleClose();
      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      Suscribirse.mutate();
    } catch (error) {
      console.log(error);
      alert("Error al subir los datos");
    }
  };
  //sx={style}

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => SetCodigoGrupo(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="Codigo"
            label="Codigo de acceso"
            name="Codigo"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Unirse
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

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

function IconoGuia({ Data }: { Data: Grupo[] }) {
  //component={RouterLink} to={`
  if (Data == null) {
    return <></>;
  }
  return (
    <>
      {Data.map((data, index) => (
        <Card
          key={`Carta-Grupo-${index}-${data.Codigo}`}
          sx={{
            display: "flex",
            width: "16rem",
            height: "18rem",
            border: "2px solid #000",
          }}
        >
          <CardActionArea component={RouterLink} to={`/Grupo/${data.Codigo}`}>
            <CardMedia
              component="img"
              sx={{
                // 16:9
                //   pt: '56.25%',
                width: "16rem",
                height: "14rem",
                // margin: "auto",
              }}
              image={IMGFallback(data.Icono)}
              alt="random"
            />
            <CardContent>
              <Typography gutterBottom>{data.Nombre}</Typography>
              <Typography>{data.Descripcion}</Typography>
            </CardContent>
            <CardActions></CardActions>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}
