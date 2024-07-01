document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector(".todo-input");
    const addButton = document.querySelector(".add-button");
    const todos = document.querySelector(".todos");
    const emptyImage = document.querySelector(".empty-image");
    let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
    const deleteAllButton = document.querySelector(".delete-all");
    const filters = document.querySelectorAll(".filter");
    let filter = '';

    showTodos();

    function getTodoHtml(todo, index) {
        if (filter && filter !== todo.status) {
            return '';
        }
        let checked = todo.status === "completed" ? "checked" : "";
        let todoClass = todo.status === "completed" ? "todo completed" : "todo";
        return `
            <li class="${todoClass}">
                <label for="todo-${index}">
                    <input id="todo-${index}" type="checkbox" ${checked}>
                    <span>${todo.name}</span>
                    <span class="timestamp">${todo.timestamp}</span>
                </label>
                <button class="delete-btn" data-index="${index}"><i class="fa fa-times"></i></button>
            </li>
        `;
    }

    function showTodos() {
        let incompleteTodos = todosJson.filter(todo => todo.status !== "completed");
        if (incompleteTodos.length === 0) {
            todos.innerHTML = '';
            emptyImage.style.display = 'block';
        } else {
            todos.innerHTML = incompleteTodos.map(getTodoHtml).join('');
            emptyImage.style.display = 'none';
        }
    }

    function addTodo() {
        let todo = input.value.trim();
        if (!todo) {
            return;
        }
        const timestamp = new Date().toLocaleString();
        todosJson.unshift({ name: todo, status: "pending", timestamp: timestamp });
        localStorage.setItem("todos", JSON.stringify(todosJson));
        input.value = "";
        showTodos();
    }

    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    addButton.addEventListener("click", addTodo);

    function updateStatus(todo) {
        let index = todo.id.split('-')[1];
        if (todo.checked) {
            todosJson[index].status = "completed";
        } else {
            todosJson[index].status = "pending";
        }
        localStorage.setItem("todos", JSON.stringify(todosJson));
        showTodos();
    }

    todos.addEventListener("change", (e) => {
        if (e.target.tagName === "INPUT") {
            updateStatus(e.target);
        }
    });

    todos.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            let index = e.target.dataset.index;
            todosJson.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todosJson));
            showTodos();
        }
    });

    filters.forEach((el) => {
        el.addEventListener("click", (e) => {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
                filter = '';
            } else {
                filters.forEach((tag) => tag.classList.remove('active'));
                el.classList.add('active');
                filter = e.target.dataset.filter;
            }
            showTodos();
        });
    });

    deleteAllButton.addEventListener("click", () => {
        todosJson = [];
        localStorage.setItem("todos", JSON.stringify(todosJson));
        showTodos();
    });

});
