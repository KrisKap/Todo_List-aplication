
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
      todoLi.textContent = todoList.todos[i].todoText + ". completed - " + todoList.todos[i].completionStatus;
      todoUl.appendChild(todoLi);
      // Creating and displaying delete button for every todo li item
      var deleteTodo = document.createElement('button')
      deleteTodo.textContent = 'Delete';
      deleteTodo.className = 'delete-button';
      deleteTodo.id = i;
      todoLi.appendChild(deleteTodo);
      // Creating and displaying "toggle completion status" button for every
      // todo li.
      var toggleBtn = document.createElement('button');
      toggleBtn.textContent = 'Toggle';
      toggleBtn.className = 'toggle-button';
      var todoCompletionStatus = todoList.todos[i].completionStatus;
      if(todoCompletionStatus === true) {
        toggleBtn.classList.toggle('done')
      };
      toggleBtn.id = i;
      todoLi.appendChild(toggleBtn);
    }
  },

  deleteTodo: function(event) {
    var deletedTodoPosition = event.target.id;
    todoList.deleteTodo(deletedTodoPosition);
  },

  toggleTodoStatus: function(event){
    var deletedTodoPosition = event.target.id;
    todoList.toggleCompletion(deletedTodoPosition);
  },
}



// Here we define what needs to be done after user button cliks.

var addTodoBtn = document.getElementById('addTodoBtn');
addTodoBtn.addEventListener('click', handlers.addTodo);

var deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click', handlers.deleteAll);

// After we check which button user clicked,
// we decide here what to do when user clicks delete or toggle button.
var todoUl = document.getElementById('todoList');
todoUl.addEventListener('click', function(event) {          // We need to define the event object and pass it to
  if( !event ) {event = window.event};                      // the all outer functions we use. It's workaround for Firefox
  var clickedElement = event.target;
  if (clickedElement.classList.contains('delete-button')) {
    view.deleteTodo(event);
  } else if (clickedElement.classList.contains('toggle-button')) {
    view.toggleTodoStatus(event);
  }
});
