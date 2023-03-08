var items;
var colors;
window.onload = () => {
  items = [];
  colors = [];
  if (localStorage.getItem("nodes") != null) {
    str = localStorage.getItem("nodes").split(",");
    str.forEach((el) => {
      items.push(el);
    });
    col = localStorage.getItem("colors").split(",");
    col.forEach((el) => {
      colors.push(el);
    });
    addNodes();
  }
};

document.querySelector("#close_btn").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("open");
});
document.querySelector(".add_task").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("open");
});

const addable_text = document.querySelector("#txt");
document.querySelector("#submit").addEventListener("click", () => {
  const item = document.querySelector("#new");
  const date = document.querySelector("#date");
  if (item.value.trim() != false && date.value != false) {
    items.push(`${item.value}:${date.value}`);
    colors.push(`aliceblue`);
    localStorage.setItem("nodes", items);
    localStorage.setItem("colors", colors);
  }
  addNodes();
  document.querySelector(".modal").classList.toggle("open");
});
const addNodes = () => {
  let tasks = "";
  if (items.length == 0) {
    tasks += ` <div class="task">
    <div class="check"></div>
    <label class="txt_example" for="id_cbox"> </label>
    <p></p>
  </div>`;
  }
  items.forEach((el, index) => {
    const parts = el.split(":");
    const arr = parts[1].split("-");
    const color = colors[index];
    tasks += `<div class="task">
    <div class="check ${color}" onClick="clickDiv(${index})" id = check${index}></div>
         <label class="txt">${parts[0]}</label>
         <p class = 'cdata'>${arr[2]}-${arr[1]}-${arr[0]}</p>
         <button class="removeBtn" onClick="deleteItem(${index})">✕</button>
       </div>`;
  });
  document.querySelector("#list").innerHTML = tasks;
};
const deleteItem = (ind) => {
  items.splice(ind, 1);
  colors.splice(ind, 1);
  if (items.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("nodes", items);
    localStorage.setItem("colors", colors);
  }
  addNodes();
};
const clickDiv = (ind) => {
  const div = document.querySelector(`#check${ind}`);
  const green = div.classList.toggle("green");
  div.classList.toggle("aliceblue");
  if (green) {
    colors[ind] = "green";
  } else {
    colors[ind] = "aliceblue";
  }
  localStorage.setItem("colors", colors);
};
