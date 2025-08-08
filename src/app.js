import "./styles/style.css";
import * as Logic from "./logic.js";
import * as Display from "./display.js";

function initEventListeners() {
    const addSpaceButton = document.querySelector("#add-space-button");
    const submitAddSpaceButton = document.querySelector("#add-space");
    const addTodoButton = document.querySelector("#add-todo-icon");
    const submitAddTodoButton = document.querySelector("#add-todo");

    addSpaceButton.addEventListener("click", handleOpenAddSpaceModal);
    submitAddSpaceButton.addEventListener("click", handleSubmitAddSpace);
    addTodoButton.addEventListener("click", handleOpenAddTodoModal);
    submitAddTodoButton.addEventListener("click", handleSubmitAddTodo);
}

function handleOpenAddSpaceModal() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    Display.displayModal(addSpaceModal);
}

function handleSubmitAddSpace(event) {
    const addSpaceModal = document.querySelector(".modal-add-space");
    const spaceNameInput = document.querySelector("#space-name");

    event.preventDefault();

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

function handleOpenAddTodoModal() {
    const addTodoModal = document.querySelector(".modal-add-todo");
    Display.displayModal(addTodoModal);
}

function handleSubmitAddTodo(event) {
    const addTodoModal = document.querySelector(".modal-add-todo");
    const spaceName = document.querySelector(".space-heading").textContent;
    const title = document.querySelector("#title-input").value;
    const description = document.querySelector("#description-input").value;
    const dueDate = document.querySelector("#due-date-input").value;
    const priority = document.querySelector("#priority-input").value;
    const status = document.querySelector("#status-input").value;

    event.preventDefault();

    const todoDataObj = { title, description, dueDate, priority, status };
    Logic.addNewTodo(spaceName, todoDataObj);

    Display.closeModal(addTodoModal);

    const todoListArr = Logic.getTodoList(spaceName);
    Display.clearSpaceList();
    Display.renderSpaceList(todoListArr);
    Display.renderTodoCount(todoListArr.length);
}