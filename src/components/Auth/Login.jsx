import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const navigate = useNavigate();

  const backgrounds = [
    'https://imgs.search.brave.com/y2Kac64YsDcZa2KG7KaL0RKM5UZLmkCcV11ITibLgyM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzEyLzQ2LzE5/LzM2MF9GXzcxMjQ2/MTkwMF9MS2NJZW5C/Qmk1TWRLNnoxUVVj/SUNFbk9CMVJORUJZ/Qy5qcGc',
    'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop',
    'https://imgs.search.brave.com/_oWICImyyotLibpK3muLXxv8XdNQx3dhUedbrkJGlF8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXdhbnR3YWxscGFw/ZXIuY28udWsvaW1h/Z2VzL2RjLWNvbWlj/cy1jb2xsZWN0aW9u/LWp1c3RpY2UtbGVh/Z3VlLXN1cGVyLWhl/cm9lcy13YWxscGFw/ZXItcDY5MjYtMTk2/MDJfbWVkaXVtLmpw/Zw',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2370&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1679678691006-0d9a4a5df3e3?q=80&w=2370&auto=format&fit=crop'
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
      const response = await fetch('http://ec2-13-60-75-156.eu-north-1.compute.amazonaws.com:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (data.success) {
        onLogin(data);
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
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
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <motion.h1 
            style={{
              color: '#2d3436',
              fontFamily: '"Comic Neue", cursive',
              fontSize: '2.5rem',
              margin: '0 0 10px 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Welcome Back Champ!
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
            Ready to continue your adventure?
          </motion.p>
        </div>

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
              textAlign: 'center',
              fontFamily: '"Comic Neue", cursive'
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="text"
              placeholder="🦸 Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '90%',
                padding: '18px 25px',
                borderRadius: '15px',
                border: '3px solid #74b9ff',
                fontSize: '1.2rem',
                fontFamily: '"Comic Neue", cursive',
                background: 'rgba(255,255,255,0.8)',
                color: '#2d3436',
                outline: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="password"
              placeholder="🔐 Enter Secret Code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '90%',
                padding: '18px 25px',
                borderRadius: '15px',
                border: '3px solid #74b9ff',
                fontSize: '1.2rem',
                fontFamily: '"Comic Neue", cursive',
                background: 'rgba(255,255,255,0.8)',
                color: '#2d3436',
                outline: 'none',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderColor: '#a55eea'
              }}
              required
            />
          </motion.div>

          <motion.button 
            type="submit" 
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #ff7675, #fdcb6e)',
              padding: '18px',
              borderRadius: '20px',
              border: 'none',
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🔒
              </motion.span>
            ) : (
              <>
                Continue Adventure!
                <motion.span 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ⚡
                </motion.span>
              </>
            )}
          </motion.button>
        </form>

        {/* UPDATED PART: REPLACEMENT FOR “Join the adventure” */}
        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '25px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={() => navigate('/register')}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #6c5ce7, #fd79a8)',
              padding: '14px 28px',
              borderRadius: '20px',
              border: 'none',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              fontFamily: '"Comic Neue", cursive'
            }}
          >
            Register 🚀
          </motion.button>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default Login;
