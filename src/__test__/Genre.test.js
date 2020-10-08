import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Genre from '../components/Genre';

Enzyme.configure({ adapter: new Adapter() });

const dataFixture = [
      {
        "href" : "https://api.spotify.com/v1/browse/categories/toplists",
        "icons" : [ {
          "height" : 275,
          "url" : "https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg",
          "width" : 275
        } ],
        "id" : "toplists",
        "name" : "Top Lists"
      }, {
        "href" : "https://api.spotify.com/v1/browse/categories/at_home",
        "icons" : [ {
          "height" : null,
          "url" : "https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg",
          "width" : null
        } ],
        "id" : "at_home",
        "name" : "At Home"
      }]

describe('Genre Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Genre />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot render', () => {
    const component = renderer.create(<Genre />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display proper content', () => {
    const wrapper = mount(
      <Genre
        showGenre={true}
        data={dataFixture}
        getPlaylistByGenre={() => {}} 
      />);
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('.genre-container')).toHaveLength(1)
    expect(wrapper.find('.hide')).toHaveLength(0)
    expect(wrapper.find('.genre')).toHaveLength(2)
    expect(wrapper.find('.genre p').at(0).text()).toBe('Top Lists')
    expect(wrapper.find('.genre p').at(1).text()).toBe('At Home')
  })

  it('should be hidden when empty data is recieved', () => {
    const wrapper = mount(
      <Genre
        showPlaylist={true}
        data={[]}
        filterData={() => {}} 
      />);
      expect(wrapper.find('section')).toHaveLength(1)
      expect(wrapper.find('.genre-container')).toHaveLength(1)
      expect(wrapper.find('.hide')).toHaveLength(1)
      expect(wrapper.find('.genre')).toHaveLength(0)
  })
})
