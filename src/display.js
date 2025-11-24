import deleteIconSvg from "./assets/icons/delete-icon.svg";
import editIconSvg from "./assets/icons/edit-icon.svg";
import addIconSvg from "./assets/icons/add-icon.svg";

function clearUserMadeSpaces() {
    const nav = document.querySelector("nav");
    const tabs = nav.querySelectorAll(".space-tab");
    
    for (let i = 1, len = tabs.length; i < len - 1; i++) {
        nav.removeChild(tabs[i]);
    }
}

function clearSpaceList() {
    const space = document.querySelector(".space-container");
    const children = space.children;

    for (let i = 0, len = children.length; i < len; i++) {
        space.removeChild(children[i]);
    }
}

function removeTodoFromSpaceList(todoContainer) {
    const spaceContainer = document.querySelector("space-contaner");
    spaceContainer.removeChild(todoContainer);
}

function renderTodoCount(todoCount) {
    const counterElem = document.querySelector(".todo-count");
    if (todoCount === 1) {
        counterElem.textContent = `${todoCount} todo`;
    }
    else {
        counterElem.textContent = `${todoCount} todos`;
    }
}

function renderSpaceTabs(createdNamesArr) {
    const nav = document.querySelector("nav");
    const refNode = document.querySelector("#completed-tab");

    for (let i = 0, len = createdNamesArr.length; i < len; i++) {
        const tab = createSpaceTab(createdNamesArr[i]);
        nav.insertBefore(tab, refNode);
    }
}

function createSpaceTab(spaceName) {
    const tab = document.createElement("div");
    tab.classList.add("space-tab");

    const spaceText = document.createElement("p");
    spaceText.classList.add("space-text");
    spaceText.textContent = spaceName;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("space-delete");
    deleteButton.type = "button";

    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("space-delete-icon");
    deleteIcon.src = deleteIconSvg;
    deleteIcon.alt = "delete";

    const editButton = document.createElement("button");
    editButton.classList.add("space-edit");
    editButton.type = "button";

    const editIcon = document.createElement("img");
    editIcon.classList.add("space-edit-icon");
    editIcon.src = editIconSvg;
    editIcon.alt = "edit";

    deleteButton.appendChild(deleteIcon);
    editButton.appendChild(editIcon);
    
    tab.appendChild(spaceText);
    tab.appendChild(deleteButton);
    tab.appendChild(editButton);

    return tab;
}

function renderSpaceList(spaceListArr) {
    const spaceContainer = document.querySelector(".space-container");

    spaceListArr.forEach((todoObj) => {
        const todoItemElement = createTodoItem(todoObj);
        spaceContainer.appendChild(todoItemElement);
    });

    spaceContainer.appendChild(createAddTodoButton());
}

function renderCompletedList(completedTodoArr) {
    const spaceContainer = document.querySelector(".space-container");

    completedTodoArr.forEach((todoObj) => {
        const todoItemElement = createTodoItem(todoObj);
        spaceContainer.appendChild(todoItemElement);
    });
}

// TODO: add dueDate with date-fns formatting
//       add priority as colour of flag
function createTodoItem(todoObj) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("space-list-item");
    todoContainer.classList.add("space-list-todo");
    todoContainer.dataset.id = todoObj.id;

    const titleText = document.createElement("h3");
    titleText.classList.add("list-item-title");
    titleText.textContent = todoObj.title;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("list-item-description");
    descriptionText.textContent = todoObj.description;

    const checkboxStatus = document.createElement("input");
    checkboxStatus.classList.add("list-item-checkbox");
    checkboxStatus.type = "checkbox";
    checkboxStatus.value = todoObj.status;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("list-item-delete");
    deleteButton.type = "button";

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("list-item-left");
    
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("list-item-right");

    leftContainer.appendChild(titleText);
    leftContainer.appendChild(descriptionText);

    rightContainer.appendChild(checkboxStatus);
    rightContainer.appendChild(deleteButton);

    todoContainer.appendChild(leftContainer);
    todoContainer.appendChild(rightContainer);

    return todoContainer;
}

function createAddTodoButton() {
    const addTodoContainer = document.createElement("div");
    addTodoContainer.classList.add("space-list-item");
    addTodoContainer.id = "add-new-todo";

    const addIcon = document.createElement("img");
    addIcon.id = "add-todo-icon";
    addIcon.src = addIconSvg;
    addIcon.alt = "add icon";

    const addTodoText = document.createElement("p");
    addTodoText.classList.add("add-todo-text");
    addTodoText.textContent = "Add new todo";

    addTodoContainer.appendChild(addIcon);
    addTodoContainer.appendChild(addTodoText);

    return addTodoContainer;
}

function updateSpaceHeading(spaceName) {
    const spaceHeadingText = document.querySelector(".space-heading");
    spaceHeadingText.textContent = `${spaceName}`;
}

function updateActiveTab(spaceTab) {
    const currentActiveTab = document.querySelector(".active-space");
    currentActiveTab.classList.remove("active-space");
    spaceTab.classList.add("active-space");
}

function selectActiveTabByName(spaceName) {
    const tabs = document.querySelectorAll(".space-tab");
    for (const tab of tabs) {
        if (tab.querySelector(".space-text").textContent === spaceName) {
            tab.classList.add("active-space");
            return;
        }
    }
}

function displayModal(modalElement) {
    modalElement.showModal();
}

function closeModal(modalElement) {
    modalElement.close();
}

function populateTodoItemModal(todoID, todoObj) {
    const todoItemModal = document.querySelector("#modal-todo-item");
    const title = document.querySelector("#todo-title");
    const description = document.querySelector("#todo-description");
    const dueDate = document.querySelector("#todo-due-date");
    const priority = document.querySelector("#todo-priority");
    const status = document.querySelector("#todo-status");

    todoItemModal.dataset.id = todoID;
    title.value = todoObj.title;
    description.value = todoObj.description;
    // TODO: format dueDate use date-fns
    dueDate.value = todoObj.dueDate; 
    priority.value = todoObj.priority;
    status.value = todoObj.status;
}

export {
    clearUserMadeSpaces,
    clearSpaceList,
    removeTodoFromSpaceList,
    renderTodoCount,
    renderSpaceTabs,
    renderSpaceList,
    renderCompletedList,
    updateSpaceHeading,
    updateActiveTab,
    selectActiveTabByName,
    displayModal,
    closeModal,
    populateTodoItemModal
};