"use strict"

// Complete the "week" option. Add a "Past Due" category
// Maybe the sidebar should be radio buttons 
export function renderMain(masterList, main, option, projectName = null) {
    let today = new Date();
    let todayGroup = null;
    // First remove everything from main
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    console.log(option)

    switch(option) {
        case 'byProject':
            const projectList = masterList.produceProjectList(projectName);
            const projectHeading = document.createElement("div");
            projectHeading.classList.add('heading');
            projectHeading.textContent = projectName;
            main.append(projectHeading);
            for (let i = 0; i < projectList.length; i++){
                if (projectList[i].date.getDate() == today.getDate() && projectList[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('subheading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
                if (( projectList[i].date.getDate() != today.getDate() && todayGroup == 1 ) || ( projectList[i].date.getMonth() != today.getMonth() && todayGroup == 1 ))  {
                    todayGroup = null;
                    const lineBreak = document.createElement('hr');
                    main.append(lineBreak);
                }; 
                main.append(projectList[i].htmlFormat());
            }
            return;
        
        case 'today':
            for (let i = 0; i < masterList.data.length; i++){
                if (masterList.data[i].date.getDate() == today.getDate() && masterList.data[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('heading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
        
                if ((masterList.data[i].date.getDate() != today.getDate()) ||  (masterList.data[i].date.getMonth() != today.getMonth()) ) {
                 
                    return;
                }; 
            
                main.append(masterList.data[i].htmlFormat());
            }
            break;

        case 'thisWeek':
            break;
        
        default:
            console.log('there')
            for (let i = 0; i < masterList.data.length; i++){
                if (masterList.data[i].date.getDate() == today.getDate() && masterList.data[i].date.getMonth() == today.getMonth() && todayGroup == null ) {
                    todayGroup = 1;
                    const todayHeading = document.createElement("div");
                    todayHeading.classList.add('heading');
                    todayHeading.textContent = 'Today';
                    main.append(todayHeading);
                }; 
        
                if ((masterList.data[i].date.getDate() != today.getDate() && todayGroup == 1) ||  (masterList.data[i].date.getMonth() != today.getMonth() && todayGroup == 1) ) {
                    todayGroup = null;
                    const lineBreak = document.createElement('hr');
                    main.append(lineBreak);
                }; 
                main.append(masterList.data[i].htmlFormat());
            


            } 
            return
    }
}

// Modify renderAddTasksModal to accept an array of projectNames after someDiv 
// and use this array as the select options
export function renderAddTaskModal(someDiv) {
    const addTaskModal = document.createElement("div");
    addTaskModal.classList.add('modal');
    addTaskModal.classList.add('closed');
    addTaskModal.id = 'add-a-task-modal';

    const addTaskModalContent = document.createElement("div");
    addTaskModalContent.classList.add('modal-content');
    
    const taskForm = document.createElement("form");
    taskForm.id = 'task-form';
    
    const emptyDiv = document.createElement("div");
    const closeModalButton = document.createElement("div");
    closeModalButton.id = 'close-modal-button';

    closeModalButton.innerHTML = '&times';
    
    const labelForTaskContent = document.createElement("label");
    labelForTaskContent.for = 'task-content';
    labelForTaskContent.textContent = 'Task:'
    
    const taskContent = document.createElement("input");
    taskContent.type = 'text';
    taskContent.id = 'task-content';
    taskContent.name = 'task-content';
    taskContent.placeholder = 'Enter Task';
    taskContent.required = true;
    
    const labelForDate= document.createElement("label");
    labelForDate.for = 'date';
    labelForDate.textContent = 'Due:';

    const date = document.createElement("input");
    date.type = 'date';
    date.id = 'date';
    date.name = 'date';
    date.required = true;

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
   
    const projectOption1 = document.createElement("option");
    projectOption1.value = "Coding";
    projectOption1.textContent = "Coding"; 

    assignToProjectDataList.append(projectOption1);
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
        emptyDiv, 
        closeModalButton, 
        labelForTaskContent, 
        taskContent, 
        labelForDate, 
        date, 
        priorityTitle, 
        priorityOptions, 
        assignToProjectLabel, 
        assignToProject,
        submitBtn);
    addTaskModalContent.append(taskForm);
    addTaskModal.append(addTaskModalContent);
    someDiv.append(addTaskModal);
}

//export function renderSideBar(arrayOfProjectNames)
export function renderSideBar(someDiv) {
    const sidebarSection = document.createElement("section");
    sidebarSection.id = 'sidebar';
    sidebarSection.textContent = "Upcoming Tasks";

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

    //How to add By Project?

    sidebarSection.append(listByTime);
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

/*
<header>
<div>
    <button id="add-a-task">Add task</button>
</div>
<div>
    <button id="add-a-project">Add project</button>
</div>
</header>
*/