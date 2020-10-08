import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import SearchField from '../components/SearchField';

Enzyme.configure({ adapter: new Adapter() });

const dataFixture = []

describe('SearchField Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchField />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot render', () => {
    const component = renderer.create(<SearchField />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display proper content', () => {
    const wrapper = mount(
      <SearchField
        showSearchField={true}
        data={dataFixture}
        getTrack={() => {}} 
      />);
    expect(wrapper.find('.search-container')).toHaveLength(1)
    expect(wrapper.find('.hide')).toHaveLength(0)
    expect(wrapper.find('.searchField')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(1)
    expect(wrapper.find('button span').text()).toBe(' Search on Spotify ')
  })
})
