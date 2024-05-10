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
    }
// generateCardHTML is for generate a html element that include the card content.
generateHtmlCard = () => {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");
    cardContainer.setAttribute("data-task-id", this.id);
    cardContainer.setAttribute("draggable", true);
    cardContainer.addEventListener('dragstart', this.dragAndDropFn)

    const titleDiv = document.createElement('h3');
    titleDiv.innerHTML = this.name;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerHTML = this.description;
    const dudDateDiv = document.createElement('div');
    dudDateDiv.innerHTML = "Due Date:" + this.dueDate;

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    editButton.addEventListener('click', () => { this.editFn(this.id) });
    deleteButton.addEventListener('click', () => { this.removeFn(this.id) });

    cardContainer.appendChild(titleDiv);
    cardContainer.appendChild(descriptionDiv);
    cardContainer.appendChild(dudDateDiv);
    cardContainer.appendChild(editButton);
    cardContainer.appendChild(deleteButton);
    return cardContainer;
}
}