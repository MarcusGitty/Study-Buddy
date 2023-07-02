
import { Grid, Container, Typography,Card, Link } from '@mui/material';
import NavBar from './NavBar';
import { Route } from 'react-router-dom';
import Timer from './Timer';
// components

const pages = ['Todo List','Assignment Reminder','Study Timer','Progress Tracker'];
// ----------------------------------------------------------------------
function CardMaker(text){
    return(
        <Card
                sx={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: 'center',
                    color: '#03DAC6F',
                    bgcolor: '#d3eaf2',
                
                }}
            
            >
                <Typography>{text.str}</Typography>
            </Card>
    );
}

export default function DashboardAppPage() {
    

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2, pt:2 }}>
          Hi there, welcome back to Study Buddy!
        </Typography>
    
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <Link href='/todo'>
            <CardMaker str='Todo List'/>
            </Link>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
            <CardMaker str='Assignment Reminder'/>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
          <Link href='/timer'>
          <CardMaker str='Study Timer'/>
          </Link>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
             <CardMaker str='Progress Tracker'/>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}