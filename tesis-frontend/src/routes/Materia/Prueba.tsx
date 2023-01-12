import * as React from "react";
import {
  Typography,
  Box,
  Button,
  Container,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  CardActionArea,
} from "@mui/material";



export default function MateriaCard() {
const cards:Array<any>=[];

    cards.push(1)
    cards.push(1)
     cards.push(1)
    
     var cardStyle = {
        display: 'block',
        width: '18rem',
        transitionDuration: '0.3s',
        height: '16rem'
    }
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
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea>
                  <CardMedia style={cardStyle}
                    component="img"
                    sx={
                      {
                        // 16:9
                        //   pt: '56.25%',
                        margin:"auto"
                      }
                    }
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
