
let round = 1;
let timerInterval;

document.getElementById("add-task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const toppings = document.getElementById("topping-select").value;
  const taskText = input.value.trim();
  if (taskText === "") return;

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<strong>${taskText}</strong><br>${toppings}`;
  card.id = "card-" + Date.now();
  card.draggable = true;
  addDragEvents(card);

  document.querySelector("#funnel .cards").appendChild(card);
  input.value = "";
});

function addDragEvents(card) {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  });
}

document.querySelectorAll(".column").forEach((col) => {
  col.addEventListener("dragover", (e) => e.preventDefault());
  col.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const card = document.getElementById(id);
    const targetCol = e.currentTarget.querySelector(".cards");
    const wipInput = e.currentTarget.querySelector(".wip-input");
    const limit = wipInput ? parseInt(wipInput.value) : null;

    if (limit && targetCol.children.length >= limit) {
      alert("⚠️ WIP limit reached! Cannot move more cards here.");
      return;
    }

    targetCol.appendChild(card);
  });
});

document.querySelectorAll(".wip-input").forEach(input => {
  input.addEventListener("change", function() {
    this.parentElement.parentElement.setAttribute("data-wip-limit", this.value);
  });
});
