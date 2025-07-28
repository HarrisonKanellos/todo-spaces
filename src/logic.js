

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

function deleteTodo(projectName, todoID) {
    const projectsArr = retrieveProjectsArray();

    const newProject = projectsArr
        .find((project) => project.name === projectName)
        todoList.filter((todoItem) => todoItem.id !== todoID);

    const newProjectsArr = projects.map((project) => {
        if (project.name = projectName) {
            return newProject;
        }
    })

    saveProjectsArray(newProjectsArr);
}

function deleteProject(projectName) {
    const projectsArr = retrieveProjectsArray();

    const newProjectsArr = projectsArr.filter((project) => {
        return project.name !== projectName});

    saveProjectsArray(newProjectsArr);
}

function updateTodo(projectName, todoID, todoDataObj) {
    const projectsArr = retrieveProjectsArray();
    const todoRef = getTodoRef(projectsArr, projectName, todoID);
    updateTodoProps(todoRef, todoDataObj);

    saveProjectsArray(projectsArr);
}

function getTodoRef(projectsArr, projectName, todoID) {
    return projectsArr
        .find((project) => project.name === projectName)
        .todoList.find((todoItem) => todoItem.id === todoID)
}

function updateTodoProps(todoRef, todoDataObj) {
    for (let prop in todoRef) {
        if (prop in todoDataObj) {
            todoRef[prop] = todoDataObj[prop];
        }
    }
}

function updateProjectName(projectName, newName) {
    const projectsArr = retrieveProjectsArray();
    const projectRef = projectsArr.find((project) => project.name === projectName);
    
    projectRef.name = newName;
    
    saveProjectsArray(projectsArr);
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

export { initProjects, addNewTodo, addNewProject, getTodoList, getProjectNames, deleteTodo, deleteProject, updateTodo, updateProjectName }