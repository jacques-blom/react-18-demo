import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import App from "./App";

export const isConcurrent = () => {
  return localStorage.getItem("concurrentModeEnabled") !== "false";
};

if (isConcurrent()) {
  const root = ReactDOM.createRoot(document.getElementById("root")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root"),
  );
}
