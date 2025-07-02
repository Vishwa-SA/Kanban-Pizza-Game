
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

  document.querySelector("#todo .cards").appendChild(card);
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
    const limit = e.currentTarget.dataset.wipLimit;

    if (limit && targetCol.children.length >= parseInt(limit)) {
      alert("⚠️ WIP limit reached! Cannot move more cards here.");
      return;
    }

    targetCol.appendChild(card);
    updateDoneCount();
  });
});

function updateDoneCount() {
  const doneCards = document.querySelectorAll("#done .card").length;
  document.getElementById("done-count").textContent = `✅ Done: ${doneCards}`;
}

document.getElementById("start-round").addEventListener("click", () => {
  startTimer(7 * 60);
});

function startTimer(duration) {
  let timer = duration;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    document.getElementById("timer").textContent = `⏱ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (--timer < 0) {
      clearInterval(timerInterval);
      showRetrospective();
      round++;
      document.getElementById("round-count").textContent = `Round: ${round}`;
    }
  }, 1000);
}

function showRetrospective() {
  document.getElementById("retrospective").classList.remove("hidden");
}

function closeRetrospective() {
  document.getElementById("retrospective").classList.add("hidden");
}
