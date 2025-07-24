

function createTodo(title, description, dueDate, priority, status) {
    const id = Crypto.randomUUID();
    const getID = () => id;

    const getTitle = () => title;
    const setTitle = (newTitle) => title = newTitle;

    const getDescription = () => description;
    const setDescription = (newDescription) => description = newDescription;

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => dueDate = newDueDate;

    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;

    const getStatus = () => status;
    const setStatus = (newStatus) => status = newStatus;

    return {
        getID,
        getTitle,
        setTitle,
        getDescription,
        setDescription,
        getDueDate,
        setDueDate,
        getPriority,
        setPriority,
        getStatus,
        setStatus,
    }
}

function createProject(name) {
    const getName = () => name;
    const setName = (newName) => name = newName;

    return {
        getName,
        setName,
    }
}