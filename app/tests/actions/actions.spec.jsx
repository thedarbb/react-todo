import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';

import firebase, {firebaseRef} from 'app/firebase/';
import * as actions from 'actions';

var createMockStore = configureMockStore([thunk]);

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
      todo: {
        id: '123',
        text: 'test',
        completed: false,
        createdAt: 123
      }
    };
    var response = actions.addTodo(action.todo);

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

  it('should create todo and dispatch ADD_TODO', (done) => {
    const store = createMockStore({});
    const todoText = 'test text';

    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();
    }).catch(done);
  });


  it('should generate togle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED',
    };
    var response = actions.toggleShowCompleted(action);

    expect(response).toEqual(action);
  });

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: 123,
      updates: {
        completed: false
      }
    };
    var response = actions.updateTodo(action.id, action.updates);

    expect(response).toEqual(action);
  });

  it('should generate LOGIN action', () => {
    var action = {
      type: 'LOGIN',
      uid: '12345'
    };

    var response = actions.login(action.uid);

    expect(response).toEqual(action);
  });

  it('should generate LOGOUT action', () => {
    var action = {
      type: 'LOGOUT'
    };

    var response = actions.logout();

    expect(response).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    var testTodoRef;

    beforeEach((done) => {
      var todosRef = firebaseRef.child('todos');

      todosRef.remove().then(() => {
        testTodoRef = firebaseRef.child('todos').push();

        return testTodoRef.set({
          text: 'test test',
          completed: false,
          createdAt: 123
        });
      }).then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      testTodoRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });
        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done);
    });

    it('should dispatch ADD_TODOS action', (done) => {
      const store = createMockStore({});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('test test');

        done();
      }, done);
    });
  });
});
