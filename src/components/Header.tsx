import './Header.css';

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSearchBar } from '@contexts/SearchBarContext';

import header_icon from '@materials/politopics_icon.png';
import { clear } from 'console';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, clearSearch } = useSearchBar();

  const handleLogoClick = () => {
    clearSearch();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={header_icon} alt="Logo" />
        <div className="header-search-bar-container">
          <input
            type="text"
            placeholder="Search headlines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          {searchTerm && <button onClick={clearSearch} className="clear-button">&times;</button>}
        </div>
      </div>
    </header>
  );
};

/*
        <ul className='menu'>
          <li className='menu-item'><a href='/'>Home</a></li>
          <li className='menu-item'><a href='/about'>About</a></li>
          <li className='menu-item'><a href='/contact'>Contact</a></li>
        </ul>
        */

export default Header;