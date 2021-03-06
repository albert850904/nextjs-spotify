import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  SwitchHorizontalIcon,
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import debounce from 'lodash';

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import useSongInfo from '../hooks/useSongInfo';

const DEFAULT_VOLUME = 50;

function Player() {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log('Now Playing: ', data.body?.item);
        setCurrentTrackId(data?.body?.item.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    }
  };

  const skipToNextHandler = () => {
    // Skip User’s Playback To Next Track
    spotifyApi.skipToNext().then(
      () => {
        console.log('Skip to next');
      },
      (err) => {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  };

  const skipToPrevHandler = () => {
    // Skip User’s Playback To Previous Track
    spotifyApi.skipToPrevious().then(
      function () {
        console.log('Skip to previous');
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  };

  const playPauseHandler = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = useCallback(() => {
    debounce((volume) => {
      console.log('voulmne');
      spotifyApi.setVolume(volume);
    }, 500);
  }, [volume]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* left - song info */}
      <div className="flex items-center space-x-4">
        <div>
          <img
            className="h-hidden md:inline h-10 w-10"
            src={songInfo?.album.images?.[0].url}
            alt={songInfo?.name}
          />
        </div>
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" onClick={() => skipToPrevHandler()} />

        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={playPauseHandler} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={playPauseHandler} />
        )}

        <FastForwardIcon
          className="button"
          onClick={() => skipToNextHandler()}
        />
        <ReplyIcon className="button" />
      </div>

      {/* right - volumn */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          className="button"
          onClick={() =>
            volume >= 0 && setVolume((prevState) => prevState - 10)
          }
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <VolumeUpIcon
          className="button"
          onClick={() =>
            volume <= 100 && setVolume((prevState) => prevState + 10)
          }
        />
      </div>
    </div>
  );
}

export default Player;
