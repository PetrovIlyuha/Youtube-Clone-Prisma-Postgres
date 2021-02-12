import { useAuth } from 'context/auth-context';
import React from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { addComment } from 'utils/api-client';
import defaultAvatar from '../assets/default-avatar.png';
import Wrapper from '../styles/CommentList';
import CommentList from './CommentList';

function AddComment({ video }) {
  const user = useAuth();
  const [comment, setComment] = React.useState('');
  const [openSnackbar] = useSnackbar();
  const handleAddComment = e => {
    if (e.keyCode === 13) {
      e.target.blur();
      if (!comment.trim()) {
        return openSnackbar('Please write something...');
      }
      addComment({ video, comment })
        .then(() => {
          setComment('');
        })
        .catch(err => {
          openSnackbar('Sign in to add a comment!');
          setComment('');
        });
    }
  };

  return (
    <Wrapper>
      <h3>{video.comments.length} comments</h3>

      <div className='add-comment'>
        {user ? (
          <img src={user.avatar} alt={user.username} />
        ) : (
          <img src={defaultAvatar} alt='user avatar' />
        )}
        <textarea
          placeholder='Add a public comment...'
          value=''
          rows={1}
          onKeyDown={handleAddComment}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <CommentList comments={video.comments} />
    </Wrapper>
  );
}

export default AddComment;
