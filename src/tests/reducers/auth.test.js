import authReducer from '../../reducers/auth';

test('should generate login action object', () => {
    const uid = 'abc123';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should generate login action object', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid: 'abc1234'}, action);
    expect(state).toEqual({});
});