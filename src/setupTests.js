// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/';
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import shallow from "enzyme/src/shallow";
configure({ adapter: new Adapter() })

test('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});


it ('render without crashing', () => {
    const div = document.createElement ('div');
    ReactDOM.render (<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it ('render without crashing', () => {
    shallow(<App />);
});
