
var todoList = {

  // This is the "place" where we store our todos.
  todos: [],

  addTodo: function(todoText) {
    // We crate a todo item as an Object. It has todo description and
    // information about it's completion status.
    var todo = {
      todoText: todoText,
      completionStatus: false,
    };
    // We add new todo item to our todos array-container and then display
    // all of them.
    this.todos.unshift(todo);
    view.displayTodos();
    view.styleCompletedTodos();
  },

  deleteTodo: function(deletedTodoPosition) {
    this.todos.splice(deletedTodoPosition, 1);
    view.displayTodos();
  },

  deleteAll: function() {
    this.todos = [];
    view.displayTodos();
  },

  // Changing todo completion status
  toggleCompletion: function(todoPosition) {
    var todo = this.todos[todoPosition]
    todo.completionStatus = !todo.completionStatus;
    view.displayTodos();
    view.styleCompletedTodos();
  }
}






// Here we gather all user action handlers.
var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },

  addTodo: function() {
    var todoText = document.getElementById('todoTextInput');
    if(!(todoText.value === "")) {
      todoList.addTodo(todoText.value);
      // Clearing the todoTextInput field.
      todoText.value = "";
    }
  },

  deleteAll: function() {
    todoList.deleteAll();
  },
}






// We create Object responsible for displaying things for user.
var view = {

  displayTodos: function() {

    var todoUl = document.getElementById('todoList');
    todoUl.innerHTML = '';
    for(var i = 0; i < todoList.todos.length; i++) {

      // Creating and displaying todo li for every todo in todoList.todos
      var todoLi = document.createElement('li');
      todoLi.textContent = todoList.todos[i].todoText;
      todoLi.className = 'todo-list__item'
      todoUl.appendChild(todoLi);
      // Creating and displaying delete button for every todo li item
      var deleteTodo = document.createElement('button');
      deleteTodo.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteTodo.className += 'delete-button';
      deleteTodo.id = i;
      deleteTodo.setAttribute('title', 'delete todo');
      todoLi.appendChild(deleteTodo);
      // Creating and displaying "toggle completion status" button for every
      // todo li and styling li's acordingly to is's completion status.
      var toggleBtn = document.createElement('button');
      toggleBtn.className = 'toggle-button';
      toggleBtn.setAttribute('title', 'mark as completed');
      var todoCompletionStatus = todoList.todos[i].completionStatus;
      if(todoCompletionStatus === true) {
        toggleBtn.innerHTML = '<i class="fas fa-check-circle"></i>';

      } else {
        toggleBtn.innerHTML = '<i class="far fa-check-circle"></i>';
      }
      toggleBtn.id = i;
      todoLi.appendChild(toggleBtn);
    }
    this.displayDeleteAllButton();
    // Creating some spacing around todo li's
    var todoListWrapper = document.getElementById('todoListWrapper');
    if (todoList.todos.length > 0) {
      todoListWrapper.style.padding = '20px';
    } else if (todoList.todos.length === 0) {
      todoListWrapper.style.padding = '0px';
    }
  },

  styleCompletedTodos: function() {
    var todoLi = document.getElementsByTagName('li');
    for(var i = 0; i < todoLi.length; i++) {
      if(todoList.todos[i].completionStatus === true) {
        todoLi[i].classList.add('todo-list__item--completed');
      } else {
        todoLi[i].classList.remove('todo-list__item--completed');
      }
    }
  },

  displayDeleteAllButton: function() {
    // Displaying #deleteAllBtn if there are at least 2 todo's
    var deleteAllButton = document.getElementById('deleteAllBtn');
    if (todoList.todos.length > 1) {
      deleteAllBtn.style.display = 'block';
    } else {
      deleteAllBtn.style.display = 'none';
    }
  },

  deleteTodo: function(deletedTodoIndex) {
    todoList.deleteTodo(deletedTodoIndex);
  },

  toggleTodoStatus: function(deletedTodoIndex){
    todoList.toggleCompletion(deletedTodoIndex);
  },
}



// Here we define what needs to be done after user cliks button.

var addTodoBtn = document.getElementById('addTodoBtn');
addTodoBtn.addEventListener('click', handlers.addTodo);

var deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click', handlers.deleteAll);

var todoTextInput = document.getElementById('todoTextInput');
todoTextInput.addEventListener('keypress', function(event) {
  if(event.keyCode==13){
  document.getElementById('addTodoBtn').click()
  }
});

// After we check which button user clicked,
// we decide here what to do when user clicks delete or toggle button.
var todoUl = document.getElementById('todoList');
todoUl.addEventListener('click', function(event) {
  // debugger;    // We need to define the event object and pass it to
  if( !event ) {event = window.event};                      // the all outer functions we use. It's workaround for Firefox
  var clickedElement = event.target;
  if (clickedElement.classList.contains('delete-button')) {
    var deletedTodoIndex = clickedElement.id;
    view.deleteTodo(deletedTodoIndex);
  } else if (clickedElement.classList.contains('fa-trash-alt')) {
    deletedTodoIndex = clickedElement.parentElement.id;
    view.deleteTodo(deletedTodoIndex);
  } else if ((clickedElement.tagName === 'path') && (clickedElement.parentElement.parentElement.classList.contains('delete-button'))) {
    deletedTodoIndex = clickedElement.parentElement.parentElement.id;
    view.deleteTodo(deletedTodoIndex);
  } else if (clickedElement.classList.contains('toggle-button')) {
    var deletedTodoIndex = clickedElement.id;
    view.toggleTodoStatus(deletedTodoIndex);
  } else if (clickedElement.classList.contains('fa-check-circle')) {
    deletedTodoIndex = clickedElement.parentElement.id;
    view.toggleTodoStatus(deletedTodoIndex);
  } else if ((clickedElement.tagName === 'path') && (clickedElement.parentElement.parentElement.classList.contains('toggle-button'))) {
    deletedTodoIndex = clickedElement.parentElement.parentElement.id;
    view.toggleTodoStatus(deletedTodoIndex);
  }
});
