import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Filters from '../components/Filters';

Enzyme.configure({ adapter: new Adapter() });

const dataFixture = [{
      "followers" : {
        "href" : null,
        "total" : 18399815
      },
      "name" : "Twenty One Pilots",
      "popularity" : 86
    }, 
    {
      "followers" : {
        "href" : null,
        "total" : 318574
      },
      "name" : "TWENTY88",
      "popularity" : 58
    }]

describe('Filters Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Filters />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot render', () => {
    const component = renderer.create(<Filters />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display proper content', () => {
    const wrapper = mount(
      <Filters
        showPlaylist={true}
        data={dataFixture}
        filterData={() => {}} 
        filters={["popularity","followers"]}
      />);
    expect(wrapper.find('.filter-container')).toHaveLength(1)
    expect(wrapper.find('.hide')).toHaveLength(0)
    expect(wrapper.find('.filter-order')).toHaveLength(1)
    expect(wrapper.find('.filter-order p').text()).toBe(' Order By ')
    expect(wrapper.find('button')).toHaveLength(2)
  })

  it('should be hidden when empty data is recieved', () => {
    const wrapper = mount(
      <Filters
        showPlaylist={true}
        data={[]}
        filterData={() => {}} 
        filters={["popularity","followers"]}
      />);
    expect(wrapper.find('.filter-container')).toHaveLength(1)
    expect(wrapper.find('.hide')).toHaveLength(1)
    expect(wrapper.find('.filter-order')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(2)
  })
})

