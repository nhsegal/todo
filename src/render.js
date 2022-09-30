"use strict"
import { DOM } from "./DOMCache";

function renderCard(task) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "isCompletedCheckbox";
    checkbox.setAttribute('data-id', task.id);
    checkbox.checked = task.completed;
    checkbox.id = task.content;
    
    const taskName = document.createElement("div");
    taskName.classList.add('task-name');
    taskName.setAttribute('data-id', task.id);
    taskName.textContent = task.content;

    const taskDue = document.createElement("div");
    taskDue.classList.add('task-due-date');
    taskDue.setAttribute('data-id', task.id);
    taskDue.textContent = `Due: ${task.date.toLocaleString('default', {weekday: 'short' })},
        ${ task.date.toLocaleString('default', { month: 'short' })}. 
        ${ task.date.getDate()} `  
    
    const editBtn = document.createElement("button");
    editBtn.classList.add('edit-task');
    editBtn.setAttribute('data-id', task.id);
    editBtn.textContent = 'edit';
 
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add('remove-task');
    removeBtn.setAttribute('data-id', task.id);
    removeBtn.textContent = 'remove';
 
    
    const card = document.createElement("div");
    card.classList.add('card');
    card.setAttribute('data-id', task.id);
    if (task.priority == 'high') {
        card.classList.add('important');
    } 
    card.append(checkbox, taskName, taskDue, editBtn, removeBtn);
    return (card)
}

export function renderMain(masterList, option, byProjectName = null) {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let weekFromToday= new Date(today);
    weekFromToday.setDate(today.getDate() + 7);

    let todayGroup = null;
    let pastDue = null;
    let weekGroup = null;

    // First remove everything from main and from displayList
    while (DOM.main.firstChild) {
        DOM.main.removeChild(DOM.main.firstChild);
        masterList.displayedList.splice(0, masterList.displayedList.length);
    }

    if (option === 'byProject'){
        const projectList = masterList.produceProjectList(byProjectName);
        const projectHeading = document.createElement("div");
        projectHeading.classList.add('heading');
        projectHeading.textContent = byProjectName;
        DOM.main.append(projectHeading);
        for (let i = 0; i < projectList.length; i++){
            if (projectList[i].date >= today && projectList[i].date <= today && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('subheading');
                todayHeading.textContent = 'Today';
                DOM.main.append(todayHeading);
            } 
            if (projectList[i].date > today && todayGroup == 1)  {
                todayGroup = null;
                const lineBreak = document.createElement('hr');
                DOM.main.append(lineBreak);
            }
            DOM.main.append(renderCard(projectList[i]));
            masterList.displayedList.push(projectList[i]);
        }
        return;
    }
    else {
        for (let i = 0; i < masterList.data.length; i++){
            if (masterList.data[i].date >= tomorrow && option === "today") {
                return;
            }; 

            if (masterList.data[i].date > weekFromToday && option === "this-week") {
                return;
            }; 


            // Past-Due Undone Block
            if (masterList.data[i].date < today  && pastDue == null && masterList.data[i].completed === false) {
                pastDue = 1;
                const pastDueHeading = document.createElement("div");
                pastDueHeading.classList.add('heading');
                pastDueHeading.textContent = 'Past Due';
                DOM.main.append(pastDueHeading);
            }
         
            if (masterList.data[i].date >= today && pastDue == 1) {
                pastDue = 2;
                const lineBreak = document.createElement('hr');
                DOM.main.append(lineBreak);
            }

            // Today Block
            if (masterList.data[i].date >= today && masterList.data[i].date < tomorrow && todayGroup == null) {
                todayGroup = 1;
                const todayHeading = document.createElement("div");
                todayHeading.classList.add('heading');
                todayHeading.textContent = 'Today';
                DOM.main.append(todayHeading);
            } 

            if (masterList.data[i].date >= tomorrow && todayGroup == 1) {
                todayGroup = 2;
                const lineBreak = document.createElement('hr');
                DOM.main.append(lineBreak);
            }

            if (masterList.data[i].date <= weekFromToday && masterList.data[i].date >= tomorrow && weekGroup == null) {
                weekGroup = 1;
                const weekHeading = document.createElement("div");
                weekHeading.classList.add('heading');
                weekHeading.textContent = 'This Week';
                DOM.main.append(weekHeading);
            } 

            if (masterList.data[i].date > weekFromToday && weekGroup == 1) {
                weekGroup = 2;
                const lineBreak = document.createElement('hr');
                DOM.main.append(lineBreak);
            }; 

           
            if ((masterList.data[i].completed === false && masterList.data[i].date < today) || masterList.data[i].date >= today){
                DOM.main.append(renderCard(masterList.data[i]));
                masterList.displayedList.push(masterList.data[i]);
            }
        
           
        }

    }
}

