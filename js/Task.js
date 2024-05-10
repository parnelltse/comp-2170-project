export default class Task {
    id;
    name;
    description;
    dueDate;
    stage;
    editFn;
    removeFn;
    dragAndDropFn;

    constructor(id, name = "", description = "", dueDate = "2024-01-01", editFn, removeFn, dragAndDropFn, stage = 0) {
        this.id = id;
        this.name = name
        this.description = description;
        this.dueDate = dueDate;
        this.editFn = editFn;
        this.removeFn = removeFn;
        this.dragAndDropFn = dragAndDropFn;
        this.stage = stage;
    }}