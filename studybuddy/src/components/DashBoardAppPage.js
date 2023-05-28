
import { Grid, Container, Typography,Card } from '@mui/material';
import NavBar from './NavBar';
// components

const pages = ['Todo List','Assignment Tracker','Pomodoro','Progress Tracker','Study Techniques','File Uploads'];
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
    
    <NavBar/>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2, pt:2 }}>
          Hi There, Welcome back. Do note that there is only the login page and this page :B
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <CardMaker str='Todo List'/>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
            <CardMaker str='Assignment Tracker'/>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
            <CardMaker str='Pomodoro'/>
          </Grid>

          <Grid item xs={2} sm={6} md={3}>
             <CardMaker str='Progress Tracker'/>
          </Grid>

          <Grid item xs={2} md={6} lg={3}>
            <CardMaker str='Study Techniques'/>
          </Grid>

          <Grid item xs={2} md={6} lg={3}>
            <CardMaker str='File Uploads'/>
          </Grid>

          <Grid item xs={2} md={6} lg={3}>
            <CardMaker str='Timetable'/>
          </Grid>

          <Grid item xs={2} md={6} lg={3}>
            <CardMaker str='Calendar'/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}