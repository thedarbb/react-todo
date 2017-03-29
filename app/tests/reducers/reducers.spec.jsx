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
        text: 'some text'
      };
      var response = reducers.todosReducer(df([]), df(action));

      expect(response.length).toEqual(1);
      expect(response[0].text).toEqual(action.text);
    });

    it('should toggle completed and completedAt', () => {
      var todos = [{
        id: 123,
        text: 'some text',
        completed: true,
        create: 123,
        createdAt: 123,
        completedAt: 124
      }];
      var action = {
        type: 'TOGGLE_TODO',
        id: 123
      };
      var response = reducers.todosReducer(df(todos), df(action));

      expect(response[0].completed).toEqual(false);
      expect(response[0].completedAt).toEqual(undefined);
    });
  });
});
