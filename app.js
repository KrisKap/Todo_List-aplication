var todoList = {

  // This is the "place" where we store our todos.
  todos: [],

  displayTodos: function() {
    var i;
    for (var i = 0; i < this.todos.length; i++) {
      console.log(this.todos[i]);
    };
  },

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
    this.displayTodos();
  },

  deleteTodo: function(deletedTodoPosition) {
    this.todos.splice(deletedTodoPosition, 1);
    this.displayTodos();
  },

}
