import './App.css';
import LoginScreen from "./components/LoginScreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import DashBoard from './components/DashBoard';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#757ce8",
      main: "#42a5f5",
      dark: "#BB86FC",
      contrastText: "#BB86FC",
    },
    secondary: {
      light: "#ff7961",
      main: "#42a5f5",
      dark: "#03DAC6",
      contrastText: "#000",
    },
  },
});

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.data.subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {session ? <DashBoard/>: <LoginScreen />}
    </ThemeProvider>
  );
}

export default App;
