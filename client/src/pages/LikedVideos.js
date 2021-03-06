import ErrorMessage from 'components/ErrorMessage';
import TrendingCard from 'components/TrendingCard';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import TrendingSkeleton from 'skeletons/TrendingSkeleton';
import { client } from 'utils/api-client';
import { ChannelIcon } from '../components/Icons';
import SignUpCard from '../components/SignUpCard';
import Wrapper from '../styles/Trending';

function LikedVideos() {
  const user = useAuth();

  const {
    data: videos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(
    'LikedVideos',
    () => client.get('/users/liked-videos').then(res => res.data.videos),
    { enabled: true },
  );

  if (!user) {
    return (
      <SignUpCard
        icon={<ChannelIcon />}
        title='Save everything you like'
        description='Videos that you have liked will show up here'
      />
    );
  }
  if (isLoading) return <TrendingSkeleton />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Wrapper>
      <h2>Liked Videos</h2>
      {isSuccess && !videos.length && (
        <div className='secondary'>Liked videos will be appearing here</div>
      )}
      {isSuccess &&
        videos.length &&
        videos.map(video => (
          <Link key={video.id} to={`/watch/${video.id}`}>
            <TrendingCard video={video} />
          </Link>
        ))}
    </Wrapper>
  );
}

export default LikedVideos;
