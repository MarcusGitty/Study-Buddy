import { AppBar, Menu, MenuItem, Box, Button, IconButton, Toolbar,Typography, Link } from "@mui/material";
import { supabase } from "../supabase";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Navigate } from "react-router-dom";
import * as React from "react";

const pages = ['Todo List','Assignment Tracker','Study Timer','Progress Tracker','Study Techniques','File Uploads'];

export default function NavBar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleLogOutClick = () => {
        supabase.auth.signOut();
    };

    const handleNavMenuOpen = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleNavMenuClosed = () => {
        setAnchorElNav(null);
    };


    return (
        <Box sx={{ flexGrow:1}}>
            <AppBar position="relative">
                <Toolbar>
                    <Link href="/">
                    <IconButton
                        size="large"
                        edge="start"
                        color="white"
                        aria-label="menu"
                        sx={{mr:2}}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="white">
                        Study Buddy !!
                    </Typography>
                    
                    <Button 
                    variant="text"
                    sx= {{ color:"pink"}}
                    onClick={handleLogOutClick}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color ="white">
                            Logout
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
/*
<Menu
id="menu-appbar"
anchorEl={anchorElNav}
anchorOrigin={{
    vertical: "bottom",
    horizontal: "left"
}}
keepMounted
transformOrigin={{
    vertical: "top",
    horizontal: "left"
}}
open={Boolean(anchorElNav)}
onClose={handleNavMenuClosed}
sx={{
    display: { xs: "block", md: "flex" }
}}
>
{pages.map((page) => (
    <MenuItem key={page} onClick={handleNavMenuClosed}>
    <Typography textAlign="center">{page + "(in Progress)"}</Typography>
    </MenuItem>
))}
</Menu>
*/