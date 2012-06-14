package ;
import todos.view.TodoView;
import ember.Application;
import ember.View;
import todos.controller.TodosController;
import todos.view.MainView;
import todos.view.CreateTodoView;
import todos.model.Todo;

class Todos extends Application {
	
	public static var todosController:TodosController;
	
	public static function main() {
		var embed = [ MainView, CreateTodoView, TodoView ];

		todosController = new TodosController();
	}
	
}