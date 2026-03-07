let sort = document.querySelector(".icon-1");
let list = document.querySelector(".tasks-container");
let inputAll = document.querySelector(".input-container");
let input = document.querySelector(".input");
let clear = document.querySelector(".clear");
let plus = document.querySelector(".pulus");
let add = document.querySelector(".add");
let itemsLeft = document.getElementById("items-left");
let clearAllBtn = document.getElementById("clear-all");
let confirmBox = document.getElementById("confirm-box");
let yesClear = document.getElementById("yes-clear");
let noClear = document.getElementById("no-clear");

let tasks = JSON.parse(localStorage.getItem("todo-items")) || [];

function saveToLocal() {
    const currentTasks = [];
    list.querySelectorAll(".item").forEach(item => {
        currentTasks.push({
            text: item.querySelector(".text").textContent,
            completed: item.classList.contains("completed")
        });
    });
    localStorage.setItem("todo-items", JSON.stringify(currentTasks));
}

function refreshUI() {
    const items = list.querySelectorAll(".item");
    list.style.display = items.length > 0 ? "block" : "none";
    inputAll.style.display = items.length > 0 ? "none" : "block";
    let activeCount = 0;
    items.forEach((item, index) => {
        item.querySelector(".num").textContent = `${index + 1}.`;
        if (!item.classList.contains("completed")) activeCount++;
    });
    itemsLeft.textContent = `${activeCount} items left`;
    saveToLocal();
}


function createTaskElement(task) {
    let item = document.createElement("div");
    item.classList.add("item");
    item.draggable = true;
    if (task.completed) item.classList.add("completed");
    item.innerHTML = `
        <p><b class="num"></b></p> 
        <p class="text">${task.text}</p>
        <i class="bi bi-x-circle delete-btn"></i>
    `;
    item.addEventListener("dragstart", () => item.classList.add("dragging"));
    item.addEventListener("dragend", () => item.classList.remove("dragging"));

    list.appendChild(item);
}
add.addEventListener("click", () => {
    let val = input.value.trim();
    if (val !== "") {
        createTaskElement({ text: val, completed: false });
        input.value = "";
        refreshUI();
    }
});

clear.addEventListener("click", () => input.value = "");
plus.addEventListener("click", () => inputAll.style.display = "block");

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        refreshUI();
    }
    else if (e.target.closest(".item")) {
        e.target.closest(".item").classList.toggle("completed");
        refreshUI();
    }
});

sort.addEventListener("click", () => {
    let arr = [...list.children];
    let isDescending = sort.classList.contains("bi-sort-down-alt");

    sort.classList.toggle("bi-sort-down-alt");
    sort.classList.toggle("bi-sort-up-alt");

    arr.sort((a, b) => {
        let t1 = a.querySelector(".text").textContent.toLowerCase();
        let t2 = b.querySelector(".text").textContent.toLowerCase();
        return isDescending ? t2.localeCompare(t1) : t1.localeCompare(t2);
    });

    arr.forEach(node => list.appendChild(node));
    refreshUI();
});

list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const siblings = [...list.querySelectorAll(".item:not(.dragging)")];

    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    list.insertBefore(draggingItem, nextSibling);
});

list.addEventListener("dragend", refreshUI);

clearAllBtn.addEventListener("click", () => {
    if (list.children.length > 0) confirmBox.style.display = "block";
});

yesClear.addEventListener("click", () => {
    list.innerHTML = "";
    confirmBox.style.display = "none";
    refreshUI();
});

noClear.addEventListener("click", () => confirmBox.style.display = "none");

tasks.forEach(task => createTaskElement(task));
refreshUI();