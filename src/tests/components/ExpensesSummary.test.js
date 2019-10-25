import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={12} expensesTotal={333235} />);
    expect(wrapper).toMatchSnapshot();
});