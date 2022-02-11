import Head from 'next/head';
import CenterContents from '../components/CenterContents.js';
import { getSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar.js';
import Player from '../components/Player';
import { useEffect } from 'react';
import useSpotify from '../hooks/useSpotify.js';
import { useRecoilState } from 'recoil';
import { currentDeviceState } from '../atoms/songAtom.js';

export default function Home() {
  const spotifyApi = useSpotify();
  const [deviceId, setDeviceId] = useRecoilState(currentDeviceState);

  useEffect(() => {
    if (!spotifyApi) return;
    spotifyApi.getMyDevices().then((res) => {
      setDeviceId(res?.body?.devices?.[0]);
    });
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

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
