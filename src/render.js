"use strict"

export function htmlFormat(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.checked = task.completed;
    checkbox.id = task.content;

    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.textContent = task.content;

    const editTask = function(e) {
        console.log(e.target);
    }

    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-task');
    editBtn.textContent = 'edit';
    editBtn.addEventListener("click", editTask);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-task');
    removeBtn.textContent = 'remove';

    const card = document.createElement("div");
    card.classList.add('card');
    if (task.priority == 'high') {
        card.classList.add('important');
    } 
    card.append(checkbox, taskName, editBtn, removeBtn);
    return (card)
}
