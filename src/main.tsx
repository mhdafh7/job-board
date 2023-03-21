import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ModalContextProvider from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>
);
