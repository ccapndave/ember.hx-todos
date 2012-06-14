package todos;
import ember.ArrayExtensions;
import ember.TextField;
import ember.View;

class TodoView extends View {

	public var todo:Todo;

	public var editing:Bool;

	override public function doubleClick(event) {
		editing = true;
	}

	public function onDestroy(event) {
		Todos.todosController.removeObject(todo);
	}

}

class TodoTextField extends TextField {

	public static var ENTER = 13;

	public var todo:Todo;

	override public function focusOut(event) {
		finishEditing();
	}

	override public function keyUp(event:Dynamic) {
		if (event.which == ENTER)
			finishEditing();
	}

	private function finishEditing() {
		cast(parentView, TodoView).editing = false;
	}

}