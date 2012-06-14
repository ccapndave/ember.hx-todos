package todos.model;
import ember.Object;

class Todo extends Object {
	
	public var title:String;
	
	public var completed:Bool;

	public static function fromJson(obj:Dynamic) {
		var todo = new Todo();
		todo.title = obj.title;
		todo.completed = obj.completed;
		return todo;
	}
	
}