import { useState } from "react";
import "./App.scss";
import customTheme from "./themes/themes";
import Router from "./Router";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />

      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
