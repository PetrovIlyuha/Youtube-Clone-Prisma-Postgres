import path from 'path';
import React, { useState } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import { uploadMedia } from 'utils/upload-media';
import { UploadIcon } from './Icons';
import UploadVideoModal from './UploadVideoModal';

function UploadVideo() {
  const [showModal, setShowModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [openSnackbar] = useSnackbar();

  const closeModal = () => setShowModal(false);

  async function handleUploadVideo(e) {
    e.persist();
    const file = e.target.files[0];
    const defaultTitle = path.basename(file.name, path.extname(file.name));
    setTitle(defaultTitle);
    if (file) {
      const fileSize = file.size / 1000000;
      if (fileSize > 50) {
        return openSnackbar('Video file should not exceed 50MB');
      }
      setShowModal(true);
      const previewVideoFile = URL.createObjectURL(file);
      setPreviewVideo(previewVideoFile);
      const url = await uploadMedia({
        type: 'video',
        file,
        preset: 'dq5ruekt',
      });

      const extension = path.extname(url);
      setThumbnail(url.replace(extension, '.jpg'));
      setUrl(url);
      e.target.value = '';
    }
  }

  return (
    <div>
      <label htmlFor='video-upload'>
        <UploadIcon />
      </label>
      <input
        style={{ display: 'none' }}
        id='video-upload'
        type='file'
        accept='video/*'
        onChange={handleUploadVideo}
      />
      {showModal && (
        <UploadVideoModal
          previewVideo={previewVideo}
          thumbnail={thumbnail}
          defaultTitle={title}
          url={url}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default UploadVideo;
