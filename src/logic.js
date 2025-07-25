

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

function addNewProject(projectName) {
    const project = createProject(projectName);
    if (!saveProject(project)) {
        return false; 
        // Handle project not saving, UI warning to user, name already exists
    }

    return true;
}

function saveProject(project) {
    if (projectExists(project.name)) {
        return false;   
    }

    const jsonProject = JSON.stringify([]);
    localStorage.setItem(project.name, jsonProject);
    return true;
}

function projectExists(projectName) {
    return localStorage.getItem(projectName) !== null;
}

// Read todo and project
// Update todo attributes using id
// Update project name using name
// Delete todo and project