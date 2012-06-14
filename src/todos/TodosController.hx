package todos;
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

        content.pushObject(todo);
    }

    public function clearCompletedTodos() {
        content.filter(function(todo) { return todo.isDone; } ).foreach(content.removeObject);
    }

    @:property("@each.isDone")
    public function remaining():Int {
        return content.filter(function(todo) { return todo.isDone; } ).length;
    }

    @:property("length")
    public function isEmpty():Bool {
        return content.length == 0;
    }

    @:property("@each.isDone")
    public function allAreDone(?key:String, ?value:Bool):Bool {
        return false;
    }

}

/*
clearCompletedTodos: function() {
	this.filterProperty('isDone', true).forEach(this.removeObject, this);
  },
}

  remaining: function() {
	return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  isEmpty: function() {
	return this.get('length') === 0;
  }.property('length'),

  allAreDone: function(key, value) {
	if (arguments.length === 2) {
	  this.setEach('isDone', value);

	  return value;
	} else {
	  return !this.get('isEmpty') && this.everyProperty('isDone', true);
	}
  }.property('@each.isDone')
*/
