function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const card = document.getElementById(data);
  const target = ev.target.classList.contains("column") ? ev.target : ev.target.closest(".column");

  if (target.id === "oven" && target.children.length > 3) {
    alert("WIP limit reached: Max 3 pizzas in oven!");
    return;
  }

  if (target) target.appendChild(card);
}

// Round timer
let roundInterval, ovenInterval;

function startRound() {
  let duration = 7 * 60;
  clearInterval(roundInterval);
  roundInterval = setInterval(() => {
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    document.getElementById("round-timer").innerText = \`Round: \${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
    if (--duration < 0) clearInterval(roundInterval);
  }, 1000);
}

function startOvenTimer() {
  let duration = 30;
  clearInterval(ovenInterval);
  ovenInterval = setInterval(() => {
    const secs = duration;
    document.getElementById("oven-timer").innerText = \`Oven: 00:\${String(secs).padStart(2, '0')}\`;
    if (--duration < 0) clearInterval(ovenInterval);
  }, 1000);
}
