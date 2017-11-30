import reducers from '../../reducers/reducers';

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123'
  };
  const state = reducers({}, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = reducers({ uid: 'anything' }, action);
  expect(state).toEqual({});
});
