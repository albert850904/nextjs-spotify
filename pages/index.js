import Head from 'next/head';
import CenterContents from '../components/CenterContents.js';
import { getSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar.js';
import Player from '../components/Player';
import { useEffect } from 'react';
import useSpotify from '../hooks/useSpotify.js';

export default function Home() {
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (!spotifyApi) reutrn;
    spotifyApi.getMyDevices().then((res) => console.log(res));
  }, [spotifyApi]);

  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Kairu Spotify</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <CenterContents />
      </main>

      {/* Player */}
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
