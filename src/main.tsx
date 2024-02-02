import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import "./style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/material-icons";

const rootElement = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
    ,
  </React.StrictMode>,
);
