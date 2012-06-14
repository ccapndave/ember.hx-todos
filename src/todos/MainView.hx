package todos;
import ember.View;

class MainView extends View {
	
	override public function init():Void {
		template = ember.Handlebars.compile(haxe.Resource.getString('main_view'));
		
		super.init();
	}
	
	public function onClearCompletedTodosClick() {
		Todos.todosController.clearCompletedTodos();
	}
	
}