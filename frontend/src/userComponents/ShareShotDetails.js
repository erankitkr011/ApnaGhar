import React, { useState } from 'react';
import { useImageUpload } from '../hooks/ImageUpload';

const ShareShotDetails = ({ id }) => {
  const { uploadImage, uploading } = useImageUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const url = await uploadImage(selectedFile);
  
   try {
    const response = await fetch('/upload-shot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, url }),
    });

    const data = await response.json();
    if (response.ok) {
      // console.log('Shot URL updated successfully:', data);
    } else {
      console.error('Error updating shot URL:', data);
    }
  } catch (error) {
    console.error('Error updating shot URL:', error);
  }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Share Bill Details</h2>
      <p>Bill ID: {id}</p>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Upload an Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      {previewUrl && (
        <div className="mb-4">
          <p className="font-semibold">Image Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-md shadow-md"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold transition duration-300 ${
          uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default ShareShotDetails;
