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