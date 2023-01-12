import { Box, Button, Container, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { createRef, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 0.9,
  height: 0.9,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};
export function Pruebas() {
  return (
    <MediaViewer
      Direccion="https://cdn.discordapp.com/attachments/760161304513609761/945116284478189588/Screenshot_20220220-173429.png"
      Tipo="Imagen"
    >
      Hola
    </MediaViewer>
  );
}
type MediaViw = {
  children: any;
  Direccion: string;
  Tipo: string;
};
export default function MediaViewer({ children, Direccion, Tipo }: MediaViw) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Cerro");
    setOpen(false);
  };

  //Selector de vista de medios
  function MediaSelector({ Direccion, Tipo }: MediaSel) {
    if (Tipo === "Documento") {
      return <MediaPDF Direccion={Direccion} />;
    } else if (Tipo === "Imagen") {
      return <MediaIMG Direccion={Direccion} />;
    } else if (Tipo === "Video") {
      return <MediaVideo Direccion={Direccion} />;
    } else if (Tipo === "Audio") {
      return <MediaAudio Direccion={Direccion} />;
    }
    return (
      <>
        <MediaDescarte Direccion={Direccion} />
      </>
    );
  }

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <MediaSelector Tipo={Tipo} Direccion={Direccion} />
        </Container>
      </Modal>
    </div>
  );
}
type Media = {
  Direccion: string;
  Token?: string;
};
type MediaSel = {
  Direccion: string;
  Tipo: string;
};

function MediaPDF(props: Media) {
    const User = useAppSelector((state) => state.Token);
  let RutaURL = useLocation().pathname;

  const Seguir = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        method: "PUT",
        baseURL: Dominio,
        url: "/usuarios/seguimiento",
        data: { RecursoURL: props.Direccion, Ruta: RutaURL },
        headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
      });
      return data;
    },
  });

  useEffect(() => {
    Seguir.mutate();
  }, []);
  return <object data={props.Direccion} width="100%" height="100%"></object>;
}

function MediaIMG({ Direccion }: Media) {
  const User = useAppSelector((state) => state.Token);
  let RutaURL = useLocation().pathname;

  const Seguir = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        method: "PUT",
        baseURL: Dominio,
        url: "/usuarios/seguimiento",
        data: { RecursoURL: Direccion, Ruta: RutaURL },
        headers: { "x-access-token": UndefinedTokenToEmptyString(User.Token) },
      });
      return data;
    },
  });

  useEffect(() => {
    Seguir.mutate();
  }, []);
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //  bgcolor: "lawngreen",
      }}
    >
      <img src={Direccion}></img>
    </Box>
  );
}
function MediaAudio({ Direccion }: Media) {
  const Prueba = useRef<ReactPlayer>(null);
  let RutaURL = useLocation().pathname;
  const User = useAppSelector((state) => state.Token);
  const SeguirVideo = useMutation({
    mutationFn: async ({
      Direccion,
      Ruta,
      Tiempo,
      Porcentaje,
      Token,
    }: {
      Direccion: string;
      Tiempo: number;
      Porcentaje: number;
      Token: string;
      Ruta: string;
    }) => {
      const { data } = await axios({
        method: "PUT",
        baseURL: Dominio,
        url: "/usuarios/seguimiento",
        data: {
          RecursoURL: Direccion,
          Ruta: Ruta,
          Tiempo: Tiempo,
          Porcentaje: Porcentaje,
        },
        headers: { "x-access-token": UndefinedTokenToEmptyString(Token) },
      });
      return data;
    },
  });
  function StampTimer(
    Estado: EstadoAux,
    Direccion: string,
    Token: string,
    Ruta: string
  ) {
    for (let index = 1; index <= 20; index++) {
      let Visto = (1 / 20) * index;

      if (Estado.played >= Visto) {
        console.log(
          `Pocentaje ${Estado.played} Supero el ` + Visto * 100 + "%"
        );
        ActualizarSeguimiento(
          Direccion,
          Estado.playedSeconds,
          Estado.played,
          Token,
          Ruta
        );
      }
    }
  }

  function ActualizarSeguimiento(
    Direccion: string,
    Tiempo: number,
    Porcentaje: number,
    Token: string,
    Ruta: string
  ) {
    try {
      if (Token.length > 0)
        SeguirVideo.mutate({ Direccion, Tiempo, Porcentaje, Token, Ruta });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //bgcolor: "lawngreen",
      }}
    >
      <ReactPlayer
        ref={Prueba}
        muted
        url={Direccion}
        onProgress={(state) => {
          StampTimer(state, Direccion, User.Token, RutaURL);
        }}
        controls={true}
      />

      {}
    </Box>
  );
}

function MediaVideo({ Direccion }: Media) {
  const Prueba = useRef<ReactPlayer>(null);
  let RutaURL = useLocation().pathname;
  const User = useAppSelector((state) => state.Token);
  const SeguirVideo = useMutation({
    mutationFn: async ({
      Direccion,
      Ruta,
      Tiempo,
      Porcentaje,
      Token,
    }: {
      Direccion: string;
      Tiempo: number;
      Porcentaje: number;
      Token: string;
      Ruta: string;
    }) => {
      const { data } = await axios({
        method: "PUT",
        baseURL: Dominio,
        url: "/usuarios/seguimiento",
        data: {
          RecursoURL: Direccion,
          Ruta: Ruta,
          Tiempo: Tiempo,
          Porcentaje: Porcentaje,
        },
        headers: { "x-access-token": UndefinedTokenToEmptyString(Token) },
      });
      return data;
    },
  });
  function StampTimer(
    Estado: EstadoAux,
    Direccion: string,
    Token: string,
    Ruta: string
  ) {
    for (let index = 1; index <= 20; index++) {
      let Visto = (1 / 20) * index;

      if (Estado.played >= Visto) {
        console.log(
          `Pocentaje ${Estado.played} Supero el ` + Visto * 100 + "%"
        );
        ActualizarSeguimiento(
          Direccion,
          Estado.playedSeconds,
          Estado.played,
          Token,
          Ruta
        );
      }
    }
  }

  function ActualizarSeguimiento(
    Direccion: string,
    Tiempo: number,
    Porcentaje: number,
    Token: string,
    Ruta: string
  ) {
    try {
      if (Token.length > 0)
        SeguirVideo.mutate({ Direccion, Tiempo, Porcentaje, Token, Ruta });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //   bgcolor: "lawngreen",
      }}
    >
      <ReactPlayer
        ref={Prueba}
        muted
        url={Direccion}
        onProgress={(state) => {
          StampTimer(state, Direccion, User.Token, RutaURL);
        }}
        controls={true}
      />

      {}
    </Box>
  );
}
function MediaDescarte({ Direccion }: Media) {
  return <>{window.open(Direccion, "_blank")}</>;
}
type EstadoAux = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
};
