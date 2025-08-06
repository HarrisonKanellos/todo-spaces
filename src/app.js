import "./styles/style.css";
import * as Logic from "./logic.js";
import * as Display from "./display.js";

function initEventListeners() {
    const addSpaceButton = document.querySelector("#add-space-button");
    const submitAddSpaceButton = document.querySelector("#add-space");

    addSpaceButton.addEventListener("click", handleOpenAddSpaceModal);
    submitAddSpaceButton.addEventListener("click", handleSubmitAddSpace);
}

function handleOpenAddSpaceModal() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    Display.displayModal(addSpaceModal);
}

function handleSubmitAddSpace() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    const spaceNameInput = document.querySelector("#space-name");

    spaceName = spaceNameInput.value;
    if (!addNewSpace(spaceName)) {
        // Runs if name already exists
        // Provide UI message to user
        return;
    }

    Display.closeModal(addSpaceModal);
    Display.clearUserMadeSpaces();
    Display.renderSpaceTabs(Logic.getUserMadeSpaceNames());
}