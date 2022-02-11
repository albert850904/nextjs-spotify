import { atom } from 'recoil';

export const currentDeviceState = atom({
  key: 'currentDeviceState',
  default: null,
});

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null,
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
