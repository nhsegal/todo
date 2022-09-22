/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/



const addTaskBtn = document.querySelector("#add-a-task");
const addTaskModal = document.querySelector("#add-a-task-modal");
const closeModalButton = document.querySelectorAll(".close-modal-button");


const toggleModal= () => {
    /*
    let title = document.getElementById('title');
    title.value = '';
    let author = document.getElementById('author');
    author.value = '';
    let pages = document.getElementById('pages');
    pages.value = '';
    let no = document.getElementById('no');
    no.checked = false;
    let reading = document.getElementById('reading');
    reading.checked = false;
    let yes = document.getElementById('yes');
    yes.checked = false;
    */
    addTaskModal.toggle("show-modal");
}




addTaskBtn.addEventListener("click", toggleModal);
//addBookBtn.addEventListener("click", myLibrary.toggleModal);
//closeModalButton.addEventListener("click", myLibrary.toggleModal);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7O0FBR2I7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cblxuY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFza1wiKTtcbmNvbnN0IGFkZFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWEtdGFzay1tb2RhbFwiKTtcbmNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNsb3NlLW1vZGFsLWJ1dHRvblwiKTtcblxuXG5jb25zdCB0b2dnbGVNb2RhbD0gKCkgPT4ge1xuICAgIC8qXG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyk7XG4gICAgdGl0bGUudmFsdWUgPSAnJztcbiAgICBsZXQgYXV0aG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhvcicpO1xuICAgIGF1dGhvci52YWx1ZSA9ICcnO1xuICAgIGxldCBwYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlcycpO1xuICAgIHBhZ2VzLnZhbHVlID0gJyc7XG4gICAgbGV0IG5vID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vJyk7XG4gICAgbm8uY2hlY2tlZCA9IGZhbHNlO1xuICAgIGxldCByZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWRpbmcnKTtcbiAgICByZWFkaW5nLmNoZWNrZWQgPSBmYWxzZTtcbiAgICBsZXQgeWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3llcycpO1xuICAgIHllcy5jaGVja2VkID0gZmFsc2U7XG4gICAgKi9cbiAgICBhZGRUYXNrTW9kYWwudG9nZ2xlKFwic2hvdy1tb2RhbFwiKTtcbn1cblxuXG5cblxuYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlTW9kYWwpO1xuLy9hZGRCb29rQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBteUxpYnJhcnkudG9nZ2xlTW9kYWwpO1xuLy9jbG9zZU1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBteUxpYnJhcnkudG9nZ2xlTW9kYWwpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9