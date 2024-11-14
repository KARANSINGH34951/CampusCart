import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    // Create a FormData object to send the file as multipart data
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');

      // Make a POST request to the backend API endpoint
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('File uploaded successfully');
      console.log('Response from server:', response.data);
    } catch (error) {
      setUploadStatus('File upload failed');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default AdminDashboard;
