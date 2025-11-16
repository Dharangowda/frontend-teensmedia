

import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaPaperPlane, FaBookmark } from 'react-icons/fa';

const Post = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: '100%',
        background: '#ffffff',
        border: '1px solid #dbdbdb',
        borderRadius: '8px',
        marginBottom: '24px',
        overflow: 'hidden' // Ensures nothing spills outside the rounded corners
      }}
    >
      {/* Post Image Container */}
      <div style={{
        width: '100%',
        height: '0',
        paddingBottom: '85%', // Creates a square aspect ratio
        position: 'relative',
        backgroundColor: '#fafafa'
      }}>
        {post.imageBase64 ? (
          <img 
            src={`data:image/jpeg;base64,${post.imageBase64}`}
            alt="Post content"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Changed from 'cover' to 'contain' to prevent zooming
              backgroundColor: 'white'
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px'
          }}>
            🖼️
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #efefef'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <motion.button whileTap={{ scale: 0.9 }} style={buttonStyle}>
            <FaHeart />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} style={buttonStyle}>
            <FaComment />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} style={buttonStyle}>
            <FaPaperPlane />
          </motion.button>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} style={buttonStyle}>
          <FaBookmark />
        </motion.button>
      </div>

      {/* Like Count */}
      <div style={{ 
        padding: '0 16px 8px',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        {Math.floor(Math.random() * 5000 + 100).toLocaleString()} likes
      </div>

      {/* Caption */}
      {post.caption && (
        <div style={{
          padding: '0 16px 16px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {post.caption}
        </div>
      )}
    </motion.div>
  );
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#262626',
  padding: 0,
  display: 'flex',
  alignItems: 'center'
};

export default Post;