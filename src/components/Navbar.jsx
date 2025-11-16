

import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ onLogout }) => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        width: '100%',
        maxWidth: '600px', // Matches typical feed width
        margin: '0 auto',
        background: '#ffffff',
        padding: '12px 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderBottom: '1px solid #dbdbdb',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
      }}>
        {/* Left: Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ 
            fontFamily: "'Billabong', cursive",
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#262626',
            cursor: 'pointer'
          }}
        >
          TeenMedia
        </motion.div>

        {/* Right: Navigation Icons */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          color: '#262626'
        }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaHome size={24} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>
              <FaPlusCircle size={24} />
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            style={{ cursor: 'pointer' }}
          >
            <FaSignOutAlt size={24} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;