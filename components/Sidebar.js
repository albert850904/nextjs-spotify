import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import { playListIdState } from '../atoms/playListAtom';

// _rfec
function Sidebar() {
  // a persist session from next/auth
  const spotifyApi = useSpotify();
  const { data: session, staus } = useSession();
  const [playLists, setPlayLists] = useState([]);
  const [playListId, setPlayListId] = useRecoilState(playListIdState);

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;
    spotifyApi.getUserPlaylists().then((data) => {
      setPlayLists(data.body.items);
    });
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2  hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* PlayList */}
        {playLists.map((playList) => {
          return (
            <p
              key={playList.id}
              className="cursor-pointer hover:text-white"
              onClick={() => setPlayListId(playList.id)}
            >
              {playList.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
