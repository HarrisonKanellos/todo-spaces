import "./styles/style.css";
import * as Logic from "./logic.js";
import * as Display from "./display.js";

Logic.initSpaces();
initDisplay();
initEventListeners();

function initEventListeners() {
    const addSpaceButton = document.querySelector("#add-space-button");
    const navContainer = document.querySelector("nav");
    const spaceContainer = document.querySelector(".space-container");

    addSpaceButton.addEventListener("click", handleOpenAddSpaceModal);
    navContainer.addEventListener("click", handleNavClick);
    spaceContainer.addEventListener("click", handleSpaceContainerClick);
}

function initDisplay() {
    Display.renderSpaceTabs(Logic.getUserMadeSpaceNames());
    Display.clearSpaceList();
    Display.renderSpaceList(Logic.getTodoList("Common"));
    Display.updateSpaceHeading("Common");
    Display.renderTodoCount(Logic.getTodoCount("Common"));
}

function handleOpenAddSpaceModal() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    addSpaceModal.addEventListener("click", handleAddSpaceModalClick);
    Display.displayModal(addSpaceModal);
}

function handleAddSpaceModalClick(event) {
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseAddSpaceModal();
        return;
    }

    const isCancelButton = event.target.matches(".modal-cancel");
    if (isCancelButton) {
        handleCloseAddSpaceModal();
        return;
    }

    const isSubmitButton = event.target.matches("#add-space");
    if (isSubmitButton) {
        handleSubmitAddSpace(event);
    }
}

function handleCloseAddSpaceModal() {
    const addSpaceModal = document.querySelector(".modal-add-space");
    addSpaceModal.removeEventListener("click", handleAddSpaceModalClick);
    Display.closeModal(addSpaceModal);
}

function handleSubmitAddSpace(event) {
    event.preventDefault();

    const addSpaceModal = document.querySelector(".modal-add-space");
    const spaceNameInput = document.querySelector("#new-space-name");
    const spaceName = spaceNameInput.value;

    if (!Logic.addNewSpace(spaceName)) {
        // Runs if name already exists
        // TODO: provide UI message to user
        return;
    }

    spaceNameInput.value = "";
    addSpaceModal.removeEventListener("click", handleAddSpaceModalClick);
    Display.closeModal(addSpaceModal);

    Display.clearUserMadeSpaces();
    Display.renderSpaceTabs(Logic.getUserMadeSpaceNames());
    Display.selectActiveTabByName(spaceName);

    Display.updateSpaceHeading(spaceName);
    Display.renderTodoCount(Logic.getTodoCount(spaceName));
    Display.clearSpaceList();
    Display.renderSpaceList(Logic.getTodoList(spaceName));
}

function handleNavClick(event) {
    const deleteButton = event.target.closest(".space-delete");
    if (deleteButton) {
        handleDeleteSpace(event);
        return;
    }

    const editButton = event.target.closest(".space-edit");
    if (editButton) {
        handleEditSpaceName(event);
        return;
    }

    const spaceTab = event.target.closest(".space-tab");
    if (spaceTab) {
        handleSpaceTabClick(event);
    }
}

function handleDeleteSpace(event) {
    const spaceTab = event.target.closest(".space-tab");
    const spaceName = spaceTab.querySelector(".space-text").textContent;
    const deleteSpaceModal = document.querySelector("#modal-delete-space");

    deleteSpaceModal.querySelector("h2").textContent = `Delete '${spaceName}' Space?`;
    deleteSpaceModal.addEventListener("click", handleDeleteSpaceModalClick);
    Display.displayModal(deleteSpaceModal);
}

function handleEditSpaceName(event) {
    const spaceTab = event.target.closest(".space-tab");
    const spaceName = spaceTab.querySelector(".space-text").textContent;
    const editSpaceModal = document.querySelector("#modal-edit-space");

    editSpaceModal.dataset.prevName = spaceName;
    editSpaceModal.querySelector("input").value = spaceName;
    editSpaceModal.addEventListener("click", handleEditSpaceModalClick);
    Display.displayModal(editSpaceModal);
}

function handleSpaceTabClick(event) {
    const spaceTab = event.target.closest(".space-tab");
    const spaceName = spaceTab.querySelector(".space-text").textContent;

    Display.updateActiveTab(spaceTab);
    Display.clearSpaceList();

    if (spaceName === "Completed") {
        Display.updateSpaceHeading("Completed");
        Display.renderTodoCount(Logic.getCompletedTodoCount());
        Display.renderCompletedList(Logic.getCompletedTodoList());
    }
    else {
        Display.updateSpaceHeading(spaceName);
        Display.renderTodoCount(Logic.getTodoCount(spaceName));
        Display.renderSpaceList(Logic.getTodoList(spaceName));
    }
}

