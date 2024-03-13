import DOMHandler from "./domHandler";
import createProject from "./project";
import createTask from "./task";
import storageManager from "./storageManager";

class library {

    constructor() {
        this.storage = new storageManager();
        this.projectInstance = null; // Initialize projectInstance
    }

   // addProject() {
   //     const projNameInput = document.getElementById("projectName");
   //     const projectName = projNameInput.value.trim();
//
   //     if (projectName !== "") {
   //         const projectInstance = new createProject(projectName);
   //         this.storage.getProjects().push(projectInstance);
   //         const taskList = document.getElementById('taskList');
   //         //taskList.innerHTML = ``;
   //         //projectInstance.tasks = []; 
//
   //         projectInstance.setTasks([]);
   //         this.storage.getProjects().push(projectInstance);
//
   //         this.storage.setProject(projectName);
   //         this.projectInstance = projectInstance;
   //         DOMHandler.renderProject(projectInstance);
   //         console.log("Rendering project:", projectInstance);
   //         this.storage.saveToDo(this.storage);
   //         console.log("Closed project modal");
   //         projNameInput.value= ``;
   //         const projectModal = document.getElementById("projectModal");
   //         projectModal.style.display = 'none';
//
//
   //     } else {
   //         alert("Please enter a project name.");
   //     }
   // }

//addProject() {
//    const projNameInput = document.getElementById("projectName");
//    const projectName = projNameInput.value.trim();
//
//    if (projectName !== "") {
//        // Create a new project instance
//        const projectInstance = new createProject(projectName);
//
//        // Initialize tasks as an empty array
//        projectInstance.setTasks([]);
//
//        // Add the project to the storage
//        this.storage.getProjects().push(projectInstance);
//
//        // Save the changes to localStorage
//        this.storage.saveToDo(this.storage);
//
//        // Set this.projectInstance to the newly created project
//        this.projectInstance = projectInstance;
//
//        // Clear the input field and close the modal
//        projNameInput.value = ``;
//        const projectModal = document.getElementById("projectModal");
//        projectModal.style.display = 'none';
//
//        // Render the project in the UI
//        DOMHandler.renderProject(projectInstance);
//        console.log("Projects after adding:", this.storage.getProjects());
//    } else {
//        alert("Please enter a project name.");
//    }
//}


addProject() {
    const projNameInput = document.getElementById("projectName");
    const projectName = projNameInput.value.trim();

    if (projectName !== "") {
        // Create a new project instance
        const projectInstance = new createProject(projectName);

        // Initialize tasks as an empty array
        projectInstance.setTasks([]);

        // Add the project to the library
        const library = this.storage.getToDo();
        library.getProjects().push(projectInstance);

        // Save the changes to localStorage
        this.storage.saveToDo(library);

        // Set this.projectInstance to the newly created project
        this.projectInstance = projectInstance;

        // Clear the input field and close the modal
        projNameInput.value = ``;
        const projectModal = document.getElementById("projectModal");
        projectModal.style.display = 'none';

        // Render the project in the UI
        DOMHandler.renderProject(projectInstance);
    } else {
        alert("Please enter a project name.");
    }
}




addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const dueDate = document.getElementById("taskDueDate").value.trim();
    const priority = document.getElementById("taskPriority").value.trim();
    const notes = document.getElementById("taskNotes").value.trim();

    if (this.projectInstance) {
        // Create a new task instance
        const taskInstance = new createTask(title, description, dueDate, priority, notes);

        // Add the task to the current project
        this.projectInstance.addTask(taskInstance);

        // Save the changes to localStorage
        const library = this.storage.getToDo();

        // Find the current project in the library and update its tasks
        const updatedProjects = library.getProjects().map(project => {
            if (project.name === this.projectInstance.name) {
                return this.projectInstance;
            }
            return project;
        });

        library.setProjects(updatedProjects);
        this.storage.saveToDo(library);

        // Clear the input fields and close the modal
        document.getElementById("taskTitle").value = '';
        document.getElementById("taskDescription").value = '';
        document.getElementById("taskDueDate").value = '';
        document.getElementById("taskPriority").value = '';
        document.getElementById("taskNotes").value = '';
        taskModal.style.display = 'none';

        // Render the tasks in the UI
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        this.projectInstance.getTasks().forEach(task => {
            DOMHandler.renderTask(task);
        });

        console.log("Project after adding task:", this.projectInstance);
        console.log("All projects in library:", library.getProjects());
    } else {
        console.error("projectInstance is not defined.");
    }
}





   // addTask() {
   //     const title = document.getElementById("taskTitle").value.trim();
   //     const description = document.getElementById("taskDescription").value.trim();
   //     const dueDate = document.getElementById("taskDueDate").value.trim();
   //     const priority = document.getElementById("taskPriority").value.trim();
   //     const notes = document.getElementById("taskNotes").value.trim();
   //     const taskInstance = new createTask(title, description, dueDate, priority, notes);
//
   //     this.projectInstance.tasks.push(taskInstance); 
   //     console.log("Project after adding task:", this.projectInstance);
   //     console.log("Tasks after adding:", this.projectInstance.tasks);
//
   //     document.getElementById("taskTitle").value = '';
   //     document.getElementById("taskDescription").value = '';
   //     document.getElementById("taskDueDate").value = '';
   //     document.getElementById("taskPriority").value = '';
   //     document.getElementById("taskNotes").value = '';
   //     taskModal.style.display = 'none';
//
   //     const taskList = document.getElementById('taskList');
   //     taskList.innerHTML = '';
//
   //     this.projectInstance.tasks.forEach(task => {
   //         DOMHandler.renderTask(task);
   //     });
   //     this.storage.saveToDo(this.storage);
   //     console.log("After adding and saving project/task:", this.storage);
   // }
}

export default library;
