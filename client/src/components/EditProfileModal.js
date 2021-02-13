import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { updateUser } from 'utils/api-client';
import { uploadMedia } from 'utils/upload-media';
import Button from '../styles/Button';
import Wrapper from '../styles/EditProfileModal';
import { CloseIcon } from './Icons';

function EditProfileModal({ profile, closeModal }) {
  const [cover, setCover] = useState(profile.cover);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [openSnakbar] = useSnackbar();
  const handleCoverUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const cover = await uploadMedia({
        type: 'image',
        file,
        preset: 'znjb2esm',
      });
      setCover(cover);
    }
  };

  const handleAvatarUpload = async e => {
    const file = e.target.files[0];
    if (file) {
      const avatar = await uploadMedia({
        type: 'image',
        file,
        preset: 'ildby9ir',
      });
      setAvatar(avatar);
    }
  };

  const handleEditProfile = async e => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const about = e.target.elements.about.value;
    if (!username.trim()) {
      return openSnakbar('Username should not be left out empty');
    }
    const user = { username, about, avatar, cover };
    await updateUser(user);
    openSnakbar('Your profile is now updated!');
    setTimeout(() => {
      closeModal();
    }, 500);
  };
  return (
    <Wrapper>
      <div className='container'></div>
      <div className='edit-profile'>
        <form onSubmit={handleEditProfile}>
          <div className='modal-header'>
            <h3>
              <CloseIcon onClick={closeModal} />
              <span>Edit Profile</span>
            </h3>
            <Button type='submit'>Save</Button>
          </div>

          <div className='cover-upload-container'>
            <label htmlFor='cover-upload'>
              <img
                className='pointer'
                width='100%'
                height='200px'
                src={cover}
                alt='cover'
              />
            </label>
            <input
              id='cover-upload'
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleCoverUpload}
            />
          </div>

          <div className='avatar-upload-icon'>
            <label htmlFor='avatar-upload'>
              <img src={avatar} className='pointer avatar lg' alt='avatar' />
            </label>
            <input
              id='avatar-upload'
              type='file'
              accept='image/*'
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
            />
          </div>
          <input
            type='text'
            placeholder='Insert username'
            id='username'
            defaultValue={profile.username}
            required
          />
          <textarea
            id='about'
            defaultValue={profile.about}
            placeholder='Tell viewers about your channel'
          />
        </form>
      </div>
    </Wrapper>
  );
}

export default EditProfileModal;
