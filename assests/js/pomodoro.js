// POMODORO

// session
const sessionData = {
    title: 'Pomodoro',
    pomodoro: 25,
    break: 5,
  };
  
  //selectors
  const title = document.querySelector('.app-header');
  
  //settings selectors
  const settings = document.querySelector('.fa-cog');
  const modal = document.querySelector('.modal');
  const settingsPanel = document.querySelector('.settings-panel');
  const closeBtn = document.querySelector('.close-btn');
  const timer = document.getElementById('timer');
  const breakTime = document.getElementById('break');
  const applyBtn = document.querySelector('#applySettings');
  
  // tabs selectors
  const tabs = document.querySelectorAll('[data-tab-target]');
  const tabContents = document.querySelectorAll('[data-tab-content]');
  
  // timers selectors
  const playPausePomodoro = document.getElementById('pomodoro-playPause');
  var pomodoroPaused = true;
  var mainMins = sessionData.pomodoro;
  var mainSecd = 0;
  let pomodoroInterval;
  const mainMinutes = document.getElementById('pomodoro-minutes');
  const mainSeconds = document.getElementById('pomodoro-seconds');
  mainMinutes.innerText = mainMins;
  
  const playPauseBreak = document.getElementById('break-playPause');
  var breakPaused = true;
  var breakMins = sessionData.break;
  var breakSecd = 0;
  let breakInterval;
  const breakMinutes = document.getElementById('break-minutes');
  const breakSeconds = document.getElementById('break-seconds');
  breakMinutes.innerText = breakMins;
  
  // Event listeners
  title.addEventListener('change', ()=>{
    sessionData.title = title.value;
  })
  
  settings.addEventListener('click', openSettings);
  
  timer.addEventListener('change', ()=>{
    sessionData.pomodoro = timer.value;
    // mainMins = sessionData.pomodoro;
  });
  
  breakTime.addEventListener('change', ()=>{
    sessionData.break = breakTime.value;
    // breakMins = sessionData.break;
  });
  
  playPausePomodoro.addEventListener('click', ()=>{
    if(pomodoroPaused){
      pomodoroPaused = false;
      playPausePomodoro.innerText = 'pause';
      pomodoroInterval = setInterval(checkPomodoroTime, 1000);
    }
    else{
      pomodoroPaused = true;
      playPausePomodoro.innerText = 'play';
      clearInterval(pomodoroInterval);
    }
  });
  
  playPauseBreak.addEventListener('click', ()=>{
    if(breakPaused){
      breakPaused = false;
      playPauseBreak.innerText = 'pause';
      breakInterval = setInterval(checkBreakTime, 1000);
    }
    else{
      breakPaused = true;
      playPauseBreak.innerText = 'play';
      clearInterval(breakInterval);
    }
  });
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const activeTab = document.querySelector('.activeLi');
      activeTab.classList.remove('activeLi');
      tab.classList.add('activeLi');
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach(tabContent => {
        tabContent.style.display="none";
      });
      target.style.display="grid";
    });
  });
  
  function openSettings(){
    modal.style.display = 'grid';
    modal.addEventListener('click', (e) => {
      if(e.target == modal || e.target == closeBtn){
        e.preventDefault();
        modal.style.display = 'none';
        applyBtn.removeEventListener('click', applyEvent);
      }
    });
    
    applyBtn.addEventListener('click', (e) => applyEvent(e));
  }
  
  function applyEvent(e){
    e.preventDefault();
    modal.style.display = 'none';
    if(timer.value == 0) return;
    else{
      mainMins = timer.value;
      mainMinutes.innerText = mainMins;
    }
  }
  
  function checkPomodoroTime(){
    if(mainSecd == 0 && mainMins == 0) clearInterval(breakInterval);
    if(mainSecd == 0){
      mainMins--;
      mainMinutes.innerText = mainMins;
      mainSecd = 60;
    }
    mainSecd--;
    mainSecd = mainSecd >= 10 ? mainSeconds.innerText = mainSecd : mainSeconds.innerHTML = '0' + mainSecd;
    if(mainMins == 0) clearInterval(pomodoroInterval);
  }
  
  function checkBreakTime(){
    breakSecd--;
    breakSecd = mainSecd >= 10 ? breakSeconds.innerText = breakSecd : breakSeconds.innerHTML = '0' + breakSecd;
    if(breakSecd == 0){
      breakMins--;
      breakMinutes.innerText = breakMins;
      breakSecd = 60;
    }
    if(breakMins == 0) clearInterval(breakInterval);
  }
  
  // TODO APP
  
  function clearTasks() {
    if(confirm("Clear all tasks from the list?")){
        const tasks = document.querySelectorAll(".task");
  
        tasks.forEach(function (task) {
          removeLocaltasks(task);
          task.remove();
          checkList();
        });
  
        setBackToDefault();
        displayNotif("Deleted all tasks from the list", "warning");
    }
  }
  
  function deletecheck(e){
  
    //delete
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
      setBackToDefault();
      const task = item.parentElement;
      //task.classList.add("fade");
      displayNotif("Task deleted", "warning");
      removeLocaltasks(task);
      task.remove();
      checkList();
    }
  
    //check
    if (item.classList[0] === "check") {
      const task = item.parentElement.parentElement.parentElement;
      task.classList.toggle("completed");
      if (task.classList.contains("completed")) {
        displayNotif("Task completed", "success");
      } else {
        displayNotif("Task unchecked", "warning");
      }
    }
  
    //edit
    if (item.classList[0] === "task-item") {
      editElement = item;
      taskInput.value = editElement.innerText;
      taskInput.focus();
      editFlag = true;
      editId = editElement.dataset.id;
    }
  
  }
  
  
  function setBackToDefault() {
    editFlag = false;
    taskInput.value = "";
    editId = "";
  }
  
  function filter(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function (task) {
      switch (e.target.value) {
        case "All":
          task.style.display = "flex";
          checkList();
          break;
        case "Completed":
          if (task.classList.contains("completed")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
          checkList();
          break;
        case "Remaining":
          if (!task.classList.contains("completed")) {
            task.style.display = "flex";
          } else {
            task.style.display = "none";
          }
          checkList();
          break;
      }
    });
  }
  
  //selectors
  
  const notifs = document.getElementById("notif-container");
  const taskInput = document.querySelector(".task-input");
  const taskButton = document.querySelector(".task-btn");
  const emptyDiv = document.querySelector(".empty");
  const taskList = document.querySelector(".task-list");
  const clrtask = document.querySelector(".clr-task");
  const color = document.querySelector(".color");
  const hex = ["0", "1", "2", "3", "4", "5", "6", "7",
               "8", "9", "B", "C", "D", "E", "F"];
  let editFlag = false;
  let editId = "";
  let editElement;
  
  //eventlisteners
  document.addEventListener("DOMContentLoaded", getTasks);
  //taskInput.addEventListener('input', markdown);
  taskButton.addEventListener("click", addtask);
  taskList.addEventListener("click", deletecheck);
  clrtask.addEventListener("click", clearTasks);
  color.addEventListener("click", function () {
    let hexcolor = "#";
    for (i = 0; i < 6; i++) {
      hexcolor += hex[getRandomNumber()];
    }
    document.documentElement.style.setProperty("--theme", hexcolor);
  });
  
  //functions
  
  function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
  }
  
  function markdown(){
    var text = taskInput.value;
    
  }
  
  function addtask(event) {
    event.preventDefault();
    const id = new Date().getTime().toString();
  
    if (taskInput.value && !editFlag) {
  
      //id
      const attr = document.createAttribute("data-id");
      attr.value = id;
  
      //new div
      const taskdiv = document.createElement("div");
      taskdiv.classList.add("task");
  
      //Completed button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<label class="checkbox"><input type="checkbox" class="check" /><svg viewBox="0 0 24 24" filter="url(#goo-light)"><path class="tick" d="M4.5 10L10.5 16L24.5 1" /><circle class="dot" cx="10.5" cy="15.5" r="1.5" /><circle class="drop" cx="25" cy="-1" r="2" /></svg></label>';
      completedButton.classList.add("complete-btn");
      taskdiv.appendChild(completedButton);
  
      //new list
      const newtask = document.createElement("li");
      newtask.setAttributeNode(attr);
      let value = taskInput.value;
      newtask.innerText = value;
      newtask.classList.add("task-item");
      taskdiv.appendChild(newtask);
  
      //Trash Button
      const trashbtn = document.createElement("button");
      trashbtn.innerHTML = '<i class="fas fa-times"></i>';
      trashbtn.classList.add("trash-btn");
      taskdiv.appendChild(trashbtn);
  
      //saveLocal
      saveLocaltasks(id, taskInput.value);
      //append
      taskList.appendChild(taskdiv);
      taskdiv.scrollIntoView();
      //clear input
      taskInput.value = "";
      displayNotif("Task added to the list", "success");
      checkList();
  
    } else if (taskInput.value && editFlag) {
      let value = taskInput.value;
      editElement.innerText = value;
      displayNotif("Task edited", "success");
      editLocalTasks(editId, value);
      setBackToDefault();
  
    } else {
      displayNotif("Please enter a value", "warning");
    }
  
  }
  
  function displayNotif(text, action) {
    const notif = document.createElement('p');
    notif.innerText = text;
    notif.classList.add("notif");
    notif.classList.add(`alert-${action}`);
    notifs.appendChild(notif);
    //remove alert
    setTimeout(function () {
      notifs.removeChild(notif);
    }, 2000);
  }
  
  function saveLocaltasks(id, value) {
    const items = { id, value };
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  
    tasks.push(items);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  
    tasks.forEach((task) => {
      //id
      const attr = document.createAttribute("data-id");
      attr.value = task.id;
  
      //new div
      const taskdiv = document.createElement("div");
      taskdiv.classList.add("task");
  
      //Completed button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<label class="checkbox"><input type="checkbox" class="check"/><svg viewBox="0 0 24 24" filter="url(#goo-light)"><path class="tick" d="M4.5 10L10.5 16L24.5 1" /><circle class="dot" cx="10.5" cy="15.5" r="1.5" /><circle class="drop" cx="25" cy="-1" r="2" /></svg></label>';
      completedButton.classList.add("complete-btn");
      taskdiv.appendChild(completedButton);
  
      //new list
      const newtask = document.createElement("li");
      newtask.setAttributeNode(attr);
      let value = task.value;
      newtask.innerText = value;
      newtask.classList.add("task-item");
      taskdiv.appendChild(newtask);
  
      //Trash Button
      const trashbtn = document.createElement("button");
      trashbtn.innerHTML = '<i class="fas fa-times"></i>';
      trashbtn.classList.add("trash-btn");
      taskdiv.appendChild(trashbtn);
  
      //append
      taskList.appendChild(taskdiv);
    });
  }
  
  function editLocalTasks(id, value) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  
    tasks = tasks.map((task) => {
      if (task.id == id) {
        task.value = value;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function removeLocaltasks(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  
    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function checkList() {
    const tasks = taskList.childNodes;
    if (tasks.length == 0) {
      taskList.style.display = "none";
    } else {
      taskList.style.display = "block";
    }
  }
  
  window.addEventListener("load", () => {
    checkList();
  });