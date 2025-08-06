import "./styles/style.css";
import * as Logic from "./logic.js";
import * as Display from "./display.js";

function initEventListeners() {
    const addSpaceButton = document.querySelector("#add-space-button");
    
    addSpaceButton.addEventListener("click", handleAddSpace);
}