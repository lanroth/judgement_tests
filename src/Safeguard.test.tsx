import React from "react";
import ReactDOM from "react-dom";
import Safeguard from "./Safeguard";

test("Outro renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Safeguard />, div);
});
