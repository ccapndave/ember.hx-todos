package todos.view;
import ember.View;

class MainView extends View {

	@:property("Todos.todosController.remaining")
	public function pluralizeItems() {
		return Todos.todosController.get("remaining") <= 1 ? "item" : "items";
	}

	public function onClearCompletedTodos() {
		Todos.todosController.clearCompletedTodos();
	}
	
}