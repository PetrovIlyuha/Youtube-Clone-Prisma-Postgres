import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../styles/ChannelTabChannels';

function ChannelTabChannels({ channels }) {
  if (!channels.length) {
    return <p>Not subscribed to any channels yet.</p>;
  }
  return (
    <Wrapper>
      {channels.length
        ? channels.map(channel => (
            <Link to={`/channel/${channel.id}`} key={channel.id}>
              <div className='channel'>
                <img
                  src={channel.avatar}
                  alt={`${channel.username}'s channel avatar`}
                />
                <h3>{channel.username}</h3>
                <p className='secondary'>
                  {channel.subscribersCount} subscribers
                </p>
              </div>
            </Link>
          ))
        : null}
    </Wrapper>
  );
}

export default ChannelTabChannels;
