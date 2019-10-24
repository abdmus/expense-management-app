import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ADD_EXPENSE

const addExpense = (
        {
            description = '',
            note = '',
            amount = 0,
            createAt = 0
        } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expenses: {
        id: uuid(),
        description,
        note,
        amount,
        createAt
    }
});

// REMOVE_EXPENSE

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE

const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
});
// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expenses
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.update
                    }
                } else {
                    return expense;
                }
            });            
        default: 
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: "date"
            }    
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: "amount"
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }    
        default:
            return state;
    };
};

// Get Visible Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createAt < b.createAt ? 1 : -1;
        }
        if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    })
};

// Store Creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createAt: -21000}));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createAt: -1000}));
// store.dispatch(removeExpense({id: expenseOne.expenses.id}));
// store.dispatch((editExpense(expenseTwo.expenses.id, {amount: 500})));


// store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(-2340));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(0));



const demoState = {
    expenses: [{
        id: "aslkfjaslfda",
        description: 'January Rent',
        note: 'Last month rent paid and now will move on to next one.',
        amount: 54500,  // $545.00 it is in the pannies.
        createAt: 0 // we wil have actual time here, later.
    }],
    filters: {
        text: 'rent', // will look for the string in description and note.
        sortBy: 'amount', // data or amount 
        startDate: undefined,
        endDate: undefined
    }
};
