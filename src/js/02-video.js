import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlayerCurrentTimeSave, 1000));

player
  .setCurrentTime(getCurrentTime())
  .then(() => {})
  .catch(() => {});

function onPlayerCurrentTimeSave(evt) {
  const timeToSave = evt.seconds;
  localStorage.setItem(LOCAL_STORAGE_KEY, timeToSave);
}

function getCurrentTime() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}
