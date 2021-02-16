// @ts-nocheck
import EditProfile from 'components/EditProfile';
import ErrorMessage from 'components/ErrorMessage';
import { useAuth } from 'context/auth-context';
import useAuthAction from 'hooks/use-auth-action';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ChannelSkeleton from 'skeletons/WatchVideoSkeleton';
import Button from '../styles/Button';
import { client, toggleSubscribeUser } from 'utils/api-client';
import { VidIcon } from '../components/Icons';
import SignUpCard from '../components/SignUpCard';
import MarginButtonContainer from '../styles/ButtonMarginContainer';
import Wrapper from '../styles/Channel';
import ChannelTabVideo from 'components/ChannelTabVideo';
import ChannelTabAbout from 'components/ChannelTabAbout';
import ChannelTabChannels from 'components/ChannelTabChannels';

const activeTabStyle = {
  borderBottom: '2px solid white',
  color: 'white',
};

function Channel() {
  const user = useAuth();
  const { channelId } = useParams();
  const [tab, setTab] = React.useState('VIDEOS');

  const loggedInUserId = user ? user.id : undefined;
  const userId = channelId || loggedInUserId;

  const handleAuthAction = useAuthAction();

  const { data: correctUser, isLoading, isError, error } = useQuery(
    ['Channel', userId],
    () => client.get(`/users/${userId}`).then(res => res.data.user),
    { enabled: user },
  );
  if (!correctUser) {
    return (
      <SignUpCard
        icon={<VidIcon />}
        title='Manage your videos'
        description='Sign in to upload and manage your videos, pre-recorded or live ones'
      />
    );
  }

  if (isLoading) return <ChannelSkeleton />;
  if (isError) return <ErrorMessage error={error} />;

  const handleSubscribe = e => {
    handleAuthAction(toggleSubscribeUser, correctUser.id);
  };

  return (
    <Wrapper editProfile={correctUser.isMe}>
      <div className='cover'>
        <img src={correctUser.cover} alt={`${correctUser.cover} cover`} />
      </div>

      <div className='header-tabs'>
        <div className='header'>
          <div className='flex-row'>
            <img
              className='avatar lg'
              src={correctUser.avatar}
              alt={`${correctUser.avatar}'s avatar`}
            />
            <div>
              <h3>{correctUser.username}</h3>
              <span className='secondary'>
                {correctUser.subscribersCount} subscribers
              </span>
            </div>
          </div>
          {correctUser.isMe && <EditProfile profile={correctUser} />}
          {!correctUser.isMe && !correctUser.isSubscribed && (
            <MarginButtonContainer>
              <Button onClick={handleSubscribe}>Subscribe</Button>
            </MarginButtonContainer>
          )}
          {!correctUser.isMe && correctUser.isSubscribed && (
            <MarginButtonContainer>
              <Button onClick={handleSubscribe}>Unsubscribe</Button>
            </MarginButtonContainer>
          )}
        </div>

        <div className='tabs'>
          <ul className='secondary'>
            <li
              style={tab === 'VIDEOS' ? activeTabStyle : {}}
              onClick={() => setTab('VIDEOS')}>
              Videos
            </li>
            <li
              style={tab === 'CHANNELS' ? activeTabStyle : {}}
              onClick={() => setTab('CHANNELS')}>
              Channels
            </li>
            <li
              style={tab === 'ABOUT' ? activeTabStyle : {}}
              onClick={() => setTab('ABOUT')}>
              About
            </li>
          </ul>
        </div>
      </div>

      <div className='tab'>
        {tab === 'VIDEOS' && <ChannelTabVideo videos={correctUser.videos} />}
        {tab === 'CHANNELS' && (
          <ChannelTabChannels channels={correctUser.channels} />
        )}
        {tab === 'ABOUT' && <ChannelTabAbout about={correctUser.about} />}
      </div>
    </Wrapper>
  );
}

export default Channel;
