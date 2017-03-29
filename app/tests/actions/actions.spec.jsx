var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'search text'
    };
    var response = actions.setSearchText(action.searchText);

    expect(response).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'some text'
    };
    var response = actions.addTodo(action.text);

    expect(response).toEqual(action);
  });

  it('should generate add todos action object', () => {
    var todos = [{
      id: 111,
      text: 'some text',
      completed: false,
      completedAt: undefined,
      createdAt: 123
    }];
    var action = {
      type: 'ADD_TODOS',
      todos
    };
    var response = actions.addTodos(todos);

    expect(response).toEqual(action);
  });

  it('should generate togle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
    };
    var response = actions.toggleShowCompleted(action);

    expect(response).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 123
    };
    var response = actions.toggleTodo(action.id);

    expect(response).toEqual(action);
  });
});
