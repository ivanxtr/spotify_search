import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Playlist from '../components/Playlist';

Enzyme.configure({ adapter: new Adapter() });

const dataFixture = [
      {
        "collaborative" : false,
        "external_urls" : {
          "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX5BAPG29mHS8"
        },
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX5BAPG29mHS8",
        "images" : [ {
          "height" : null,
          "url" : "https://i.scdn.co/image/ab67706f00000003983a3b1f1eed0c6656568f98",
          "width" : null
        } ],
        "name" : "Éxitos México",
        "primary_color" : null,
        "public" : null,
        "tracks" : {
          "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX5BAPG29mHS8/tracks",
          "total" : 50
        },
        "type" : "playlist",
      }, 
      {
        "collaborative" : false,
        "external_urls" : {
          "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX10zKzsJ2jva"
        },
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva",
        "images" : [ {
          "height" : null,
          "url" : "https://i.scdn.co/image/ab67706f00000003b8f022e8f9ffb0e3a99e0f5e",
          "width" : null
        }],
        "name" : "¡Viva Latino!",
        "primary_color" : null,
        "public" : null,
        "tracks" : {
          "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva/tracks",
          "total" : 50
        },
        "type" : "playlist",
      }]

describe('Playlist Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Playlist />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('snapshot render', () => {
    const component = renderer.create(<Playlist />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('should display proper content', () => {
    const wrapper = mount(
      <Playlist
        showPlaylist={true}
        data={dataFixture}
        getTrack={() => {}} 
      />);
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('.playlist-container')).toHaveLength(1)
    expect(wrapper.find('.hide')).toHaveLength(0)
    expect(wrapper.find('.playlist')).toHaveLength(2)
    expect(wrapper.find('.playlist p').at(0).text()).toBe(' Éxitos México ')
    expect(wrapper.find('.playlist p').at(1).text()).toBe(' ¡Viva Latino! ')
  })

  it('should be hidden when empty data is recieved', () => {
    const wrapper = mount(
      <Playlist
        showPlaylist={true}
        data={[]}
        filterData={() => {}} 
      />);
      expect(wrapper.find('section')).toHaveLength(1)
      expect(wrapper.find('.playlist-container')).toHaveLength(1)
      expect(wrapper.find('.playlist')).toHaveLength(0)
  })
})
