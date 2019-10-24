import React from 'react';
import { shallow } from 'enzyme';
import ExpensifyDashboardPage from '../../components/ExpensifyDashboardPage';

test('should render the ExpensifyDashboardPage', () => {
    const wrapper = shallow(<ExpensifyDashboardPage />);
    expect(wrapper).toMatchSnapshot();
})