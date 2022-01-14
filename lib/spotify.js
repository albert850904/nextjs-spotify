import SpotifyWebApi from 'spotify-web-api-node';

// permission for the tokens in order for the user to access the contents
const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'app-remote-control',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',');

// const _scopes =
//   'user-read-email playlist-read-private playlist-read-collaborative streaming app-remote-control user-read-private user-library-read user-top-read user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-follow-read';

const params = {
  scope: scopes,
  show_dialog: true,
};

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
