function render( arr ) {
    arr.forEach(prepareHTML);
}


function prepareHTML(task) {


}

function htmlFormat(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = task.completed;
    checkbox.id = task.content;

    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.textContent = task.content;
    const taskDate = document.createElement("div");
    taskDate.classList.add('task-date');
    taskDate.textContent = task.date;
    const taskPriority = document.createElement("div");
    taskPriority.classList.add('task-priority');
    taskPriority.textContent = task.priority;

    const card = document.createElement("div");
    card.classList.add('card');
    //card.setAttribute("data-id", );
    card.append(checkbox,taskName, taskDate, taskPriority);
    return (card)
}
