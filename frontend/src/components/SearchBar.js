import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';

function SearchBar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time search with debounce
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(
        `api/search?q=${encodeURIComponent(query)}`,
        config
      );
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    // Navigate based on result type
    switch (result.type) {
      case 'leave':
        navigate('/my-leaves');
        break;
      case 'user':
        if (user.role === 'admin') {
          navigate('/manage-users');
        }
        break;
      case 'pending-leave':
        navigate('/pending-leaves');
        break;
      default:
        break;
    }
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'leave':
        return '📋';
      case 'user':
        return '👤';
      case 'pending-leave':
        return '⏳';
      default:
        return '🔍';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      case 'pending':
        return '#ff9800';
      default:
        return '#999';
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '350px' }}>
      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Search leaves, users, requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setShowResults(true)}
          style={{
            width: '100%',
            padding: '10px 40px 10px 15px',
            borderRadius: '25px',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            fontSize: '14px',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        />
        <span style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '16px',
          color: '#666'
        }}>
          {isSearching ? '⏳' : '🔍'}
        </span>
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {searchResults.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result)}
              style={{
                padding: '12px 15px',
                borderBottom: index < searchResults.length - 1 ? '1px solid #f0f0f0' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fa'}
              onMouseOut={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{getResultIcon(result.type)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: '500', 
                    fontSize: '14px',
                    color: '#333',
                    marginBottom: '4px'
                  }}>
                    {result.title}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {result.subtitle}
                    {result.status && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: getStatusColor(result.status),
                        color: 'white',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {result.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {showResults && searchQuery && searchResults.length === 0 && !isSearching && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '8px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '20px',
          textAlign: 'center',
          color: '#999',
          zIndex: 1000
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
          <div style={{ fontSize: '14px' }}>No results found for "{searchQuery}"</div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
