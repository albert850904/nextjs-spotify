import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playListState } from '../atoms/playListAtom';
import useSpotify from '../hooks/useSpotify';

const RANDOM_COLOR = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

function CenterContents() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playListId = useRecoilValue(playListIdState); // readonly recoil value
  const [playList, setPlayList] = useRecoilState(playListState);

  useEffect(() => {
    setColor(shuffle(RANDOM_COLOR).pop());
  }, [playListId]);

  useEffect(() => {
    if (!playListId) return;
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((error) => console.log('error: ', error));
  }, [spotifyApi, playListId]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 bg-black text-white">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 `}
      >
        {/* <img/> */}
        <div>hellow</div>
      </section>
    </div>
  );
}

export default CenterContents;
