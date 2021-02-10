import axios from 'axios';
import { queryCache } from 'react-query';

export const client = axios.create({
  baseURL: '/api/v1',
});

export function authenticate(response) {
  client({
    method: 'POST',
    url: '/auth/google-login',
    data: {
      idToken: response.tokenId,
    },
  })
    .then(res => {
      console.log(`Signin success: `, res);
      window.location.assign(window.location.href);
    })
    .catch(error => {
      console.log(`Sign in error: ${error.response}`);
    });
}

export async function signoutUser() {
  await client.get('/auth/signout');
  window.location.pathname = '/';
}

export async function updateUser(user) {
  await client.put('/users', user);
  await queryCache.invalidateQueries(['Channel'], user.id);
}

export async function addVideoView(videoId) {
  await client.get(`/videos/${videoId}/view`);
  await queryCache.invalidateQueries('History');
}

export async function addComment({ video, comment }) {
  await client.post(`/videos/${video.id}/comments`, { text: comment });
  await queryCache.invalidateQueries(['queryVideoById', video.id]);
}

export async function addVideo(video) {
  await client.post(`/videos`, video);
  await queryCache.invalidateQueries('Channel');
}

export async function toggleSubscribeUser(channelId) {
  await client.get(`/users/${channelId}/toggle-subscribe`);
  await queryCache.invalidateQueries('Channel');
  await queryCache.invalidateQueries('Channels');
  await queryCache.invalidateQueries('Subscriptions');
  await queryCache.invalidateQueries('AuthProvider');
  await queryCache.invalidateQueries('queryVideoById');
  await queryCache.invalidateQueries('SearchResults');
}

export async function likeVideo(videoId) {
  await client.get(`/videos/${videoId}/like`);
  await queryCache.invalidateQueries(['queryVideoById', videoId]);
}

export async function dislikeVideo(videoId) {
  await client.get(`/videos/${videoId}/dislike`);
  await queryCache.invalidateQueries(['queryVideoById', videoId]);
}

export async function deleteVideo() {}

export async function deleteComment() {}
