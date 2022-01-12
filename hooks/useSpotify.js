import { useSession } from 'next-auth/react';
import { useEffect, signIn } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;
    // refresh access token fail, then redirect them back to login
    if (session.error === 'RefreshAccessTokenError') {
      signIn();
    }

    spotifyApi.setAccessToken(session.user.accessToken);
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
