import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom'
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import shallow from "enzyme/src/shallow";
import SocialNetApp from "./App";
configure({ adapter: new Adapter() })

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


it ('render without crashing', () => {
  const div = document.createElement ('div');
  ReactDOM.render (<SocialNetApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it ('render without crashing', () => {
  shallow(<App />);
});
