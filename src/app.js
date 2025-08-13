import "./styles/style.css";
import * as Logic from "./logic.js";
import * as Display from "./display.js";

function initEventListeners() {
    const addSpaceButton = document.querySelector("#add-space-button");
    const submitAddSpaceButton = document.querySelector("#add-space");
    const addTodoButton = document.querySelector("#add-todo-icon");
    const submitAddTodoButton = document.querySelector("#add-todo");
    const spaceContainer = document.querySelector(".space-container");
    const todoItemModal = document.querySelector("#modal-todo-item");

    addSpaceButton.addEventListener("click", handleOpenAddSpaceModal);
    submitAddSpaceButton.addEventListener("click", handleSubmitAddSpace);
    addTodoButton.addEventListener("click", handleOpenAddTodoModal);
    submitAddTodoButton.addEventListener("click", handleSubmitAddTodo);
    spaceContainer.addEventListener("click", handleSpaceContainerClick);
    todoItemModal.addEventListener("click", handleTodoItemModalClick);
}

function handleOpenAddSpaceModal() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    Display.displayModal(addSpaceModal);
}

function handleSubmitAddSpace(event) {
    event.preventDefault();

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

function handleOpenAddTodoModal() {
    const addTodoModal = document.querySelector(".modal-add-todo");
    Display.displayModal(addTodoModal);
}

function handleSubmitAddTodo(event) {
    event.preventDefault();

    const addTodoModal = document.querySelector(".modal-add-todo");
    const title = document.querySelector("#title-input").value;
    const description = document.querySelector("#description-input").value;
    const dueDate = document.querySelector("#due-date-input").value;
    const priority = document.querySelector("#priority-input").value;
    const status = document.querySelector("#status-input").value;
    
    const spaceName = document.querySelector(".space-heading").textContent;
    const todoDataObj = { title, description, dueDate, priority, status };
    Logic.addNewTodo(spaceName, todoDataObj);

    Display.closeModal(addTodoModal);

    const todoListArr = Logic.getTodoList(spaceName);
    Display.clearSpaceList();
    Display.renderSpaceList(todoListArr);
    Display.renderTodoCount(todoListArr.length);
}

function handleSpaceContainerClick(event) {
    const statusCheckbox = event.target.closest(".list-item-checkbox");
    if (statusCheckbox) {
        handleStatusToggle(event);
        return;
    }

    const deleteButton = event.target.closest(".list-item-delete");
    if (deleteButton) {
        handleDeleteFromSpaceList(event);
        return;
    }

    const todoItem = event.target.closest(".space-list-todo");
    if (todoItem) {
        handleTodoItemClick(todoItem);
    }
}

function handleStatusToggle(event) {
    const todoContainer = event.target.closest(".space-list-todo");
    const todoID = todoContainer.dataset.id;
    const spaceName = document.querySelector(".space-heading").textContent;

    Logic.toggleTodoStatus(spaceName, todoID);
    Display.removeTodoFromSpaceList(todoContainer);
}

function handleDeleteFromSpaceList(event) {
    const todoDeleteModal = document.querySelector("#modal-delete-todo");
    const todoID = event.target.closest(".space-list-todo").dataset.id;
    todoDeleteModal.dataset.id = todoID;
    
    Display.displayModal(todoDeleteModal);
}

function handleTodoItemClick(todoItem) {
    const spaceName = document.querySelector(".space-heading").textContent;
    const todoID = todoItem.dataset.id;
    const todoObj = Logic.getTodoObjFromID(spaceName, todoID);
    Display.populateTodoItemModal(todoID, todoObj);

    const todoItemModal = document.querySelector("#modal-todo-item");
    Display.displayModal(todoItemModal);
}

function handleTodoItemModalClick(event) {
    const deleteButton = event.target.closest(".modal-delete-button");
    if (deleteButton) {
        handleDeleteFromTodoModal();
        return;    
    }
    
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseTodoItemModal();
        return;
    }

    const cancelButton = event.target.closest(".modal-cancel");
    if (cancelButton) {
        handleCloseTodoItemModal();
        return;
    }

    const saveChangesButton = event.target.closest("#save-changes");
    if (saveChangesButton) {
        handleTodoSaveChanges(event);
    }
}

function handleDeleteFromTodoModal() {
    const todoDeleteModal = document.querySelector("#modal-delete-todo");
    const todoID = document.querySelector("#modal-todo-item").dataset.id;
    todoDeleteModal.dataset.id = todoID;

    Display.displayModal(todoDeleteModal);
}

function handleCloseTodoItemModal() {
    const todoItemModal = document.querySelector("#modal-todo-item");
    Display.closeModal(todoItemModal);
}

function handleTodoSaveChanges(event) {
    event.preventDefault();

    const todoItemModal = document.querySelector("#modal-todo-item");
    const title = document.querySelector("#todo-title").value;
    const description = document.querySelector("#todo-description").value;
    const dueDate = document.querySelector("#todo-due-date").value;
    const priority = document.querySelector("#todo-priority").value;
    const status = document.querySelector("#todo-status").value;
    
    const spaceName = document.querySelector(".space-heading").textContent;
    const todoID = todoItemModal.dataset.id;
    const todoDataObj = { title, description, dueDate, priority, status };

    Logic.updateTodo(spaceName, todoID, todoDataObj);
    Display.closeModal(todoItemModal);

    const todoListArr = Logic.getTodoList(spaceName);
    Display.clearSpaceList();
    Display.renderSpaceList(todoListArr);
}