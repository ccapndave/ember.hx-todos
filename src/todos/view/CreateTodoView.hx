package todos.view;
import ember.TextField;

class CreateTodoView extends TextField {

    override public function insertNewline() {
        if (value != "") {
            Todos.todosController.createTodo(value);
            value = "";
        }
    }

}