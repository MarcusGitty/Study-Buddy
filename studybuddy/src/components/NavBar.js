import { AppBar, Menu, MenuItem, Box, Button, IconButton, Toolbar,Typography } from "@mui/material";
import { supabase } from "../supabase";
import MenuIcon from '@mui/icons-material/Menu';
import * as React from "react";

const pages = ['Todo List','Assignment Tracker','Pomodoro','Progress Tracker','Study Techniques','File Uploads'];

export default function NavBar() {

    const[anchorElNav, setAnchorElNav] = React.useState(null);

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
        <Box sx={{ flexGrow:0}}>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="white"
                        aria-label="menu"
                        sx={{mr:2}}
                        onClick={handleNavMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                
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
                                display: { xs: "block", md: "none" }
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleNavMenuClosed}>
                                <Typography textAlign="center">{page + "(in Progress)"}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="white">
                        Study Buddy !!
                    </Typography>
                    
                    <Button 
                    variant="text"
                    sx= {{ color:"pink"}}
                    onClick={handleLogOutClick}
                    >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color ="white">
                            Logout Here :)
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}