import logo from './logo.svg';
import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
    ``
      </header>
    </div>
  );
}

export default App;
