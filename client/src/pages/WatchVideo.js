// @ts-nocheck
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import {
  client,
  dislikeVideo,
  likeVideo,
  toggleSubscribeUser,
} from 'utils/api-client';
import AddComment from '../components/AddComment';
import { DislikeIcon, LikeIcon } from '../components/Icons';
import Skeleton from '../skeletons/WatchVideoSkeleton';
import VideoPlayer from '../components/VideoPlayer';
import Button from '../styles/Button';
import Wrapper from '../styles/WatchVideo';
import NoResults from 'components/NoResults';
import { formatCreatedAt } from 'utils/date';
import VideoCard from 'components/VideoCard';
import useAuthAction from 'hooks/use-auth-action';

function WatchVideo() {
  const { videoId } = useParams();
  const [nextVideos, setNextVideos] = useState([]);
  const handleAuthAction = useAuthAction();
  const fetchNextVideos = async () => {
    return await client.get('/videos').then(res => res.data.videos);
  };

  const { data: video, isLoading } = useQuery(['queryVideoById', videoId], () =>
    client.get(`/videos/${videoId}`).then(res => res.data.video),
  );
  useQuery('nextVideosRecommended', fetchNextVideos, {
    onSuccess: data => {
      setNextVideos(data);
    },
    onError: error => {},
    onSettled: (data, error) => {},
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (!isLoading && !video) {
    return (
      <NoResults
        title='Video not found'
        text='The video you are searching for may have been removed or restricted from public access'
      />
    );
  }

  const handleLikeVideo = () => {
    handleAuthAction(likeVideo, video.id);
  };
  const handleDislikeVideo = () => {
    handleAuthAction(dislikeVideo, video.id);
  };

  const handleToggleSubscribe = channelId => {
    handleAuthAction(toggleSubscribeUser, channelId);
  };

  return (
    <Wrapper
      filledLike={video && video.isLiked}
      filledDislike={video && video.isDisliked}>
      <div className='video-container'>
        <div className='video'>
          {!isLoading && <VideoPlayer video={video} />}
        </div>

        <div className='video-info'>
          <h3>{video.title}</h3>

          <div className='video-info-stats'>
            <p>
              <span>{video.views} views</span> <span>•</span>{' '}
              <span>Premiered {formatCreatedAt(video.createdAt)}</span>
            </p>

            <div className='likes-dislikes flex-row'>
              <p className='flex-row like'>
                <LikeIcon onClick={handleLikeVideo} />{' '}
                <span>{video.likesCount}</span>
              </p>
              <p className='flex-row dislike' style={{ marginLeft: '1rem' }}>
                <DislikeIcon onClick={handleDislikeVideo} />{' '}
                <span>{video.dislikesCount}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='channel-info-description'>
          <div className='channel-info-flex'>
            <Link to={`/channel/${video.userId}`}>
              <div className='channel-info flex-row'>
                <img
                  className='avatar md'
                  src={video.user.avatar}
                  alt={`${video.user.username}'s channel avatar`}
                />
                <div className='channel-info-meta'>
                  <h4>{video.user.username}</h4>
                  <span className='secondary small'>
                    {video.subscribersCount} subscribers
                  </span>
                </div>
              </div>
            </Link>

            {!video.isVideoMine && !video.isSubscribed && (
              <Button onClick={() => handleToggleSubscribe(video.user.id)}>
                Subscribe
              </Button>
            )}
            {!video.isVideoMine && video.isSubscribed && (
              <Button grey onClick={() => handleToggleSubscribe(video.user.id)}>
                Subscribed
              </Button>
            )}
          </div>

          <p>{video.description}</p>
        </div>

        <AddComment video={video} />
      </div>

      <div className='related-videos'>
        <h3 className='up-next'>Up Next</h3>
        {nextVideos.length > 0 ? (
          nextVideos
            .filter(nextVideo => nextVideo.id !== video.id)
            .slice(0, 10)
            .map(video => <VideoCard video={video} key={video.id} hideAvatar />)
        ) : (
          <div>Loading Recommendations...</div>
        )}
      </div>
    </Wrapper>
  );
}

export default WatchVideo;
