import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";


import { useEffect, useState } from "react";
import axios from "axios";
import { Dominio } from "../../API/API";

type CarrerasFacultadInfo = {
  Facultad: number;
};
export function CarrerasMostrar(Props: CarrerasFacultadInfo) {
  const [carreras, setCarreras] = useState<any[]>([]);

  async function fetchData() {
    let URLRest = `${Dominio}/recursos/facultad/${Props.Facultad}/carrera/?Carrera=${Props.Facultad}`;
    const { data } = await axios.get(URLRest);
    console.log(data);
    setCarreras(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(Props)
  return (
    <Container>
      <Grid>
        <Divider />
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          textAlign={"center"}
        >
          Carreras
        </Typography>
        <Grid>
          
          {carreras.map((carrera) => (
            <Carrera 
              Nombre={carrera.Nombre}
              Facultad={Props.Facultad}
              Carrera={carrera.ID}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

type CarreraInfo = {
  Facultad: number;
  Carrera: number;
  Nombre: number;
};
function Carrera(Props: CarreraInfo) {
  return (
    <Accordion expanded>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Typography>
          {Props.Nombre} 
        </Typography>
      </AccordionSummary>
      <Divider />

      <AccordionDetails>
        <UltimoPlan Facultad={Props.Facultad} Carrera={Props.Carrera} />
      </AccordionDetails>
    </Accordion>
  );
}
type PlanInfo = {
  Facultad: number;
  Carrera: number;
};
function UltimoPlan(Props: PlanInfo) {
  const [Planes, setPlan] = useState<any[]>([]);

  async function fetchData() {
    let URLRest = `${Dominio}/recursos/facultad/${Props.Facultad}/carrera/${Props.Carrera}/plan/?last=1`;
    const { data } = await axios.get(URLRest);
    console.log(data);
    setPlan(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {Planes.length > 0 ? (
        Planes.map((Plan, index) => (
          <>
            {Plan.Nombre}
            <Semestre
              Facultad={Props.Facultad}
              Carrera={Props.Carrera}
              Plan={Plan.ID}
            />
          </>
        ))
      ) : (
        <p className="loading"> Cargando Semestre... </p>
      )}
    </>
  );
}
type SemestreInfo = {
  Facultad: number;
  Carrera: number;
  Plan: number;
};
function Semestre(Props: SemestreInfo) {
  ///recursos/facultad/1/carrera/2/plan/1/semestre/
  const [Pemestre, setSemestre] = useState<any[]>([]);

  async function fetchData() {
    let URLRest = `${Dominio}/recursos/facultad/${Props.Facultad}/carrera/${Props.Carrera}/plan/${Props.Plan}/semestre/`;
    const { data } = await axios.get(URLRest);
    console.log(data);
    setSemestre(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  console.log(Props.Plan);
  return (
    <>
      {Pemestre.length > 0 ? (
        Pemestre.map((semestre, index) => (
          <>
            <Divider>
              <Typography>{semestre.Nombre}</Typography>
            </Divider>
            <Stack>
              <Materias
                Facultad={Props.Facultad}
                Carrera={Props.Carrera}
                Plan={Props.Plan}
                Semestre={semestre.ID}
              />
            </Stack>
          </>
        ))
      ) : (
        <p className="loading"> Cargando Materias a </p>
      )}
    </>
  );
}
type MateriaInfo = {
  Facultad: number;
  Carrera: number;
  Plan: number;
  Semestre: number;
};
export default function Materias(Props: MateriaInfo) {
  
  const [Materias, setMaterias] = useState<any[]>([]);

  async function fetchData() {
    let URLRest = `${Dominio}/recursos/facultad/${Props.Facultad}/carrera/${Props.Carrera}/plan/${Props.Plan}/semestre/${Props.Semestre}/materia/`;
    const { data } = await axios.get(URLRest);
    console.log(data);
    setMaterias(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  var cardStyle = {
    display: "block",
    width: "18rem",
    transitionDuration: "0.3s",
    height: "16rem",
  };
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          //   pt: 8,
          pb: 6,
        }}
      ></Box>
      <Container>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {Materias.length > 0 ? (
            Materias.map((Materia) => (
              <Grid item key={Materia} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActionArea component={RouterLink} to={`/Facultad/${Props.Facultad}/Carrera/${Props.Carrera}/Plan/${Props.Plan}/Semestre/${Props.Semestre}/Materia/${Materia.ID}`}>
                    <CardMedia
                      style={cardStyle}
                      component="img"
                      sx={{
                        // 16:9
                        //   pt: '56.25%',
                        margin: "auto",
                      }}
                      image="https://source.unsplash.com/random"
                      //image="https://i.ytimg.com/vi/0WDhKCPtbng/maxresdefault.jpg"

                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {Materia.Nombre}
                      </Typography>
                      <Typography>
                       {Materia.Descripcion}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <p className="loading"> Cargando Materias a </p>
          )}
        </Grid>
      </Container>
    </main>
  );
}
// {cards.map((card) => (
//             <Grid item key={card} xs={12} sm={6} md={4}>
//               <Card
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <CardActionArea>
//                   <CardMedia style={cardStyle}
//                     component="img"
//                     sx={
//                       {
//                         // 16:9
//                         //   pt: '56.25%',
//                         margin:"auto"
//                       }
//                     }
//                     image="https://source.unsplash.com/random"
//                     alt="random"
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Heading
//                     </Typography>
//                     <Typography>
//                       This is a media card. You can use this section to describe
//                       the content.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small">View</Button>
//                   </CardActions>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
