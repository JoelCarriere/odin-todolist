import createTask from "./task";
import createProject from "./project";
import storageManager from "./storageManager";
import library from "./toDoList";

class DOMHandler {
    constructor(storage) {
        this.storage = storage;
        this.library = this.storage.getToDo();
        this.projectIndex = -1;
    }

    static renderProject(projectInstance) {
        const projectList = document.getElementById("projectList");
        projectList.innerHTML += `
            <div class="photo">
                <button id="${projectInstance.name}" class="displayProject">
                    <img class="dash-logo" src="./img/invoice-list-outline.svg" alt="list logo">  
                    <p class="side-text">${projectInstance.name}</p>
                </button>
            </div>`
    }

    static renderTask(taskInstance, projectName) {
        const taskList = document.getElementById('taskList');
        if (taskInstance.title) {
            taskList.innerHTML += `
                <div class="article" data-project="${projectName}">
                    <div class="card">
                        <p class="card-color"></p>
                        <p class="card-title">${taskInstance.title}</p>
                        <p class="card-body">${taskInstance.description}</p>
                        <div class="card-date">
                            <p class="dueDate">${taskInstance.dueDate}</p>
                            <p>${taskInstance.priority}</p>
                        </div>
                        <div>"Notes:${taskInstance.notes}"</div>
                    </div>
                </div>`;
        } else {
            console.error("task instance is undefined.");
        }
    }
 
    //static renderStoredTasks(storageInstance, projectName) {
    //    const project = storageInstance.getToDo(projectName);
    //    const taskList = document.getElementById('taskList');
    //    taskList.innerHTML = ''; // Clear the task list before rendering for the new project
    //
    //    if (project) {
    //        for (const task of project.tasks) {
    //            DOMHandler.renderTask(task);
    //        }
    //    }
    //}

    //static renderStoredTasks(storageInstance, projectName) {
    //    console.log("Storage Instance:", storageInstance);
    //    const projects = storageInstance.getProjects();
    //    console.log("All Projects:", projects);
    //
    //    const project = storageInstance.getProject(projectName);
    //    console.log("Found Project:", project);
    //
    //    const taskList = document.getElementById('taskList');
    //    taskList.innerHTML = '';
    //
    //    if (project) {
    //        console.log("Project exists:", project);
    //        const tasks = project.getTasks();
    //
    //        if (Array.isArray(tasks)) {
    //            console.log("Project tasks:", tasks);
    //
    //            for (let i = 0; i < tasks.length; i++) {
    //                const task = tasks[i];
    //                console.log("Task ", i + 1, ":", task);
    //                DOMHandler.renderTask(task);
    //            }
    //        } else {
    //            console.error("Project tasks is not an array.");
    //        }
    //    } else {
    //        console.error("Project is undefined for name:", projectName);
    //    }
    //}
    
    static renderStoredTasks(storageInstance, projectName) {
        const project = storageInstance.getProject(projectName);
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the task list before rendering for the new project
    
        if (project) {
            console.log("Project exists:", project);
            const tasks = project.tasks; // Access the tasks property directly
    
            if (Array.isArray(tasks)) {
                console.log("Project tasks:", tasks);
    
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];
                    console.log("Task ", i + 1, ":", task);
                    DOMHandler.renderTask(task, projectName); // Pass projectName to renderTask
                }
            } else {
                console.error("Project tasks is not an array.");
            }
        } else {
            console.error("Project is undefined for name:", projectName);
        }
    }
    
    
    

    static openProjectModal() {
        const projectModal = document.getElementById("projectModal");
        projectModal.style.display = 'block';
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = `` 
    }

    static closeProjectModal() {
        const projectModal = document.getElementById("projectModal");
        projectModal.style.display = 'none';
    }

    static openTaskModal() {
        const taskModal = document.getElementById("taskModal");
        taskModal.style.display = 'block';
    }

    static closeTaskModal() {
        const taskModal = document.getElementById("taskModal");
        taskModal.innerHTML = ``;
        taskModal.style.display = 'none';
    }
}

export default DOMHandler;
