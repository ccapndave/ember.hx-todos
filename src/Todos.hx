package ;
import todos.TodoView;
import ember.Application;
import ember.View;
import todos.TodosController;
import todos.MainView;
import todos.CreateTodoView;
import todos.Todo;

class Todos extends Application {
	
	public static var todosController:TodosController;
	
	public static function main() {
		var embed = [ MainView, CreateTodoView, TodoView ];

		todosController = new TodosController();
	}
	
}