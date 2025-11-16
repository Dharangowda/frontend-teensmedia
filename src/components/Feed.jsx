

import React from 'react';
import Post from './Post';
import { motion } from 'framer-motion';

const Feed = ({ posts }) => {
  const stories = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    username: ['jake_adventures', 'mikey_arts', 'sophia.creates', 'emily_designs', 'lily.photography'][i],
    image: [
      'https://imgs.search.brave.com/FipXDy51e_mbQUC4HPSUSX37-RA5r8qWhgWSHywtFhY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzY4LzU2LzIx/LzM2MF9GXzQ2ODU2/MjEyMF9YME4xUEd2/WjdERjdEMmZKdDMw/Sm5XYW9kekx6eW5L/SC5qcGc',
      'https://imgs.search.brave.com/0RqnM31-IeFPLTXeemSChGZtxgO7c4oZ6kYOyvG7puY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LXRl/ZW5hZ2VyLXdpdGgt/aGVhZHBob25lc18y/My0yMTQ4NzU4NDk4/LmpwZz9zZW10PWFp/c19oeWJyaWQ',
      'https://imgs.search.brave.com/1PS_4hyz2IrEEpKYAPNH1inAlitr7ZtZmxgYbLj4VUw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/ODAxNDMwNS9waG90/by9oZWFkc2hvdC1v/Zi1hLXRlZW5hZ2Ut/Ym95LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz04LUlnSFdK/cW1wVHdTM0JjNmpw/VDVqbkhmTzhiSmlL/V0ExSGZ4MXhJcTNr/PQ',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      'https://imgs.search.brave.com/l43vHtExj7PfsaKp3qWT-5NOX47--m7PPvyC0TmvOGg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/ZWVuYWdlLWdpcmwt/d2VhcmluZy1oZWFk/cGhvbmVzXzIzLTIx/NDg2NzI0NjYuanBn/P3NlbXQ9YWlzX2h5/YnJpZA'
    ][i],
    hasStory: Math.random() > 0.3
  }));

  return (
    <div style={{
      background: '#fafafa',
      minHeight: '100vh',
      paddingTop: '80px',
      paddingBottom: '20px'
    }}>
      {/* Stories */}
      <motion.div 
        className="stories-container"
        style={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: '16px',
          padding: '16px',
          marginBottom: '24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          background: '#ffffff',
          border: '1px solid #dbdbdb',
          borderRadius: '8px',
          maxWidth: '600px',
          margin: '0 auto 24px'
        }}
      >
        {stories.map((story, i) => (
          <motion.div 
            key={story.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              background: story.hasStory 
                ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' 
                : '#e0e0e0',
              padding: '2px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                background: '#ffffff',
                padding: '2px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={story.image} 
                  alt={story.username}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white'
                  }}
                />
              </div>
            </div>
            <span style={{
              fontSize: '12px',
              color: '#262626',
              maxWidth: '74px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {story.username}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Posts */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        display: 'grid',
        gap: '24px'
      }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.timestamp} style={{
              background: '#ffffff',
              border: '1px solid #dbdbdb',
              borderRadius: '8px'
            }}>
              {/* Post Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: '1px solid #efefef'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#efefef',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <span style={{ fontSize: '18px' }}>👤</span>
                  </div>
                  <span style={{
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    anonymous_user
                  </span>
                </div>
                <span style={{
                  color: '#8e8e8e',
                  fontSize: '12px'
                }}>
                  {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {/* Post Image - Using your original Post component */}
              <Post post={post} />

              {/* Caption Only - No username/timestamp */}
              {post.caption && (
                <div style={{
                  padding: '14px 16px',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {post.caption}
                </div>
              )}
            </div>
          ))
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              background: '#ffffff',
              padding: '40px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid #dbdbdb'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📷</div>
            <h2 style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: '#262626',
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Share Your First Post!
            </h2>
            <p style={{
              color: '#8e8e8e',
              margin: '8px 0 0',
              fontSize: '0.9rem'
            }}>
              When you share photos and videos, they'll appear on your profile.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Feed;