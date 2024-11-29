import { useState } from 'react';
import { toast } from 'react-toastify';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "dulari");
    data.append("cloud_name", "doyqi2rjb");

    try {
      setUploading(true);
      const res = await fetch("https://api.cloudinary.com/v1_1/doyqi2rjb/image/upload", {
        method: "POST",
        body: data,
      });
      const uploadImg = await res.json();
      setUploading(false);
      return uploadImg.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  return { uploadImage, uploading };
};