import React from 'react';
import Wrapper from '../styles/ChannelTabVideo';
import VideoCard from './VideoCard';

function ChannelTabVideo({ videos }) {
  if (videos.length === 0) {
    return <p>This channel hasn't posted any videos yet</p>;
  }
  return (
    <Wrapper>
      <div className='videos'>
        {videos.map(video => (
          <div style={{ margin: '2rem 0' }}>
            <VideoCard
              style={{ minHeight: '12rem' }}
              key={video.id}
              noUsername
              hideAvatar
              video={video}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default ChannelTabVideo;
