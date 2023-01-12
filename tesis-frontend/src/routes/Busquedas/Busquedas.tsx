import { Box, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function PaginaBusquedaTest() {
 
    const [textInput, setTextInput] = useState('');

    const handleTextInputChange = (event:any) => {
        setTextInput(event.target.value);
    };
    return (
      <Box margin={"auto"}>
        <Typography variant="h5" textAlign={"center"}>Busqueda de Materiales</Typography>
        <Box className="search">
            
    
        </Box>
        <Divider></Divider>
      </Box>
    );
  }




function List(props:any) {
    const filteredData = data.filter((el) => {
        if (props.input === '') {
            return el;
        } else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

let data:[{
    "id": 1,
    "text": "Devpulse"
}, {
    "id": 2,
    "text": "Linklinks"
}, {
    "id": 3,
    "text": "Centizu"
}, {
    "id": 4,
    "text": "Dynabox"
}, {
    "id": 5,
    "text": "Avaveo"
}, {
    "id": 6,
    "text": "Demivee"
}, {
    "id": 7,
    "text": "Jayo"
}, {
    "id": 8,
    "text": "Blognation"
}, {
    "id": 9,
    "text": "Podcat"
}, {
    "id": 10,
    "text": "Layo"
}] 