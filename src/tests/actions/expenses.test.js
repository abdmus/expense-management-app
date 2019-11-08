import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense, 
    addExpense, 
    editExpense,
    startEditExpense, 
    removeExpense,
    startRemoveExpense, 
    setExpenses, 
    startSetExpenses    
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thatismyfakeid';
const defalutAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, amount, note }) => {
        expensesData[id] = { description, amount, note };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup remove expense from firebase', (done) => {
    const store = createMockStore(defalutAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', {note: 'new note added'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        update: {
            note: 'new note added'
        }
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defalutAuthState);
    const id = expenses[0].id;
    const update = { amount: 21400 };
    store.dispatch(startEditExpense(id, update)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            update
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(update.amount);
        done();
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: expenses[2]
    });
});

test('should add expense to the databse and store', (done) => {
    const store = createMockStore(defalutAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 5000,
        createAt: 1000,
        note: 'This one is better!'
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0].expenses).toEqual({
            id: expect.any(String),
            ...expenseData
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expenses.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to the databse and store', (done) => {
    const store = createMockStore(defalutAuthState);
    const expenseDefault = {
        description: '',
        note: '',
        amount: 0,
        createAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0].expenses).toEqual({
            id: expect.any(String),
            ...expenseDefault
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expenses.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    });
});

test('should set expenses', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

// test('should fetch the expense from firebase', (done) => {
//     const store = createMockStore({});
//     store.dispatch(startSetExpenses()).then(() => {
//         const action = store.getActions();
//         expect(action).toEqual({
//             type: 'SET_EXPENSES',
//             expenses
//         });
//         done()
//     });
// });