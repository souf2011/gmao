import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRoute from "./routes/AppRoute";


function App() {
  return (
    <BrowserRouter>
        <AppRoute />
    </BrowserRouter>

  )
}

export default App
