function clearSpaces() {
    const nav = document.querySelector("nav");
    const tabs = nav.childNodes;
    
    for (let i = 1, len = tabs.length; i < len - 1; i++) {
        navElem.removeChild(tabs[i]);
    }
}

function clearSpaceList() {
    const space = document.querySelector(".space-container");
    const children = space.childNodes;

    for (let i = 0, len = children.length; i < len - 1; i++) {
        space.removeChild(children[i]);
    }
}

function renderTodoCount(todoCount) {
    const counterElem = document.querySelector(".todo-count");
    counterElem.textContent = `${todoCount} todos`;
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
    spaceText.classList .add("space-text");
    spaceText.textContent = `${spaceName}`;
    
    tab.appendChild(spaceText);

    return tab;
}

function renderSpaceList(spaceListArr) {
    const spaceContainer = document.querySelector(".space-container");
    const refNode = document.querySelector("#add-new-todo");

    spaceListArr.forEach((todoObj) => {
        const todoItemElement = createTodoItem(todoObj);
        spaceContainer.insertBefore(todoItemElement, refNode);
    })
}

function createTodoItem(todoObj) {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("space-list-item");
    todoContainer.dataset.id = todoObj.id;

    const titleText = document.createElement("h3");
    titleText.classList.add("list-item-title");
    titleText.textContent = `${todoObj.title}`;

    const descriptionText = document.createElement("p");
    descriptionText.classList.add("list-item-description");
    descriptionText.textContent = `${todoObj.description}`;

    const checkboxStatus = document.createElement("input");
    checkboxStatus.classList.add("list-item-checkbox");
    checkboxStatus.type = "checkbox";
    checkboxStatus.value = `${todoObj.status}`;

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

function updateSpaceHeading(spaceName) {
    const spaceHeadingText = document.querySelector(".space-heading");
    spaceHeadingText.textContent = `${spaceName}`;
}

