import React from 'react';
import {Provider} from "react-redux";
import {AppRoutes} from "./app.routes";
import {store} from "../../store/app.store";
import {CssBaseline} from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRoutes />
    </Provider>
  );
}

export default App;
