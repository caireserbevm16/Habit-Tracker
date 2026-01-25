document.addEventListener("DOMContentLoaded", () => {
  let timer = null;

  const startBtn = document.querySelector(".start");
  const stopBtn = document.querySelector(".stop");
  const habitSelect = document.querySelector("select");
  const intervalInput = document.querySelector("input");
  const statusText = document.querySelector(".status-box p");
  const statusDot = document.querySelector(".dot");
  const countText = document.querySelector(".count");
  const progressFill = document.querySelector(".progress-fill");

  let data = JSON.parse(localStorage.getItem("habitData")) || {
    completed: 0,
    date: new Date().toDateString()
  };

  updateUI();
  setActiveState(false);

  startBtn.addEventListener("click", () => {
    const minutes = Number(intervalInput.value);
    if (!minutes || minutes <= 0) return alert("Enter valid minutes");

    clearInterval(timer);
    setActiveState(true);

    statusText.textContent = "Active";
    statusDot.style.background = "green";

    timer = setInterval(() => {
      data.completed++;
      localStorage.setItem("habitData", JSON.stringify(data));
      updateUI();
      alert("Habit reminder!");
    }, minutes * 60 * 1000);
  });

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    setActiveState(false);
    statusText.textContent = "Stopped";
    statusDot.style.background = "gray";
  });

  function updateUI() {
    countText.textContent = data.completed;
    progressFill.style.width = Math.min(data.completed * 10, 100) + "%";
  }

  function setActiveState(active) {
    startBtn.disabled = active;
    stopBtn.disabled = !active;
  }
});
