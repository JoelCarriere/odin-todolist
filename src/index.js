import './style.css';
import DOMHandler from "./domHandler";
import storageManager from "./storageManager";
import library from "./toDoList";
import { add } from 'date-fns';

const storage = new storageManager();
const domHandler = new DOMHandler(storage);

domHandler.storage = storage;

console.log(storage);         // Check if storage is defined
console.log(domHandler);      // Check if domHandler is defined
console.log(domHandler.storage === storage);  // Ensure the storage property is set correctly


const localLibrary = new library;

const newProjectButton = document.getElementById("newProjectButton");
newProjectButton.addEventListener('click', () => DOMHandler.openProjectModal());

const addProjButton = document.getElementById("addProjectButton");
addProjButton.addEventListener("click", () => { localLibrary.addProject()});

const taskButton = document.getElementById("taskButton");
taskButton.addEventListener('click', () => DOMHandler.openTaskModal());

const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", () => localLibrary.addTask());

const closeProjectButton = document.getElementById("closeProjectButton");
closeProjectButton.addEventListener("click", () => DOMHandler.closeProjectModal());

const closeTaskButton = document.getElementById("closeTaskButton");
closeTaskButton.addEventListener("click", () => DOMHandler.closeTaskModal());

const projectList = document.getElementById("projectList");

//projectList.addEventListener("click", function (event) {
//    const clickedButton = event.target.closest(".displayProject");
//    if (clickedButton) {
//        console.log("Button clicked!");
//        const selectedProject = clickedButton.id;
//        DOMHandler.renderStoredTasks(domHandler.storage, selectedProject);
//    }
//});

projectList.addEventListener("click", function (event) {
    const clickedButton = event.target.closest(".displayProject");
    if (clickedButton) {
        console.log("Button clicked!");
        const selectedProject = clickedButton.id;

        // Set the selected project before rendering tasks
        domHandler.storage.setProject(selectedProject);

        // Render the stored tasks for the selected project
        // Example usage:
        const library = domHandler.storage.getToDo();  // Corrected to use domHandler.storage
        DOMHandler.renderStoredTasks(library, selectedProject);

    }
});





document.addEventListener('DOMContentLoaded', function () {
    flatpickr('.flatpickr-input', {
        dateFormat: "m-d-Y", 
    });
});