export function renderAddTaskModal(someDiv, arrayOfProjectNames) {
    const addTaskModal = document.createElement("div");
    addTaskModal.classList.add('modal');
    addTaskModal.classList.add('closed');
    addTaskModal.id = 'add-a-task-modal';

    const addTaskModalContent = document.createElement("div");
    addTaskModalContent.classList.add('modal-content');
    
    const taskForm = document.createElement("form");
    taskForm.id = 'task-form';
    
    const emptyDiv1 = document.createElement("div");
    emptyDiv1.textContent = ' ';
    const emptyDiv2 = document.createElement("div");
    emptyDiv2.textContent = ' ';
    const closeModalButton = document.createElement("div");
    closeModalButton.id = 'close-modal-button';

    closeModalButton.innerHTML = '&times';
    
    const emptyDiv3 = document.createElement("div");
    emptyDiv3.textContent = ' ';
    const labelForTaskContent = document.createElement("label");
    labelForTaskContent.for = 'task-content';
    labelForTaskContent.textContent = 'Task:'

    
    
    const taskContent = document.createElement("input");
    taskContent.type = 'text';
    taskContent.id = 'task-content';
    taskContent.name = 'task-content';
    taskContent.placeholder = 'Enter Task';
    taskContent.required = true;
    const emptyDiv4 = document.createElement("div");
    emptyDiv4.textContent = ' ';
    
 
    const labelForDate= document.createElement("label");
    labelForDate.for = 'date';
    labelForDate.textContent = 'Due:';
    const emptyDiv5 = document.createElement("div");
    emptyDiv5.textContent = ' ';

 
    const date = document.createElement("input");
    date.type = 'date';
    date.id = 'date';
    date.name = 'date';
    date.required = true;
    const emptyDiv6 = document.createElement("div");
    emptyDiv6.textContent = ' ';
    
    const priorityTitle = document.createElement("div");
    priorityTitle.textContent = 'Priority:';

    const priorityOptions = document.createElement("div");
    priorityOptions.id = 'priority-options';

    const option1 = document.createElement("div");
    const normalRadio = document.createElement("input");
    normalRadio.type = "radio";
    normalRadio.id = "normal";
    normalRadio.name = "priority";
    normalRadio.value = "normal";
    normalRadio.required = true;

    const normalRadioLabel = document.createElement("label");
    normalRadioLabel.for = "normal";
    normalRadioLabel.textContent = "Normal";

    const option2 = document.createElement("div");
    const highRadio = document.createElement("input");
    highRadio.type = "radio";
    highRadio.id = "high";
    highRadio.name = "priority";
    highRadio.value = "high";
    normalRadio.required = true;

    const highRadioLabel = document.createElement("label");
    highRadioLabel.for = "high";
    highRadioLabel.textContent = "High";
   

    const assignToProjectLabel = document.createElement("label");
    assignToProjectLabel.for = "project";
    assignToProjectLabel.textContent = "Project:"

    const assignToProject = document.createElement("input");
    assignToProject.name = "project";
    assignToProject.id = "project";
    assignToProject.placeholder = "Optional"
    assignToProject.setAttribute("list", "project-list");
    

    const assignToProjectDataList = document.createElement("datalist");
    assignToProjectDataList.id = "project-list";
   
    arrayOfProjectNames.forEach( (entry) => {
        const option = document.createElement("option")
        option.value = entry;
        option.textContent = entry; 
        assignToProjectDataList.append(option);
    })

    assignToProject.append(assignToProjectDataList);

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.id = "modal-submit";
    submitBtn.value = "Submit";
    submitBtn.textContent = "Submit";

    option1.append(normalRadio, normalRadioLabel);
    option2.append(highRadio, highRadioLabel);
    priorityOptions.append(option1, option2);
    taskForm.append(
        emptyDiv1, 
        emptyDiv2,
        closeModalButton, 
        labelForTaskContent, 
        taskContent, 
        emptyDiv3,
        labelForDate, 
        date, 
        emptyDiv4,
       
        priorityTitle, 
        priorityOptions, 
        emptyDiv5,
       
        assignToProjectLabel, 
        assignToProject,
        emptyDiv6,
       
        submitBtn);
    addTaskModalContent.append(taskForm);
    addTaskModal.append(addTaskModalContent);
    someDiv.append(addTaskModal);
}


export function renderSideBar(someDiv, arrayOfProjectNames) {
    if (DOM.sideBar){
    
        DOM.sideBar.parentElement.removeChild(DOM.sideBar);
        
    }
    const sidebarSection = document.createElement("section");
    sidebarSection.id = 'sidebar';
    const listByTime = document.createElement('ul');
    const listItem1 = document.createElement('li');
    const item1Anchor = document.createElement('a');
    item1Anchor.id = 'todays-tasks';
    item1Anchor.href = '#';
    item1Anchor.textContent = "Today";

    listItem1.append(item1Anchor);

    const listItem2 = document.createElement('li');
    const item2Anchor = document.createElement('a');
    item2Anchor.id = 'this-week';
    item2Anchor.href = '#';
    item2Anchor.textContent = "This Week";
    listItem2.append(item2Anchor);
    
    const listItem3 = document.createElement('li');
    const item3Anchor = document.createElement('a');
    item3Anchor.id = 'all-tasks';
    item3Anchor.href = '#';
    item3Anchor.textContent = "All";
    listItem3.append(item3Anchor);

    listByTime.append(listItem1, listItem2, listItem3);

    const listByProject = document.createElement('ul');
    listByProject.id = 'list-by-project';
    const makeLink = function(name, div) {
        const listItem = document.createElement('li');
        const itemAnchor = document.createElement('a');
        itemAnchor.id = name;
        itemAnchor.href = '#';
        itemAnchor.textContent = name;
        const removeProjectBtn = document.createElement('a');
        removeProjectBtn.id = `${name}Remove`;
        removeProjectBtn.href = "#"
        removeProjectBtn.textContent = '×';
        listItem.append(itemAnchor,removeProjectBtn);
        div.append(listItem);
    }
    if (arrayOfProjectNames){
        arrayOfProjectNames.forEach(function(a){ makeLink(a, listByProject) } );
    }
    sidebarSection.append(listByTime, listByProject);
    someDiv.append(sidebarSection);   
}

export function renderHeader(someDiv) {
    const header = document.createElement("header");
    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add-a-task";
    addTaskBtn.textContent = "Add Task";
    header.append(addTaskBtn);
    someDiv.prepend(header);
}

