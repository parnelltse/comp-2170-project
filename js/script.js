import Task from './Task.js '


// Set variable
const taskList = [];
const stageList = [
    { id: 0, name: 'To-Do' },
    { id: 1, name: 'In progress' },
    { id: 2, name: 'Review' },
    { id: 3, name: 'Complete' },
]

const dragAndDropCanvas = document.querySelector('.drag-and-drop-canvas');
const overlayer = document.querySelector('.overlayer');
let obj;
// Form input
const formTaskName = document.querySelector('#taskName');
const formTaskId = document.querySelector('#taskId');
const formstage = document.querySelector('#stageId');
const formDescription = document.querySelector('#taskDescription');
const formDueDate = document.querySelector('#taskDueDate');
const addTaskBtn = document.querySelector('#addTaskBtn');
const closeBtn = document.querySelector('#closeBtn');


const init = () => {
}

const dragstartEvent = (event) => {
}

const dropOverEvent = (event) => {
}
const dropEvent = (event) => {
}


const dragAndDropCanvasPerpare = (stage) => {

}

const dragBoxPerpare = () => {

}

const dataPerpare = () => {
    
}



const updateTaskStatus = (taskId, stageId) => {
}

const createTask = (event) => {
    
}

const editCard = (id) => {
    
}

const removeCard = (id) => {
    
}

const submitForm = (event) => {
    
}

const closeOverlayer = (event) => {
    
}

const nextId = () => {
    
}

const getTastById = (id) => {
    
}

const clearFormData = () => {
    
}

addTaskBtn.addEventListener('click', submitForm);
closeBtn.addEventListener('click', closeOverlayer);

window.addEventListener("load", (event) => {
    init();
    dataPerpare();
    clearFormData();
});
