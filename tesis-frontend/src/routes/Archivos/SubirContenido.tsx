import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Fade,
  Input,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dominio } from "../../API/API";
import { Label } from "@mui/icons-material";
import { Subir_ArchivoAsociado, Subir_unico } from "../../Components/Subida_Archivos/Subir_Archivos";
import { InterfazSubirArchivoLibre } from "../../Components/REA/SubirArchivoLibre";
const theme = createTheme();

export default function SubidaDeArchivos() {
  return (
    <Stack>
      <InterfazSubirArchivoLibre></InterfazSubirArchivoLibre>
      {/* <Subir_ArchivoAsociado /> */}

      {/* <Subir_unico /> */}
    </Stack>
  );
}

