import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "src/util/router.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "@util/theme";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1500,
      staleTime: 30 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    },
  },
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
