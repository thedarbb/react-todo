var expect = require('expect');
var reducers = require('reducers');
var df = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        text: 'some text'
      };
      var response = reducers.searchTextReducer(df(''), df(action));

      expect(response).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var response = reducers.showCompletedReducer(df(false), df(action));

      expect(response).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: '123',
          text: 'test',
          completed: false,
          createdAt: 123
        }
      };
      var response = reducers.todosReducer(df([]), df(action));

      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(action.todo);
    });

    it('should update todo', () => {
      var todos = [{
        id: 123,
        text: 'some text',
        completed: true,
        createdAt: 123,
        completedAt: 124
      }];
      var updates = {
        completed: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };
      var response = reducers.todosReducer(df(todos), df(action));

      expect(response[0].completed).toEqual(updates.completed);
      expect(response[0].completedAt).toEqual(updates.completedAt);
      expect(response[0].text).toEqual(todos[0].text);
    });

    it('should add existing todos', () => {
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
      var response = reducers.todosReducer(df([]), df(action));

      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(todos[0]);
    });
    it('should wipe todos on logout', () => {
      var todos = [{
        id: 111,
        text: 'some text',
        completed: false,
        completedAt: undefined,
        createdAt: 123
      }];
      var action = {
        type: 'LOGOUT'
      };
      var response = reducers.todosReducer(df(todos), df(action));
      expect(response).toEqual([]);
    });
  });

  describe('authReducer', () => {
    it('should store uid on login', () => {
      const action = {
        type: 'LOGIN',
        uid: '123abc'
      };
      const response = reducers.authReducer(undefined, df(action));

      expect(response).toEqual({
        uid: action.uid
      });
    });

    it('should clear auth info on logout', () => {
      const user = {
        uid: '1234'
      };
      const action = {
        type: 'LOGOUT'
      };
      var response = reducers.authReducer(df(user), df(action));

      expect(response).toEqual({});
    });
  });
});
