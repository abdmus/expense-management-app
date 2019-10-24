import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter, sortByAmount } from './actions/filters';
import getVisibilityExpense from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

store.dispatch(addExpense({description: 'Water Bill', amount: 3000}));
store.dispatch(addExpense({description: 'Gas Bill', createAt: 100}));
store.dispatch(addExpense({description: 'Rent', amount: 109500}));

const state = store.getState();
const visibilityExpesne = getVisibilityExpense(state.expenses, state.filters);
console.log(visibilityExpesne);



const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
