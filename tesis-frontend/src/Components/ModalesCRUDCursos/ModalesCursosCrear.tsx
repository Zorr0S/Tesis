import { Button, Modal, Box, TextField } from "@mui/material";
import axios from "axios";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { useAppSelector } from "../../store/hooks";
import { InterfazSubirArchivo } from "./UploadFile";
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
export function AddGrupo({
  children
}:{
  children: React.ReactNode
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);
  const Redirect = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("")
  const [NombreGuia, setNombreGuia] = useState<string>("")
  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Grupo`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
          Guia: {
            GuiaNombre: NombreGuia
          }
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as {Codigo:string};
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo un nuevo Grupo");
      Redirect(`/Gestion/Grupo/Admin/${data.Codigo}`)
      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      AddGuia.mutate();
      handleClose();
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <TextField
            onChange={(e) => SetNombre(e.target.value)}
            value={Nombre}
            margin="normal"
            required
            fullWidth
            id="Grupo"
            label="Nombre del Grupo"
            placeholder="Nombre de..."
            name="Grupo"
          />
           <TextField
            onChange={(e) => setDescripcion(e.target.value)}
            value={Descripcion}
            margin="normal"
            required
            fullWidth
            id="Descripcion"
            label="Descripcion de guia"
            placeholder="Descripcion de..."
            name="Descripcion"
          />
           <TextField
            onChange={(e) => setNombreGuia(e.target.value)}
            value={NombreGuia}
            margin="normal"
            required
            fullWidth
            id="Nombre de guia del grupo"
            label="Nombre de guia del grupo"
            placeholder="Nombre de guia..."
            name="Nombre de guia del grupo"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export function AddGuia({
  children,
  GrupoID,
}: {
  children: JSX.Element;
  GrupoID: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Guia/${GrupoID}`,
        data: {
          Nombre: Nombre,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo una nueva tematica");

      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      AddGuia.mutate();
      handleClose();
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <TextField
            onChange={(e) => SetNombre(e.target.value)}
            value={Nombre}
            margin="normal"
            required
            fullWidth
            id="Guia"
            label="Nombre de tematica"
            placeholder="Nombre de..."
            name="Carrera"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export function AddCurso({
  children,
  GuiaID,
}: {
  children: JSX.Element;
  GuiaID: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Curso/${GuiaID}`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo una nueva guia");
      handleClose();

      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      AddGuia.mutate();

      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <TextField
            onChange={(e) => SetNombre(e.target.value)}
            value={Nombre}
            margin="normal"
            required
            fullWidth
            id="Guia"
            label="Nombre de Unidad"
            placeholder="Nombre de..."
            name="Carrera"
          />
          <TextField
            onChange={(e) => setDescripcion(e.target.value)}
            value={Descripcion}
            margin="normal"
            required
            fullWidth
            id="Descripcion"
            label="Descripcion"
            placeholder="Plantilla de..."
            name="Carrera"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
export function AddBloque({
  children,
  CursoID,
}: {
  children: JSX.Element;
  CursoID: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Bloque/${CursoID}`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo una nueva guia");
      handleClose();

      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      AddGuia.mutate();

      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <TextField
            onChange={(e) => SetNombre(e.target.value)}
            value={Nombre}
            margin="normal"
            required
            fullWidth
            id="Guia"
            label="Nombre de bloque"
            placeholder="Nombre bloque..."
            name="Carrera"
          />
          <TextField
            onChange={(e) => setDescripcion(e.target.value)}
            value={Descripcion}
            margin="normal"
            required
            fullWidth
            id="Descripcion"
            label="Descripcion"
            placeholder="Bloque relacionado a..."
            name="Carrera"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export function AddContenido({
  children,
  BloqueID,
}: {
  children: JSX.Element;
  BloqueID: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Contenido/${BloqueID}`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo una nueva guia");
      handleClose();

      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      AddGuia.mutate();

      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={style}
          component={"form"}
          onSubmit={(e: any) => handleSubmit(e)}
        >
          <TextField
            onChange={(e) => SetNombre(e.target.value)}
            value={Nombre}
            margin="normal"
            required
            fullWidth
            id="Guia"
            label="Nombre de Subtema"
            placeholder="Nombre Subtema..."
            name="Carrera"
          />
          <TextField
            onChange={(e) => setDescripcion(e.target.value)}
            value={Descripcion}
            margin="normal"
            required
            fullWidth
            id="Descripcion"
            label="Descripcion"
            placeholder="Subtema relacionado a..."
            name="Carrera"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Subir
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export function AddCursoMaterial({
  children,
  ContenidoID,
}: {
  children: JSX.Element;
  ContenidoID: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "post",
        url: `/grupo/CREAR/Contenido/${ContenidoID}`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
        },
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data;
    },
    onError: (error) => {
      alert(error);
      // I will fire first
    },
    onSuccess(data, variables, context) {
      alert("Se creo una nueva guia");
      handleClose();

      console.log(data);
      // window.location.reload();
    },
  });
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
     // AddGuia.mutate();

      //  location.reload();
    } catch (error) {
      console.log(error);
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
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxheight: "90%",
            width: "80%",
            height: "95%",
            overflow: "scroll",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          <InterfazSubirArchivo ContenidoID={ContenidoID}></InterfazSubirArchivo>
        </Box>
      </Modal>
    </div>
  );
}
