import Task from "./Task.js ";

// Set variable
const taskList = [];
const stageList = [
	{ id: 0, name: "To-Do" },
	{ id: 1, name: "In progress" },
	{ id: 2, name: "Review" },
	{ id: 3, name: "Complete" },
];

const dragAndDropCanvas = document.querySelector(".drag-and-drop-canvas");
const overlayer = document.querySelector(".overlayer");
let obj;
// Form input
const formTaskName = document.querySelector("#taskName");
const formTaskId = document.querySelector("#taskId");
const formstage = document.querySelector("#stageId");
const formDescription = document.querySelector("#taskDescription");
const formDueDate = document.querySelector("#taskDueDate");
const addTaskBtn = document.querySelector("#addTaskBtn");
const closeBtn = document.querySelector("#closeBtn");

const init = () => {};

const dragstartEvent = (event) => {};

const dropOverEvent = (event) => {};
const dropEvent = (event) => {};

const dragAndDropCanvasPerpare = (stage) => {};

const dragBoxPerpare = () => {};

const dataPerpare = () => {};

addTaskBtn.addEventListener("click", submitForm);
closeBtn.addEventListener("click", closeOverlayer);

window.addEventListener("load", (event) => {
	init();
	dataPerpare();
	clearFormData();
});

const init = () => {
	// init function;
	dragBoxPerpare();
 }
 
 
 const dragstartEvent = (event) => {
	console.log(event);
	obj = event.target;
	console.log(obj);
 }
 
 
 const dropOverEvent = (event) => {
	event.preventDefault()
 }
 const dropEvent = (event) => {
	console.log(event);
	if (event.target.dataset.stageId) {
		event.target.prepend(obj);
		updateTaskStatus(obj.dataset.taskId, event.dataset.stageId)
	}
 }
 
 
 const dragAndDropCanvasPerpare = (stage) => {
	const parentDiv = document.createElement('div');
	parentDiv.classList.add("drag-and-drop-container");
	const h2 = document.createElement('h2');
	h2.innerHTML = stage.name;
	const dragAndDropContainer = document.createElement('div');
	dragAndDropContainer.classList.add("drag-and-drop-zone");
	dragAndDropContainer.setAttribute(`data-stage-id`, stage.id);
	dragAndDropContainer.addEventListener('dragover', dropOverEvent);
	dragAndDropContainer.addEventListener('drop', dropEvent);
	const createTaskButton = document.createElement('button');
	createTaskButton.setAttribute(`data-button-stage-id`, stage.id);
	createTaskButton.addEventListener('click', createTask);
	createTaskButton.innerHTML = 'Create Task';
 
 
	parentDiv.appendChild(h2);
	parentDiv.appendChild(dragAndDropContainer);
	parentDiv.appendChild(createTaskButton);
	dragAndDropCanvas.append(parentDiv);
 
 
 }
 
 
 const dragBoxPerpare = () => {
	while (formstage.firstChild) {
		formstage.removeChild(formstage.lastChild);
	}
	stageList.map((stage) => {
		dragAndDropCanvasPerpare(stage);
		const option = document.createElement("option");
		option.value = stage.id;
		option.innerHTML = stage.name;
		formstage.appendChild(option);
	});
 }
 
 
 const dataPerpare = () => {
	taskList.push(new Task(1, "Task 1", "This is a task 1.", "2024-05-12", editCard, removeCard, dragstartEvent, 0));
	taskList.push(new Task(2, "Task 2", "This is a task 2.", "2024-05-13", editCard, removeCard, dragstartEvent, 1));
	taskList.push(new Task(3, "Task 3", "This is a task 3.", "2024-05-14", editCard, removeCard, dragstartEvent, 2));
	taskList.push(new Task(4, "Task 4", "This is a task 4.", "2024-05-15", editCard, removeCard, dragstartEvent, 3));
 
 
	taskList.map((task) => {
		const element = task.generateHtmlCard();
		const targetElement = document.querySelector(`[data-stage-id="${task.stage}"]`);
		targetElement.appendChild(element);
 
 
	});
 }
 

const updateTaskStatus = (taskId, stageId) => {
	stageList.map((item) => {
		if (item.id == taskId) {
			item.stage = stageId;
		}
	});
};

const createTask = (event) => {
	const stageID = event.target.dataset.buttonStageId;
	overlayer.setAttribute("style", "display:flex;");
	clearFormData();
	console.log(stageID);
	formstage.value = stageID;
};

const editCard = (id) => {
	const task = getTastById(id);
	clearFormData();
	formTaskName.value = task.name;
	formTaskId.value = task.id;
	formstage.value = task.stage;
	formDescription.value = task.description;
	formDueDate.value = task.dueDate;
	overlayer.setAttribute("style", "display:flex;");
};
const removeCard = (id) => {
	const isConfirm = confirm("Are you confirm deleted this record?");
	if (!isConfirm) return;
	const task = getTastById(id);
	const index = taskList.indexOf(task);
	const element = document.querySelector(`[data-task-id="${id}"]`);
	console.log(index);
	taskList.splice(index, 1);
	console.log(taskList);
	element.remove();
};

const submitForm = (event) => {
	event.preventDefault();
	if (formTaskId.value == null || formTaskId.value == "") {
		console.log(formTaskId.value);
		//new Taskid
		const task = new Task(
			nextId(),
			formTaskName.value,
			formDescription.value,
			formDueDate.value,
			editCard,
			removeCard,
			dragstartEvent,
			formstage.value
		);
		taskList.push(task);
		const element = task.generateHtmlCard();
		const parentElement = document.querySelector(
			`[data-stage-id="${task.stage}"]`
		);
		parentElement.appendChild(element);
		overlayer.setAttribute("style", "display:none;");
	} else {
		taskList.map((task, index) => {
			if (task.id == formTaskId.value) {
				task.name = formTaskName.value;
				task.description = formDescription.value;
				task.dueDate = formDueDate.value;
				overlayer.setAttribute("style", "display:none;");
				const targetElement = document.querySelector(
					`[data-task-id="${task.id}"]`
				);

				if (task.stage == formstage.value) {
					const element = task.generateHtmlCard();
					targetElement.innerHTML = element.innerHTML;
				} else {
					task.stage = formstage.value;
					const element = task.generateHtmlCard();
					const parentElement = document.querySelector(
						`[data-stage-id="${formstage.value}"]`
					);
					parentElement.appendChild(element);
					targetElement.remove();
				}
			}
		});
	}
};
const closeOverlayer = (event) => {
	event.preventDefault();
	overlayer.setAttribute("style", "display:none;");
};

const nextId = () => {
	return taskList.sort((a, b) => b.id - a.id)[0].id + 1;
};

const getTastById = (id) => {
	return taskList.filter((item) => id === item.id)[0];
};

const clearFormData = () => {
	formTaskName.value = "";
	formTaskId.value = "";
	formDescription.value = "";
	formDueDate.value = "";
};
