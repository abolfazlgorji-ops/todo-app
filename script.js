document.addEventListener('DOMContentLoaded', function () {
  const inputBox = document.getElementById("input-box");
  const listContainer = document.querySelector(".list-container");
  const taskCount = document.getElementById("task-count");

  function updateCount() {
    const remaining = listContainer.querySelectorAll("li:not(.checked)").length;
    taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;
    saveData();
  }

  function addTask() {
    if (inputBox.value === '') {
      alert("You must write something");
    } else {
      let li = document.createElement('li');
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);

      let span = document.createElement("span");
      span.innerHTML = "\u00d7"; // × sign
      li.appendChild(span);
    }
    inputBox.value = '';
    updateCount();
  }

  listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle('checked');
      updateCount();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      updateCount();
    }
  });

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateCount();
  }

  showTask();

  window.addTask = addTask;
});
