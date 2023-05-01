import React from "react";
import ReactDOM from "react-dom/client";
import App, { ChatComponent } from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/error-page.tsx";
import { XssComponent } from "./components/xss-component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ChatComponent />,
      },

      {
        path: "xss-vulnerable",
        element: <XssComponent />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
