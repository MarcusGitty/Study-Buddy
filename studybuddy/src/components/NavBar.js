import { AppBar, Button } from "@mui/material";
import { supabase } from "../supabase";


export default function NavBar() {

    const handleLogOutClick = () => {
        supabase.auth.signOut();
    };

    return (
        <header>
            <AppBar position="relative">
                <Button 
                variant="text"
                sx= {{ color:"pink"}}
                onClick={handleLogOutClick}
                >
                    logout
                </Button>
            </AppBar>
        </header>
    );
}