import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
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

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'This month rent paid',
        amount: 109500,
        createAt: 1000
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            description: '',
            note: '',
            amount: 0,
            createAt: 0,
            id: expect.any(String)
        }
    })
});