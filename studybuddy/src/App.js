import './App.css';
import LoginScreen from "./components/LoginScreen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import DashboardAppPage from './components/DashBoardAppPage';
import { Routes, Route} from 'react-router-dom';
import Timer from './components/Timer';
import AssignmentTracker from './components/AssignmentTracker';
import NavBar from './components/NavBar';
import TasksScreen from './components/TodoListScreen';
import ProgressTracker from './components/ProgressTracker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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

    if (session) {
      return(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
        <Routes>
          <Route exact path='/' element={<DashboardAppPage />}></Route>
          <Route exact path='/timer' element={<Timer />}></Route>
          <Route exact path='/todo' element={<TasksScreen />}></Route>
          <Route exact path='/progresstracker' element={<ProgressTracker />}></Route>
          <Route exact path='/assignmentreminder' element={<AssignmentTracker />}></Route>
        </Routes>
        </ThemeProvider>
        </LocalizationProvider>
      );
    } else {
      return(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginScreen />
      </ThemeProvider>
      </LocalizationProvider>
      )
    }
}

export default App;
