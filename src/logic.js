

function createTodo({title, description, dueDate, priority, status}) {
    const id = Crypto.randomUUID();

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        status
    }
}

function createProject(name) {
    const todoList = [];

    return {
        name,
        todoList
    }
}

function initProjects() {
    if (projectsArrayExists()) {
        return;
    }

    const projects = [];
    const defaultProject = createProject("Common");
    projects.push(defaultProject);

    saveProjectsArray(projects);
}

function projectsArrayExists() {
    return localStorage.getItem("projects") !== null;
}

function addNewTodo(projectName, todoDataObj) {
    const todoItem = createTodo(todoDataObj);
    saveTodo(todoItem, projectName);
}

function saveTodo(todoItem, projectName) {
    const projects = retrieveProjectsArray();
    const projectIndex = projects.findIndex((project) => {
        return project.name === projectName;
    });

    projects.at(projectIndex).todoList.push(todoItem);

    saveProjectsArray(projects);
}

function addNewProject(projectName) {
    if (projectNameExists(projectName)) {
        return false;
        // Handle project not saving, due to name exists, ui msg to user
    }

    const project = createProject(projectName);
    saveProject(project);

    return true;
}

function projectNameExists(projectName) {
    const arrProjects = retrieveProjectsArray();

    return arrProjects.some((project) => {
        return project.name === projectName;
    });
}

function saveProject(project) {
    const projects = retrieveProjectsArray();

    projects.push(project);
    
    const jsonProjects = JSON.stringify(projectsArray);
    localStorage.setItem("projects", jsonProjects)
}
// Read todo and project
// Update todo attributes using id
// Update project name using name
// Delete todo and project

function getTodoList(projectName) {
    const projects = retrieveProjectsArray();
    return projects.find((project) => {
        return project.name = projectName;
    });
}

function getProjectNames() {
    const projects = retrieveProjectsArray();
    const projectNames = [];
    for (let project in projects) {
        projectNames.push(project.name);
    }

    return projectNames;
}


// Helper functions
function retrieveProjectsArray() {
    const jsonProjects = localStorage.getItem("projects");
    return JSON.parse(jsonProjects);
}

function saveProjectsArray(projectsArray) {
    const jsonProjects = JSON.stringify(projectsArray);
    localStorage.setItem("projects", jsonProjects);
}

export { initProjects, addNewTodo, addNewProject }