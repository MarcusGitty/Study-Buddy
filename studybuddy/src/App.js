import logo from './logo.svg';
import './App.css';
import LoginScreen from "./components/LoginScreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const theme = createTheme({
  palette: {
    background: {
      default: "#D3D3D3"
    }
  }
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
      {session ? <LoginScreen/>: <LoginScreen />}
    </ThemeProvider>
  );
}

export default App;
