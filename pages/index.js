import Head from 'next/head';
import Sidebar from '../components/Sidebar.js';
import CenterContents from '../components/CenterContents.js';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Kairu Spotify</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <CenterContents />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
