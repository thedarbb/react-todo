var React = require('react');

var AddTodo = React.createClass({
  onFormSubmit: function (e){
    e.preventDefault();

    var todoText = this.refs.todoText.value;

    if(todoText.length > 0){
      this.refs.todoText.value = '';
      this.props.onAddTodo(todoText);
    }else{
      this.refs.todoText.focus();
    }
  },
  render: function () {
    return (
      <div className="container__footer">
        <form onSubmit={this.onFormSubmit}>
          <input type="text" ref="todoText" placeholder="Add to todo list.."/>
          <button className="button expanded">Add</button>
        </form>
      </div>
    )
  }
});

module.exports = AddTodo;
