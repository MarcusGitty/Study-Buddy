import { Card, Typography, CardContent, CardHeader, Grid} from "@mui/material";
import NavBar from "./NavBar";


export default function DashBoard() {

    const Item1 = () => {
            <Card variant = "outlined">
                <CardHeader
                title={<Typography color="secondary">Feature 1</Typography>}
                subheader={<Typography color="secondary">Feature 2</Typography>}
                />

                <CardContent>
                <Typography color="secondary" variant="h6">
                    <p>Task Name</p>
                </Typography>
                <Typography variant="body2" color="secondary">
                    <p>Task Description</p>
                </Typography>
                </CardContent>
            </Card>
    };
    return(
        <>
            <NavBar/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                    <p>Item 1</p>
                </Grid>
                <Grid xs={6}>
                    <p>Item 2</p>
                </Grid>
                <Grid xs={6}>
                    <p>Item 3</p>
                </Grid>
                <Grid xs={6}>
                     <p>Item 4</p>
                </Grid>
            </Grid>

            

            <Card>
                Feature 2
            </Card>
        </>
        
    );

}