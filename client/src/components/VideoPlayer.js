import React, { useEffect, useRef } from 'react';
import { addVideoView } from 'utils/api-client';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

function VideoPlayer({ previewUrl, video }) {
  const videoRef = useRef(null);

  const { id, url, thumbnail } = video;
  useEffect(() => {
    const vjsplayer = videojs(videoRef.current);
    if (!previewUrl) {
      vjsplayer.poster(thumbnail);
      vjsplayer.src(url);
    }
    if (previewUrl) {
      vjsplayer.src({ type: 'video/mp4', src: previewUrl });
    }
    vjsplayer.on('ended', () => {
      addVideoView(id);
    });
    return () => {
      if (vjsplayer) {
        vjsplayer.dispose();
      }
    };
  }, [previewUrl, thumbnail, url, id]);
  return (
    <div data-vjs-player>
      <video
        controls
        ref={videoRef}
        className='video-js vjs-fluid vjs-big-play-centered'></video>
    </div>
  );
}

export default VideoPlayer;
