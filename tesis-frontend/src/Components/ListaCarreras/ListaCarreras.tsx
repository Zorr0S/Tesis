import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, CardActionArea, Paper, Stack } from "@mui/material";
import { Dominio } from "../../API/API";
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
import { Link as RouterLink } from "react-router-dom";


const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));


export default function ListaCarreras(Props:Facultad) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const [posts, setPosts] = useState<any[]>([]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const fetchData = async () => {
    let Prueaba = `${Dominio}/recursos/facultad/${Props.ID}`;
    const { data } = await axios.get(Prueaba);
    setPosts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  


  return (
    <div>
      <div className="wrapper">
        {posts.length > 0 ? (
          <div className="content">
            {posts.map((post, index) => (
              <Accordion
                key={`${index}-${post.ID}-Listado-`}
                expanded={expanded === `panel${post.ID}`}
                onChange={handleChange(`panel${post.ID}`)}
              >
                
                 
                <AccordionSummary  
                 
                  aria-controls={`panel${index}d-content`}
                  id={`panel${post.ID}d-header`}
                >
                  
                  
                  <Typography >{post.Nombre}</Typography>
                </AccordionSummary>
               
                <AccordionDetails>
                <CardActionArea component={RouterLink}  to={`/Materias/${post.ID}`}>
                  <Typography><ListadoCarrera FaculID={post.ID}/></Typography>
                </CardActionArea>

                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : (
          <p className="loading"> Cargando Datos... </p>
        )}
      </div>
    </div>
  );
}
type Facultad={
  ID:number;
}
type Carrera = {
  FaculID: number;
};

function ListadoCarrera(Props: Carrera) {
  const [posts, setPosts] = useState<any[]>([]);

  const fetchData = async () => {
    let Prueaba = `${Dominio}/recursos/facultad/${Props.FaculID}/carrera/`;
    const { data } = await axios.get(Prueaba);
    setPosts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box >
      <Stack spacing={2}>
        {posts.map((post,index)=>( <Item key={`${index}-${post.Nombre}`}>{post.Nombre}</Item>)
         
        )}
      </Stack>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
