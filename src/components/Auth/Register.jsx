import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();

  const backgrounds = [
    'https://imgs.search.brave.com/0d-A1BAGHfs_OxjHSfs9TipPo1ildiQ6NIWutPXS0xU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzA4LzIzLzEx/LzM2MF9GXzMwODIz/MTE1Ml85T2RDVE5S/dUVTY0t6ZU13WlFi/VU94QkhxMjM4Nnlr/NS5qcGc',
    'https://imgs.search.brave.com/NE8-xi-vKZiO-tzhVE04DRZ79y4WK36gRQDc_uZewwg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFnYVpsTzBXdkwu/anBn',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2370&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop',
    'https://imgs.search.brave.com/Cwa31Rb89Pem8dEfrHTltJX0KM4_JL5ygSTM6UGHkJY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2FsbHBhcGVyLXVr/LmNvbS9jZG4vc2hv/cC9maWxlcy9NYXJ2/ZWwtQ29taWMtU3Ry/aXAtYnktTXVyaXZh/bWFydmVsLWNvbWlj/LXN0cmlwLW0tMTU5/NTAxLmpwZz92PTE3/MTE0NTAwNjgmd2lk/dGg9ODAw'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://ec2-13-60-75-156.eu-north-1.compute.amazonaws.com:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (data.success) {
        onRegister(data);
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* BG */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          backgroundImage: `url(${backgrounds[currentBg]})`
        }}
        key={currentBg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 0
      }} />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            zIndex: 0
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}

      {/* CARD */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '30px',
          padding: '40px 30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          width: '90%',
          maxWidth: '450px',
          zIndex: 1,
          border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(5px)'
        }}
      >

        {/* TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <motion.h1 
            style={{
              color: '#2d3436',
              fontFamily: '"Comic Neue", cursive',
              fontSize: '2.5rem',
              margin: '0 0 10px 0'
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Teen's Media
          </motion.h1>

          <motion.p 
            style={{
              color: '#636e72',
              fontFamily: '"Comic Neue", cursive',
              fontSize: '1.1rem'
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Create your new profile!
          </motion.p>
        </div>

        {/* ERROR */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#ff7675',
              color: 'white',
              padding: '12px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center'
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="text"
              placeholder="🦸 Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '90%',
                padding: '18px 25px',
                borderRadius: '15px',
                border: '3px solid #74b9ff',
                fontSize: '1.2rem',
                background: 'rgba(255,255,255,0.8)',
                outline: 'none'
              }}
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="password"
              placeholder="🔐 Secret Power Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '90%',
                padding: '18px 25px',
                borderRadius: '15px',
                border: '3px solid #74b9ff',
                fontSize: '1.2rem',
                background: 'rgba(255,255,255,0.8)',
                outline: 'none',
                borderColor: '#a55eea'
              }}
              required
            />
          </motion.div>

          {/* UPDATED SIGN UP BUTTON */}
          <motion.button 
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #a55eea, #74b9ff)',
              padding: '18px',
              borderRadius: '20px',
              border: 'none',
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isLoading ? (
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                🌀
              </motion.span>
            ) : (
              <>
                Sign Up
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  ⚡
                </motion.span>
              </>
            )}
          </motion.button>

        </form>

        {/* 🔥 UPDATED BOTTOM SECTION */}
        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '25px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p
            style={{
              color: '#2d3436',
              fontFamily: '"Comic Neue", cursive',
              fontSize: '1.1rem'
            }}
          >
            Click below to go back to Login page
          </p>

          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #ff7675, #fdcb6e)',
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: '"Comic Neue", cursive'
            }}
          >
            Login
          </motion.button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Register;
