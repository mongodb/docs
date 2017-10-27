import Reflux from 'reflux';

const MediaPlayerActions = Reflux.createActions([
  'fetchVideos',
  'reset'
]);

export default MediaPlayerActions;
export { MediaPlayerActions };
