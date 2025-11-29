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

function getTodoObjFromID(todoID) {
    const spaces = retrieveSpacesArray();

    return getTodoRef(spaces, todoID);
}

function getTodoList(spaceName) {
    const spaces = retrieveSpacesArray();

    return spaces
        .find((space) => space.name === spaceName)
        .todoList;
}

function getCompletedTodoList() {
    const spaces = retrieveSpacesArray();
    const completedTodoArr = [];

    spaces.forEach((space) => {
        space.todoList.forEach((todoItem) => {
            if (todoItem.status === true) {
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

function getTodoCount(spaceName) {
    const spaces = retrieveSpacesArray();
    
    return spaces
        .find((space) => space.name === spaceName)
        .todoList.length;
}

function getCompletedTodoCount() {
    const spaces = retrieveSpacesArray();

    let todoCount = 0;
    spaces.forEach((space) => {
        space.todoList.forEach((todoItem) => {
            if (todoItem.status === true) {
                todoCount++;
            }
        });
    });
    return todoCount;
}

function deleteTodo(todoID) {
    const spacesArr = retrieveSpacesArray();
    
    const spaceIndex = spacesArr.findIndex((space) => {
        for (let todo of space.todoList) {
            if (todo.id === todoID) {
                return true;
            }
        }
        return false;
    })

    const newSpaceTodoList = spacesArr
        .at(spaceIndex).todoList
        .filter((todo) => todo.id !== todoID);

    spacesArr.at(spaceIndex).todoList = newSpaceTodoList;

    saveSpacesArray(spacesArr);
}

function deleteSpace(spaceName) {
    const spacesArr = retrieveSpacesArray();

    const newSpacesArr = spacesArr.filter((space) => {
        return space.name !== spaceName});

    saveSpacesArray(newSpacesArr);
}

function updateTodo(todoID, todoDataObj) {
    const spacesArr = retrieveSpacesArray();
    const todoRef = getTodoRef(spacesArr, todoID);
    updateTodoProps(todoRef, todoDataObj);

    saveSpacesArray(spacesArr);
}

function toggleTodoStatus(todoID) {
    const spacesArr = retrieveSpacesArray();
    const todoRef = getTodoRef(spacesArr, todoID);

    if (todoRef.status === false) {
        todoRef.status = true;
    }
    else {
        todoRef.status = false;
    }

    saveSpacesArray(spacesArr);
    return todoRef.status;
}

function getTodoRef(spacesArr, todoID) {
    let todoRef;
    for (let space of spacesArr) {
        todoRef = space.todoList
            .find((todoItem) => {
                return todoItem.id === todoID;
            });
        if (todoRef) {
            return todoRef;
        }
    }
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
    getTodoList, 
    getCompletedTodoList,
    getUserMadeSpaceNames,
    getTodoCount,
    getCompletedTodoCount, 
    deleteTodo, 
    deleteSpace, 
    updateTodo,
    toggleTodoStatus,
    updateSpaceName 
};