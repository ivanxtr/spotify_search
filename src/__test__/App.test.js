import React from 'react';
import ReactDOM from 'react-dom';
import { create } from 'react-test-renderer';
import App from '../App';

describe('App Component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot render', () => {
    const component = create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
