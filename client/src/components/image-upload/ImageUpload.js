import React, { useState } from 'react';
import { getUploadUrl, uploadFile } from '../../api/tripsAPI';

const ImageUpload = ({ auth, tripId, setMainNote }) => {
  const [file, setFile] = useState('');
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (!files) return;

    setFile(files);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setMainNote('Please select a file to upload');
        return;
      }

      setMainNote('Uploading file');

      const uploadUrl = await getUploadUrl(auth.getIdToken(), tripId);

      await uploadFile(uploadUrl, file);

      setMainNote('File was uploaded');
    } catch (e) {
      setMainNote(`Could not upload file, ${e.message}`);
    }
  };

  return (
    <div id="usrform">
      <form onSubmit={handleUploadImage}>
        <label>Select file</label>
        <input
          id="ImageUpload"
          type="file"
          accept="image/*"
          placeholder="Uploaded Image"
          onChange={handleFileChange}
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUpload;
