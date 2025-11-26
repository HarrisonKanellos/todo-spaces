function createTodo({title, description, dueDate, priority, status}) {
    const id = crypto.randomUUID();

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        status
    }
}

function createSpace(name) {
    const todoList = [];

    return {
        name,
        todoList
    }
}

function initSpaces() {
    if (spacesArrayExists()) {
        return;
    }

    const spaces = [];
    const defaultSpace = createSpace("Common");

    spaces.push(defaultSpace);

    saveSpacesArray(spaces);
}

function spacesArrayExists() {
    return localStorage.getItem("spaces") !== null;
}

function addNewTodo(spaceName, todoDataObj) {
    const todoItem = createTodo(todoDataObj);
    saveTodo(todoItem, spaceName);
}

function saveTodo(todoItem, spaceName) {
    const spaces = retrieveSpacesArray();
    const spaceIndex = spaces.findIndex((space) => {
        return space.name === spaceName;
    });

    spaces.at(spaceIndex).todoList.push(todoItem);

    saveSpacesArray(spaces);
}

function addNewSpace(spaceName) {
    if (spaceNameExists(spaceName)) {
        return false;
    }

    const space = createSpace(spaceName);
    saveSpace(space);

    return true;
}

function spaceNameExists(spaceName) {
    const arrSpaces = retrieveSpacesArray();

    return arrSpaces.some((space) => {
        return space.name === spaceName;
    });
}

function saveSpace(space) {
    const spaces = retrieveSpacesArray();

    spaces.push(space);
    
    const jsonSpaces = JSON.stringify(spaces);
    localStorage.setItem("spaces", jsonSpaces)
}

function getTodoObjFromID(spaceName, id) {
    const spaces = retrieveSpacesArray();

    return spaces
        .find((space) => space.name === spaceName)
        .todoList.find((todoObj) => todoObj.id === id);
}

function getPendingTodoList(spaceName) {
    const spaces = retrieveSpacesArray();

    return spaces
        .find((space) => space.name === spaceName)
        .todoList.filter((todoItem) => todoItem.status === "pending");
}

function getCompletedTodoList() {
    const spaces = retrieveSpacesArray();
    const completedTodoArr = [];

    spaces.forEach((space) => {
        space.todoList.forEach((todoItem) => {
            if (todoItem.status === "complete") {
                completedTodoArr.push(todoItem);
            }
        });
    });

    return completedTodoArr;
}

function getUserMadeSpaceNames() {
    const spaces = retrieveSpacesArray();
    const spaceNames = [];
    
    // Skips the first space as is the default 'common' space, not user made
    for (let i = 1, len = spaces.length; i < len; i++) {
        spaceNames.push(spaces.at(i).name);
    }

    return spaceNames;
}

function getPendingTodoCount(spaceName) {
    const spaces = retrieveSpacesArray();
    
    return spaces
        .find((space) => space.name === spaceName)
        .todoList.reduce((todoCount, todoItem) => {
            if (todoItem.status === "pending") {
                return todoCount++;
            }
        }, 0);
}

function getCompletedTodoCount() {
    const spaces = retrieveSpacesArray();
    let todoCount = 0;

    spaces.forEach((space) => {
        space.todoList.forEach((todoItem) => {
            if (todoItem.status === "complete") {
                todoCount++;
            }
        });
    });
    return todoCount;
}

function deleteTodo(spaceName, todoID) {
    const spacesArr = retrieveSpacesArray();

    const newSpaceTodoList = spacesArr
        .find((space) => space.name === spaceName)
        .todoList.filter((todoItem) => {
            if (todoItem.id === todoID) {
                return false;
            }
            return true;
        });

    const newSpacesArr = spacesArr
        .map((space) => {
            if (space.name === spaceName) {
                space.todoList = newSpaceTodoList;
                return space;
            }
            return space;
        })

    saveSpacesArray(newSpacesArr);
}

function deleteSpace(spaceName) {
    const spacesArr = retrieveSpacesArray();

    const newSpacesArr = spacesArr.filter((space) => {
        return space.name !== spaceName});

    saveSpacesArray(newSpacesArr);
}

function updateTodo(spaceName, todoID, todoDataObj) {
    const spacesArr = retrieveSpacesArray();
    const todoRef = getTodoRef(spacesArr, spaceName, todoID);
    updateTodoProps(todoRef, todoDataObj);

    saveSpacesArray(spacesArr);
}

function toggleTodoStatus(spaceName, todoID) {
    const spacesArr = retrieveSpacesArray();
    const todoRef = getTodoRef(spacesArr, spaceName, todoID);

    if (todoRef.status === "pending") {
        todoRef.status = "complete";
    }
    else {
        todoRef.status = "pending";
    }

    saveSpacesArray(spacesArr);
    return todoRef.status;
}

function getTodoRef(spacesArr, spaceName, todoID) {
    return spacesArr
        .find((space) => space.name === spaceName)
        .todoList.find((todoItem) => todoItem.id === todoID);
}

function updateTodoProps(todoRef, todoDataObj) {
    for (let prop in todoRef) {
        if (prop in todoDataObj) {
            todoRef[prop] = todoDataObj[prop];
        }
    }
}

function updateSpaceName(spaceName, newName) {
    if (spaceNameExists(newName)) {
        return false;
    }

    const spacesArr = retrieveSpacesArray();
    const spaceRef = spacesArr.find((space) => space.name === spaceName);
    spaceRef.name = newName;
    
    saveSpacesArray(spacesArr);

    return true;
}

// Helper functions
function retrieveSpacesArray() {
    const jsonSpaces = localStorage.getItem("spaces");
    return JSON.parse(jsonSpaces);
}

function saveSpacesArray(spacesArray) {
    const jsonSpaces = JSON.stringify(spacesArray);
    localStorage.setItem("spaces", jsonSpaces);
}

export { 
    initSpaces, 
    addNewTodo, 
    addNewSpace,
    getTodoObjFromID,
    getPendingTodoList, 
    getCompletedTodoList,
    getUserMadeSpaceNames,
    getPendingTodoCount,
    getCompletedTodoCount, 
    deleteTodo, 
    deleteSpace, 
    updateTodo,
    toggleTodoStatus,
    updateSpaceName 
};