// storageManager.js

import createProject from "./project";
import createTask from "./task";

class storageManager {
    constructor() {
        this.library = { projects: [] };
        this.selectedProject = null;
    }

    getToDo() {
        const libraryData = JSON.parse(localStorage.getItem('library') || '{"projects": []}');
        console.log("Retrieved Library Data from Storage:", libraryData);

        const library = new storageManager();
        library.setProjects(libraryData.projects);

        console.log("Retrieved Project from Storage:", library);

        return library;
    }
    

    saveToDo(data) {
        localStorage.setItem('library', JSON.stringify(data.getLibrary()));
        console.log("Library Saved to Local Storage");
    }

    static deleteToDo(projectName) {
        const library = storageManager.getToDo();
        library.getProjects().splice(library.getProjects().findIndex(project => project.name === projectName), 1);
        storageManager.saveToDo(library);
    }

    static deleteTask(projectName, task) {
        const library = storageManager.getToDo();
        const project = library.getProjects().find(project => project.name === projectName);
        if (project) {
            project.tasks = project.tasks.filter(existingTask => existingTask !== task);
            storageManager.saveToDo(library);
        } else {
            console.error("Project not found");
        }
    }

    setProjects(projects) {
        this.library.projects = projects;
    }

    getProjects() {
        return this.library.projects;
    }

    setLibrary(library) {
        this.library = library;
    }

    getLibrary() {
        return this.library;
    }

    setProject(projectName) {
        this.selectedProject = projectName;
    }

    getProject(projectName) {
        const projects = this.getProjects();
        console.log("All projects:", projects);
    
        const foundProject = projects.find(project => project.name === projectName);
    
        if (foundProject) {
            console.log("Found project:", foundProject);
        } else {
            console.error("Project not found for name:", projectName);
        }
    
        return foundProject;
    }
    
}

export default storageManager;