function handleDeleteSpaceModalClick(event) {
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseDeleteSpaceModal();
        return;
    }
    const isCancel = event.target.matches(".modal-cancel");
    if (isCancel) {
        handleCloseDeleteSpaceModal();
        return;
    }
    const isDelete = event.target.matches("#confirm-space-delete");
    if (isDelete) {
        handleConfirmDeleteSpace();
    }
}

function handleCloseDeleteSpaceModal() {
    const deleteSpaceModal = document.querySelector("#modal-delete-space");
    deleteSpaceModal.removeEventListener("click", handleDeleteSpaceModalClick);
    Display.closeModal(deleteSpaceModal);
}

function handleConfirmDeleteSpace() {
    const deleteSpaceModal = document.querySelector("#modal-delete-space");
    const headingText = deleteSpaceModal.querySelector("h2").textContent;
    const spaceName = getSpaceNameFromHeading(headingText);
    let activeTabName = document.querySelector(".active-space .space-text").textContent;
    const isActiveTab = activeTabName === spaceName ? true : false;

    Logic.deleteSpace(spaceName);

    deleteSpaceModal.removeEventListener("click", handleDeleteSpaceModalClick);
    Display.closeModal(deleteSpaceModal);

    Display.clearUserMadeSpaces();
    Display.renderSpaceTabs(Logic.getUserMadeSpaceNames());
    
    // If deleted space was the active tab
    // default the active tab back to "Common"
    if (isActiveTab) {
        activeTabName = "Common";
    }
    Display.selectActiveTabByName(activeTabName);
    Display.updateSpaceHeading(activeTabName);

    Display.clearSpaceList();
    if (activeTabName === "Completed") {
        Display.renderTodoCount(Logic.getCompletedTodoCount());
        Display.renderSpaceList(Logic.getCompletedTodoList());
    }
    else {
        Display.renderTodoCount(Logic.getTodoCount(activeTabName));
        Display.renderSpaceList(Logic.getTodoList(activeTabName));
    }
}

function getSpaceNameFromHeading(headingText) {
    return headingText
        .split("'")
        .at(1);
}

function handleEditSpaceModalClick(event) {
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseEditSpaceModal();
        return;
    }
    const isCancel = event.target.matches(".modal-cancel");
    if (isCancel) {
        handleCloseEditSpaceModal();
        return;
    }
    const isSave = event.target.matches("#save-space-changes");
    if (isSave) {
        handleSaveSpaceChanges(event);
    }
}

function handleCloseEditSpaceModal() {
    const editSpaceModal = document.querySelector("#modal-edit-space");
    editSpaceModal.removeEventListener("click", handleEditSpaceModalClick);
    Display.closeModal(editSpaceModal);
}

function handleSaveSpaceChanges(event) {
    event.preventDefault();
    
    const editSpaceModal = document.querySelector("#modal-edit-space");
    const prevSpaceName = editSpaceModal.dataset.prevName;
    const updatedSpaceName = document.querySelector("#updated-space-name").value;
    const prevActiveSpaceName = document.querySelector(".active-space .space-text").textContent;
    if (!Logic.updateSpaceName(prevSpaceName, updatedSpaceName)) {
        // Runs if name already exists
        // TODO: provide UI message to user within modal (do not close modal/removeEventListener)
        return;
    }
    editSpaceModal.removeEventListener("click", handleEditSpaceModalClick);
    Display.closeModal(editSpaceModal);

    Display.clearUserMadeSpaces()
    Display.renderSpaceTabs(Logic.getUserMadeSpaceNames());
        
    // Update space heading and active tab if the space's name 
    // that was updated was the active tab
    if (prevActiveSpaceName === prevSpaceName) {
        Display.selectActiveTabByName(updatedSpaceName);
        Display.updateSpaceHeading(updatedSpaceName);
    }
    else {
        Display.selectActiveTabByName(prevActiveSpaceName);
    }
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
        return;
    }
    
    const addTodoButton = event.target.closest("#add-new-todo");
    if (addTodoButton) {
        handleOpenAddTodoModal();
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
    
    todoDeleteModal.addEventListener("click", handleDeleteTodoModalClick);
    Display.displayModal(todoDeleteModal);
}

