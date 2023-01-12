import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  TextField,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { Dominio } from "../../API/API";
import { UndefinedTokenToEmptyString } from "../../API/auth/auth";
import { useAppSelector } from "../../store/hooks";
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
import EditIcon from "@mui/icons-material/Edit";
import { ContenidoBloque, Grupo, Recurso } from "../../API/Types/Tipos";
import { InterfazEditMaterial } from "../ModalesAnadir/AdminCRUDModales/FlexibleEdit";
export function CambiarIcono({ IDGrupo }: { IDGrupo: number }): JSX.Element {
  let User = useAppSelector((state) => state.Token);
  const [image, setImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [open, setOpen] = useState(false);
  const Invalidar = useQueryClient();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const EditGrupo = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("archivo", selectedFile);

      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Grupo/Icono/${IDGrupo}`,
        data: formData,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as { Codigo: string };
    },
    onError: (error) => {
      alert(error);
      // I will fire firstuuu
    },
    onSuccess(data, variables, context) {
      alert("Se edito el Grupo");
      Invalidar.invalidateQueries({ queryKey: "Seguimiento-General" });
      handleClose();

      // window.location.reload();
    },
  });
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
  //sx={style}

  return (
    <div>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          Cambiar Imagen
        </Button>
      </Box>
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
          <Avatar
            sx={{ width: "15rem", height: "15rem", alignItems: "left" }}
            variant="rounded"
            alt="Preview"
            src={image || ""}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<ImageIcon></ImageIcon>}
          >
            Upload File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={onImageChange}
            />
          </Button>

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
export function EditGrupo({
  IDGrupo,
  Refresh = () => {},
  children,
}: {
  IDGrupo: number;
  Refresh?: Function;

  children: React.ReactNode;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();

    setOpen(true);
  };
  const handleClose = () => {
    Refresh();
    setOpen(false);
  };
  const { refetch } = useQuery(
    "GetFetchGrupo",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/grupo/VER/Grupo/${IDGrupo}`,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as Grupo;
    },
    {
      onSuccess(data) {
        SetNombre(data.Nombre);
        setDescripcion(data.Descripcion);
      },
    }
  );
  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");
  const EditGrupo = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Grupo/${IDGrupo}`,
        data: {
          Nombre: Nombre,
          Descripcion: Descripcion,
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
      alert("Se edito el Grupo");
      handleClose();

      // window.location.reload();
    },
  });
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
  //sx={style}

  return (
    <div>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </IconButton>
        {children}
      </Box>
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

export function EditGuia({
  children,
  IDGuia,
}: {
  children: React.ReactNode;
  IDGuia: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { refetch } = useQuery(
    "GetFetchGuia",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/grupo/VER/Guia/${IDGuia}`,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as Grupo;
    },
    {
      enabled: false,
      onSuccess(data) {
        SetNombre(data.Nombre);
      },
    }
  );
  const [Nombre, SetNombre] = useState<string>("");
  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Guia/${IDGuia}`,
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
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <div>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </IconButton>
        {children}
      </Box>
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
            label="Nombre de guia"
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

export function EditCurso({
  children,
  IDCurso,
}: {
  children: React.ReactNode;
  IDCurso: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { refetch } = useQuery(
    "GetFetchCurso",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/grupo/VER/Curso/${IDCurso}`,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as Grupo;
    },
    {
      enabled: false,
      onSuccess(data) {
        SetNombre(data.Nombre);
        setDescripcion(data.Descripcion);
      },
    }
  );
  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const Editar = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Curso/${IDCurso}`,
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
      Editar.mutate();

      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <div>
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </IconButton>
        {children}
      </Box>
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
            label="Nombre de Plantilla"
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

export function EditBloque({
  children,
  IDBloque,
}: {
  children: React.ReactNode;
  IDBloque: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { refetch } = useQuery(
    "GetFetchBloque",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/grupo/VER/Bloque/${IDBloque}`,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as Grupo;
    },
    {
      enabled: false,
      onSuccess(data) {
        SetNombre(data.Nombre);
        setDescripcion(data.Descripcion);
      },
    }
  );
  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Bloque/${IDBloque}`,
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
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </IconButton>
        {children}
      </Box>
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

export function EditContenido({
  children,
  IDContenido,
}: {
  children: React.ReactNode;
  IDContenido: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { refetch } = useQuery(
    "GetFetchBloque",
    async () => {
      const { data } = await axios({
        method: "get",
        baseURL: Dominio,
        url: `/grupo/VER/Contenido/${IDContenido}`,
        headers: {
          "x-access-token": UndefinedTokenToEmptyString(User.Token),
        },
      });
      return data as ContenidoBloque;
    },
    {
      enabled: false,
      onSuccess(data) {
        SetNombre(data.Titulo);
        setDescripcion(data.Descripcion || "");
      },
    }
  );

  const [Nombre, SetNombre] = useState<string>("");
  const [Descripcion, setDescripcion] = useState<string>("");

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "put",
        url: `/grupo/EDITAR/Contenido/${IDContenido}`,
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
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon color="primary" />
        </IconButton>
        {children}
      </Box>
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
export function EditMaterial({
  IDMaterial,
  children = <></>,
}: {
  IDMaterial: number;
  children?: JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    refetch();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { refetch } = useQuery(
    `EditMaterial-${IDMaterial}`,
    async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "get",
        url: `/archivo/recurso/${IDMaterial}`,

        // headers: {
        //   "x-access-token": UndefinedTokenToEmptyString(User.Token) ,
        // },
      });
      console.log(data);
      return data as Recurso;
    },
    {
      enabled: false,
      onSuccess(data) {
        setData(data);
      },
    }
  );
  const [Data, setData] = useState<Recurso | undefined>(undefined);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        {children}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
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
          <InterfazEditMaterial ID={IDMaterial} Datos={Data} />
          {/* {Interfaz} */}
        </Box>
      </Modal>
    </div>
  );
}
