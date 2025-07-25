

function createTodo({title, description, dueDate, priority, status}) {
    const id = Crypto.randomUUID();
    const getID = () => id;

    return {
        getID,
        title,
        description,
        dueDate,
        priority,
        status
    }
}

function createProject(name) {
    return { name }
}

// Pass in project and todo object
function addNewTodo(projectName, todoDataObj) {
    const todo = createTodo(todoDataObj);
    saveTodo(todo, projectName);
}

function saveTodo(todoItem, projectName) {
    let jsonProject = localStorage.getItem(projectName);

    // Check if project exists in localStorage
    if (!jsonProject) {
        return;
    }

    const arrProject = JSON.parse(jsonProject);
    arrProject.push(todoItem);
    jsonProject = JSON.stringify(arrProject);
    localStorage.setItem(projectName, jsonProject);
}