function handleTodoItemClick(todoItem) {
    const spaceName = document.querySelector(".space-heading").textContent;
    const todoID = todoItem.dataset.id;
    const todoObj = Logic.getTodoObjFromID(spaceName, todoID);
    Display.populateTodoItemModal(todoID, todoObj);
    
    const todoItemModal = document.querySelector("#modal-todo-item");
    todoItemModal.dataset.id = todoID;
    todoItemModal.addEventListener("click", handleTodoItemModalClick);
    Display.displayModal(todoItemModal);
}

function handleOpenAddTodoModal() {
    const addTodoModal = document.querySelector(".modal-add-todo");
    addTodoModal.addEventListener("click", handleAddTodoModalClick)
    Display.displayModal(addTodoModal);
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

    // TODO: fix use of matches, returns boolean
    const isCancelButton = event.target.matches(".modal-cancel");
    if (isCancelButton) {
        handleCloseTodoItemModal();
        return;
    }

    const isSaveButton = event.target.matches("#save-todo-changes");
    if (isSaveButton) {
        handleTodoSaveChanges(event);
    }
}

function handleDeleteFromTodoModal() {
    const todoDeleteModal = document.querySelector("#modal-delete-todo");
    const todoID = document.querySelector("#modal-todo-item").dataset.id;
    todoDeleteModal.dataset.id = todoID;
    
    todoDeleteModal.addEventListener("click", handleDeleteTodoModalClick)
    Display.displayModal(todoDeleteModal);
}

function handleCloseTodoItemModal() {
    const todoItemModal = document.querySelector("#modal-todo-item");
    todoItemModal.removeEventListener("click", handleTodoItemModalClick);
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
    
    Display.clearSpaceList();
    if (spaceName === "Completed") {
        Display.renderSpaceList(Logic.getCompletedTodoList());
    }
    else {
        Display.renderSpaceList(Logic.getTodoList(spaceName));
    }
}

function handleDeleteTodoModalClick(event) {
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseDeleteTodoModal();
        return;
    }
    const isCancel = event.target.matches(".modal-cancel");
    if (isCancel) {
        handleCloseDeleteTodoModal();
        return;
    }
    const isDelete = event.target.matches("#confirm-todo-delete");
    if (isDelete) {
        handleConfirmDeleteTodo(event);
    }
}

function handleCloseDeleteTodoModal() {
    const deleteTodoModal = document.querySelector("#modal-delete-todo");
    deleteTodoModal.removeEventListener("click", handleDeleteTodoModalClick);
    Display.closeModal(deleteTodoModal);
}

function handleConfirmDeleteTodo(event) {
    const deleteTodoModal = document.querySelector("#modal-delete-todo");
    const spaceName = document.querySelector(".space-heading").textContent;
    const todoID = deleteTodoModal.dataset.id;

    Logic.deleteTodo(spaceName, todoID);

    deleteTodoModal.removeEventListener("click", handleDeleteTodoModalClick);
    Display.closeModal(deleteTodoModal);

    const todoItemModal = document.querySelector("#modal-todo-item");
    if (todoItemModal.open) {
        Display.closeModal(todoItemModal);
    }

    Display.clearSpaceList();
    if (spaceName === "Completed") {
        Display.renderTodoCount(Logic.getCompletedTodoCount());
        Display.renderCompletedList(Logic.getCompletedTodoList());
    }
    else {
        Display.renderTodoCount(Logic.getTodoCount(spaceName));
        Display.renderSpaceList(Logic.getTodoList(spaceName));
    }
}

function handleAddTodoModalClick(event) {
    const closeButton = event.target.closest(".modal-close");
    if (closeButton) {
        handleCloseAddTodoModal();
        return;
    }

    const isCancelButton = event.target.matches(".modal-cancel");
    if (isCancelButton) {
        handleCloseAddTodoModal();
        return;
    }

    const isSaveButton = event.target.matches("#add-todo");
    if (isSaveButton) {
        handleSubmitAddTodo(event);
    }
}

function handleCloseAddTodoModal() {
    const addTodoModal = document.querySelector(".modal-add-todo");
    addTodoModal.removeEventListener("click", handleAddTodoModalClick);
    Display.closeModal(addTodoModal);
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
    
    addTodoModal.querySelector("#title-input").value = "";
    addTodoModal.querySelector("#description-input").value = "";
    addTodoModal.querySelector("#due-date-input").value = "";
    addTodoModal.querySelector("#priority-input").value = "medium";
    addTodoModal.querySelector("#status-input").value = "pending";
    Display.closeModal(addTodoModal);
    
    const todoListArr = Logic.getTodoList(spaceName);
    Display.clearSpaceList();
    Display.renderSpaceList(todoListArr);
    Display.renderTodoCount(todoListArr.length);
}