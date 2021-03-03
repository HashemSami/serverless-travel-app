import React, { useState } from 'react';
import { getUploadUrl, uploadFile } from '../../api/tripsAPI';

const ImageUpload = ({ auth, tripId, setMainNote }) => {
  const [file, setFile] = useState('');

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (!files) return;

    // console.log(files[0]);

    setFile(files[0]);
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

      setMainNote('File was uploaded, you can go back to home screen.');
    } catch (e) {
      setMainNote(`Could not upload file, ${e.message}`);
    }
  };

  return (
    <div id="usrform">
      <form onSubmit={handleUploadImage}>
        <div id="image-upload">
          <label>Select file:</label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            placeholder="Uploaded Image"
            onChange={handleFileChange}
          />

          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
