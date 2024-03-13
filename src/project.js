import {toDate, isToday, isThisWeek} from "date-fns";

class createProject {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

export default createProject;
