import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUpload, FiAlertCircle } from 'react-icons/fi';

const CreatePost = ({ userId, onPostSuccess, onBanDetected }) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setError('Please upload an image file (JPEG, PNG)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.onerror = () => setError('Failed to read image file');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!preview) {
      setError('Please upload an image first!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const base64String = preview.split(',')[1] || preview;
      const response = await axios.post('http://ec2-13-62-231-38.eu-north-1.compute.amazonaws.com:5000/api/check', {
        imageBase64: base64String,
        userId: Number(userId)
      });

      switch (response.data.status) {
        case 'APPROVED':
          onPostSuccess?.();
          navigate('/');
          break;
        case 'REJECTED':
          setError(`Post rejected: ${response.data.message}`);
          break;
        case 'BANNED':
          onBanDetected?.();
          onPostSuccess?.('BANNED');
          return;
        case 'FLAGGED':
          setError('Post flagged for manual review');
          break;
        default:
          setError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      if (error.response?.data?.status === 'BANNED') {
        onBanDetected?.();
        return;
      }
      
      setError(error.response?.data?.message || 
              error.message || 
              'Failed to upload post');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <motion.div 
        
        style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '30px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          marginTop: '80px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <h1 style={{
          fontFamily: '"Comic Neue", cursive',
          color: '#2d3436',
          fontSize: '2.5rem',
          textAlign: 'center',
          margin: '0 0 30px 0'
        }}>
          Add Post
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#ffecec',
              color: '#ff6b6b',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <FiAlertCircle size={20} />
            <span>{error}</span>
          </motion.div>
        )}

        <div className="upload-area">
          <input
            type="file"
            id="post-upload"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/jpeg,image/png"
            style={{ display: 'none' }}
          />
          <motion.label 
            htmlFor="post-upload" 
            className="upload-label"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              background: preview ? 'white' : 'rgba(255,255,255,0.9)',
              borderRadius: '20px',
              border: `4px dashed ${preview ? '#74b9ff' : '#a55eea'}`,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {preview ? (
              <motion.img 
                src={preview} 
                alt="Preview" 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '10px'
                }}
              />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '30px'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#a55eea',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FiUpload size={40} color="white" />
                </div>
                <p style={{
                  fontFamily: '"Comic Neue", cursive',
                  fontSize: '1.4rem',
                  color: '#2d3436',
                  textAlign: 'center',
                  margin: 0
                }}>
                  Add Your Art or Pictures!<br />
                  Let's inspire the world! 🎉
                </p>
              </motion.div>
            )}
          </motion.label>
        </div>

        {preview && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '15px',
              background: isLoading ? '#b2bec3' : '#74b9ff',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontFamily: '"Comic Neue", cursive',
              fontSize: '1.2rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              'Upload  Picture 🚀'
            )}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreatePost;