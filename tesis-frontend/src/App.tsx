import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cabecera } from "./Components/Cabecera/Cabecera";
import Inicio from "./routes/Inicio/Inicio";

import { CarrerasMostrar } from "./routes/Carreras/Carreras";
import Login from "./routes/Sesion/Login";
import Register from "./routes/Sesion/Register";
import { Materia } from "./routes/Materia/Materia";
import SubidaDeArchivos from "./routes/Archivos/SubirContenido";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { BusquedaConEtiquetas } from "./Components/PlaceHolder/PlaceHolder";
import { PantallaAdmin } from "./routes/administracion/administracion";
import { AdminMateria } from "./Components/ViewAdministracion/ViewAdministracion";
import { SeguimientoGeneral } from "./routes/seguimiento/seguimiento";
import { Grupos } from "./routes/Grupos/Grupos";
import { SeguimientoGrupo } from "./Components/SeguimientoGrupo/SeguimientoGrupo";
import { Perfil } from "./routes/user/Perfil";
import GuestFooter from "./Components/footer/footerUas";

import { RenderMaterial } from "./Components/TestComponents/TableSearch";
import { AdminGrupos } from "./Components/ViewAdministracion/Grupos/AdminGrupo";
import { GestionGrupos } from "./routes/Gestion/Cursos/GestionCursos";
import { PersmisonRedirect } from "./Components/PermisonRedirect/PermisonRedirect";
import { MenuPopupState } from "./Components/MenuAccion/MenuButton";
import { GestionREA } from "./routes/Gestion/Rea/GestionRea";
import { GestionUsers } from "./routes/Gestion/Users/GestionUsers";
import { GestionPersonalREA } from "./routes/Gestion/TusREA/TusREA";
// import { APIBackend } from "./API/API";
const Data = { Facultad: 1, Carrera: 1, Plan: 1, Semestre: 1, Materia: 1 };
//let Default: UserInfo = { Token: ""};
//const Contexto = createContext<UserInfo>(Default);
//TODO:
//VideoPlayer no funciono con strict mode, checar nuevas actualizaciones
const Link =
  "http://localhost:3000/archivo/ver/0195d36d-0250-4492-9b0c-dc17cd0fa9d9-King Gizzard & The Lizard Wizard - O.N.E. (Official Video).mp4";
function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Box sx={{ width: 1, height: 1 }}>
          <BrowserRouter>
            <Cabecera />
            <Routes>
              {/* <Route path="/Facultad/:FacultadID/Carrera/:CarreraID/Plan/:PlanID/Semestre/:SemestreID/Materia/:MateriaID" element={<Hola/>}/> */}
              <Route path="/test" element={<MenuPopupState></MenuPopupState>} />
              <Route path="/test2" element={<RenderMaterial />} />
              <Route
                path="/Gestion/Users"
                element={
                  <PersmisonRedirect
                    Componente={<GestionUsers />}
                    RolNecesario="ADMIN"
                  />
                }
              />

              <Route
                path="/Gestion/REA"
                element={
                  <PersmisonRedirect
                    Componente={<GestionREA />}
                    RolNecesario="ADMIN"
                  />
                }
              />
              <Route
                path="/Gestion/TusRecursos"
                element={
                  <PersmisonRedirect
                    Componente={<GestionPersonalREA />}
                    RolNecesario="PROFESOR"
                  />
                }
              />
              <Route
                path="/Gestion/Grupo"
                element={
                  <PersmisonRedirect
                    Componente={<GestionGrupos />}
                    RolNecesario="PROFESOR"
                  />
                }
              />
              <Route
                path="/Gestion/Grupo/Admin/:ID"
                element={
                  <PersmisonRedirect
                    Componente={<AdminGrupos />}
                    RolNecesario="PROFESOR"
                  />
                }
              />

              <Route
                path="/Grupo/:ID"
                element={
                  <PersmisonRedirect
                    Componente={<Grupos />}
                    RolNecesario="USER"
                  />
                }
              />
              <Route
                path="/Grupo/:ID/Seguimiento"
                element={
                  <PersmisonRedirect
                    Componente={<SeguimientoGrupo />}
                    RolNecesario="PROFESOR"
                  />
                }
              />

              <Route
                path="/Facultad/:FacultadID/Carrera/:CarreraID/Plan/:PlanID/Semestre/:SemestreID/Materia/:MateriaID"
                element={<Materia />}
              />

              <Route path="/Buscar" element={<BusquedaConEtiquetas />} />
              <Route
                path="/Materias/:FacultadID"
                element={<CarrerasMostrar Facultad={1} />}
              />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />

              <Route
                path="/subir_archivos"
                element={
                  <PersmisonRedirect
                    Componente={<SubidaDeArchivos />}
                    RolNecesario="ADMIN"
                  />
                }
              />
              <Route
                path="/administracion"
                element={
                  <PersmisonRedirect
                    Componente={<PantallaAdmin />}
                    RolNecesario="ADMIN"
                  />
                }
              />
              <Route
                path="/seguimiento"
                element={
                  <PersmisonRedirect
                    Componente={<SeguimientoGeneral />}
                    RolNecesario="ADMIN"
                  />
                }
              />
              <Route
                path="/administracion/Facultad/:FacultadID/Carrera/:CarreraID/Plan/:PlanID/Semestre/:SemestreID/Materia/:MateriaID"
                element={
                  <PersmisonRedirect
                    Componente={<AdminMateria />}
                    RolNecesario="ADMIN"
                  />
                }
              />

              <Route path="/*" element={<Inicio />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </div>
      <GuestFooter></GuestFooter>
    </ThemeProvider>
  );
}

export default App;
