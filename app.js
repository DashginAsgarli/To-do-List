let sort = document.querySelector(".icon-1");
let list = document.querySelector(".tasks-container");
let inputAll = document.querySelector(".input-container");
let input = document.querySelector(".input");
let clear = document.querySelector(".clear");
let pulus = document.querySelector(".pulus");
let add = document.querySelector(".add");

// siyahi gorunusu
function listView() {
    if (list.children.length > 0) {
        list.style.display = "block";
        inputAll.style.display = "none";
    } else {
        list.style.display = "none";
        inputAll.style.display = "block";
    }
}
listView();
// add a klikledikde task elave olunmasi
let i = 1;
add.addEventListener("click", () => {
    if (input.value.trim() != "") {
        let item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `<p><b>${i++}.</b></p> <p class="text">${input.value.trim()}</p>  <i class="bi bi-x-circle clear delete-btn "></i>`;
        list.appendChild(item);
        input.value = "";
        listView();
        item.draggable = true;
    }
});
// inputun x nin islemesi  
clear.addEventListener("click", () => input.value = "");

// plusa klikledikde inputun acilmasi
pulus.addEventListener("click", () => inputAll.style.display = "block");

// siyahida x nin islemesi silme 
list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) { e.target.parentElement.remove() }
    listView()
});

// tasklarin sortlanmasi
sort.addEventListener("click", () => {
    let arr = [...list.children];
    let sortIcon = sort.classList.contains("bi-sort-down-alt");
    sort.classList.toggle("bi-sort-down-alt");
    sort.classList.toggle("bi-sort-up-alt");
    arr.sort((a, b) => {
        let first = a.querySelector(".text").textContent;
        let second = b.querySelector(".text").textContent;
        return sortIcon ? second.localeCompare(first) : first.localeCompare(second);
    });
    arr.forEach((a) => list.appendChild(a));

});
// drag and drop funksiyasi chatgbtden istifade etmisem amma bele basa dusudum
list.addEventListener("dragstart", (e) => e.target.classList.contains("item") ? b = e.target : null);

list.addEventListener("dragover", (e) => {
    let a = e.target.closest(".item");
    let arr = [...list.querySelectorAll(".item")];
    if (arr.indexOf(a) > arr.indexOf(b)) {
        list.insertBefore(b, a.nextSibling);
    } else {
        list.insertBefore(b, a);
    }
});