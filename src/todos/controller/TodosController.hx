package todos.controller;
import todos.model.Todo;
import ember.ArrayController;
using Lambda;
using ember.ArrayExtensions;

class TodosController extends ArrayController<Todo> {

	override public function init() {
		content = [];

		super.init();
	}

	public function createTodo(title:String) {
		var todo = new Todo();
		todo.title = title;

		pushObject(todo);
	}

	public function clearCompletedTodos() {
		content.filter(function(todo) { return todo.completed; }).foreach(content.removeObject);
	}

	@:property("@each.completed")
	public function remaining():Int {
		return content.filter(function(todo) { return !todo.completed; }).length;
	}

	@:property("@each.completed")
	public function completed():Int {
		return content.filter(function(todo) { return todo.completed; }).length;
	}

	@:property("length")
	public function isEmpty():Bool {
		return content.length == 0;
	}

	@:property("@each.completed")
	public function allAreCompleted(?key:String, ?value:Bool):Bool {
		return
			switch (value) {
				case null:
					// If value is null then the caller is trying to retrieve whether or not all are done
					content.length > 0 && content.foreach(function(todo) { return todo.completed; });
				default:
					// If value is true or false then the caller is trying to set whether or not all are done
					content.foreach(function(todo) { return todo.completed = value; });
			};
	}

}