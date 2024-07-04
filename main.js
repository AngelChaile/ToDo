let IdCounter = 0;

const input = document.querySelector(`input[type="text"]`);
const list = document.getElementById('list');
const stats = document.getElementById('stats');
const userInput = document.getElementById('userInput');

// Cargar tareas desde localStorage al cargar la página
window.onload = () => {
    loadTasks(); 
};

// Escucha el evento 'submit' del formulario para agregar una nueva tarea
userInput.addEventListener('submit', (event) => {
    event.preventDefault(); 
    addTask(); 
});

// Función para agregar una nueva tarea a la lista
let addTask = () => {
    IdCounter++; 

    let newValue = input.value; 

    if (newValue.trim() === '') return; 

    
    list.innerHTML += `
    <div class="task-container" id="${IdCounter}">
        <label>
            <input type="checkbox">
            ${newValue}
        </label>
        <img src="./img/basurero.png" alt="basurero" class="closeBtn">
    </div>`;
    input.value = ''; 
    updateStats(); 
    saveTasks(); 
};


list.addEventListener('click', (event) => {
    if (event.srcElement.nodeName == 'INPUT') {
        updateStats(); 
        saveTasks(); 
    } else if (event.srcElement.nodeName == 'IMG') {
        deleteTask(event.srcElement.parentNode.id); 
    }
});

// Función para actualizar las estadísticas de las tareas
function updateStats() {
    let element = list.querySelectorAll('div'); 
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked'); 
    stats.innerHTML = `<p>Tareas pendientes: ${element.length} Completadas: ${checkbox.length}</p>`; 
}

// Función para eliminar una tarea de la lista
let deleteTask = (id) => {
    let taskToDelete = document.getElementById(id); 
    list.removeChild(taskToDelete); 
    updateStats(); 
    saveTasks(); 
};

// Función para guardar las tareas en localStorage
let saveTasks = () => {
    let tasks = []; 
    let taskElements = list.querySelectorAll('.task-container'); 
    taskElements.forEach(taskElement => {
        let task = {
            id: taskElement.id,
            text: taskElement.querySelector('label').innerText.trim(), 
            completed: taskElement.querySelector('input[type="checkbox"]').checked 
        };
        tasks.push(task); 
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

// Función para cargar las tareas desde localStorage
let loadTasks = () => {
    let tasks = localStorage.getItem('tasks'); 
    if (tasks) {
        tasks = JSON.parse(tasks); 
        tasks.forEach(task => {
            IdCounter = Math.max(IdCounter, task.id);
            list.innerHTML += `
            <div class="task-container" id="${task.id}">
                <label>
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    ${task.text}
                </label>
                <img src="./img/basurero.png" alt="basurero" class="closeBtn">
            </div>`;
        });
        updateStats(); 
    }
};
