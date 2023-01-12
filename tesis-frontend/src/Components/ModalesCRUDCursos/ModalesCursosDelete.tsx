import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import { useConfirm } from "material-ui-confirm";

// export function EditGrupo({
//   IDGrupo,
//   Refresh = () => {},
//   children,
// }: {
//   IDGrupo: number;
//   Refresh?: Function;

//   children: React.ReactNode;
// }): JSX.Element {
//   let User = useAppSelector((state) => state.Token);

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     refetch();

//     setOpen(true);
//   };
//   const handleClose = () => {
//     Refresh();
//     setOpen(false);
//   };
//   const { refetch } = useQuery(
//     "GetFetchGrupo",
//     async () => {
//       const { data } = await axios({
//         method: "get",
//         baseURL: Dominio,
//         url: `/grupo/VER/Grupo/${IDGrupo}`,
//         headers: {
//           "x-access-token": UndefinedTokenToEmptyString(User.Token),
//         },
//       });
//       return data as Grupo;
//     },
//     {
//       onSuccess(data) {
//         SetNombre(data.Nombre);
//         setDescripcion(data.Descripcion);
//       },
//     }
//   );
//   const [Nombre, SetNombre] = useState<string>("");
//   const [Descripcion, setDescripcion] = useState<string>("");
//   const EditGrupo = useMutation({
//     mutationFn: async () => {
//       const { data } = await axios({
//         baseURL: Dominio,
//         method: "put",
//         url: `/grupo/EDITAR/Grupo/${IDGrupo}`,
//         data: {
//           Nombre: Nombre,
//           Descripcion: Descripcion,
//         },
//         headers: {
//           "x-access-token": UndefinedTokenToEmptyString(User.Token),
//         },
//       });
//       return data as { Codigo: string };
//     },
//     onError: (error) => {
//       alert(error);
//       // I will fire first
//     },
//     onSuccess(data, variables, context) {
//       alert("Se edito el Grupo");
//       // window.location.reload();
//     },
//   });
//   const handleSubmit = async (e: any) => {
//     try {
//       e.preventDefault();
//       EditGrupo.mutate();
//       handleClose();
//       return false;
//       //  location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //sx={style}

//   return (
//     <div>
//       <Box
//         component={"div"}
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "left",
//         }}
//       >
//         <IconButton onClick={handleOpen}>
//           <EditIcon color="primary" />
//         </IconButton>
//         {children}
//       </Box>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={style}
//           component={"form"}
//           onSubmit={(e: any) => handleSubmit(e)}
//         >
//           <TextField
//             onChange={(e) => SetNombre(e.target.value)}
//             value={Nombre}
//             margin="normal"
//             required
//             fullWidth
//             id="Grupo"
//             label="Nombre del Grupo"
//             placeholder="Nombre de..."
//             name="Grupo"
//           />
//           <TextField
//             onChange={(e) => setDescripcion(e.target.value)}
//             value={Descripcion}
//             margin="normal"
//             required
//             fullWidth
//             id="Descripcion"
//             label="Descripcion de guia"
//             placeholder="Descripcion de..."
//             name="Descripcion"
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Subir
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

export function DeleteGrupo({ IDGrupo }: { IDGrupo: number }): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "delete",
        url: `/grupo/BORRAR/Grupo/${IDGrupo}`,

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
      alert("Se borro exitosamente");

      // window.location.reload();
    },
  });
  const confirm = useConfirm();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ description: "Esta accion es permanente" })
        .then(() => {
          AddGuia.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <IconButton
      color="error"
      onClick={handleSubmit}
    >
      <DeleteForeverIcon />
    </IconButton>
  );
}

export function DeleteGuia({ IDGuia }: { IDGuia: number }): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "delete",
        url: `/grupo/BORRAR/Guia/${IDGuia}`,

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
      alert("Se borro exitosamente");

      // window.location.reload();
    },
  });
  const confirm = useConfirm();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ description: "Esta accion es permanente" })
        .then(() => {
          AddGuia.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;
      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <Button
      startIcon={<DeleteForeverIcon />}
      variant="contained"
      color="error"
      onClick={handleSubmit}
    >
      Borrar guia
    </Button>
  );
}

export function DeleteCurso({ IDCurso }: { IDCurso: number }): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const Editar = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "delete",
        url: `/grupo/BORRAR/Curso/${IDCurso}`,

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
      alert("Se borro exitosamente");

      console.log(data);
      // window.location.reload();
    },
  });
  const confirm = useConfirm();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ description: "Esta accion es permanente" })
        .then(() => {
          Editar.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;

      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <Button
    sx={{height:.5}}
      startIcon={<DeleteForeverIcon />}
      variant="contained"
      color="error"
      onClick={handleSubmit}
    >
      Borrar
    </Button>
  );
}

export function DeleteBloque({ IDBloque }: { IDBloque: number }): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "delete",
        url: `/grupo/BORRAR/Bloque/${IDBloque}`,

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
      alert("Se borro exitosamente");

      console.log(data);
      // window.location.reload();
    },
  });
  const confirm = useConfirm();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ description: "Esta accion es permanente" })
        .then(() => {
          AddGuia.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;

      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <Button
      startIcon={<DeleteForeverIcon />}
      variant="contained"
      color="error"
      onClick={handleSubmit}
    >
      Borrar
    </Button>
  );
}

export function DeleteContenido({
  IDContenido,
}: {
  IDContenido: number;
}): JSX.Element {
  let User = useAppSelector((state) => state.Token);

  const AddGuia = useMutation({
    mutationFn: async () => {
      const { data } = await axios({
        baseURL: Dominio,
        method: "delete",
        url: `/grupo/BORRAR/Contenido/${IDContenido}`,

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
      alert("Se borro exitosamente");

      console.log(data);
      // window.location.reload();
    },
  });
  const confirm = useConfirm();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      confirm({ description: "Esta accion es permanente" })
        .then(() => {
          AddGuia.mutate();
        })
        .catch(() => {
          /* ... */
        });
      return false;

      //  location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //sx={style}

  return (
    <Button
      startIcon={<DeleteForeverIcon />}
      variant="contained"
      color="error"
      onClick={handleSubmit}
    >
      Borrar
    </Button>
  );
}
